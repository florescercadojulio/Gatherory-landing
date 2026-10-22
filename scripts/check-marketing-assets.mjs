#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(scriptPath)
export const defaultRoot = path.resolve(scriptDir, '..')
export const mapPath = path.join(defaultRoot, 'docs/marketing-assets/ui-asset-map.json')
export const baselinePath = path.join(defaultRoot, 'docs/marketing-assets/asset-baseline.json')
export const statusPath = path.join(defaultRoot, 'docs/marketing-assets/asset-status.md')

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

export function parseArgs(args) {
  const options = { mode: 'check', strict: false, assetId: null }
  let modeWasSet = false
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--check' || arg === '--report') {
      if (modeWasSet) throw new Error('Choose only one of --check or --report.')
      modeWasSet = true
      options.mode = arg.slice(2)
    } else if (arg === '--strict') {
      options.strict = true
    } else if (arg === '--ack') {
      if (options.assetId !== null) throw new Error('--ack may be used only once.')
      const assetId = args[index + 1]
      if (!assetId || assetId.startsWith('--')) throw new Error('--ack requires an asset id.')
      options.assetId = assetId
      index += 1
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
  if (options.assetId && (options.mode !== 'check' || options.strict))
    throw new Error('--ack cannot be combined with --report or --strict.')
  return options
}

async function exists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch (error) {
    if (error?.code === 'ENOENT') return false
    throw error
  }
}

async function listFilesRecursively(absolutePath) {
  const details = await stat(absolutePath)
  if (details.isFile()) return [absolutePath]
  if (!details.isDirectory()) return []
  const entries = await readdir(absolutePath, { withFileTypes: true })
  const nested = await Promise.all(
    entries
      .filter((entry) => !entry.isSymbolicLink())
      .map((entry) => listFilesRecursively(path.join(absolutePath, entry.name)))
  )
  return nested.flat().sort()
}

async function inspectPath(repoRoot, relativePath, repoId = 'repo') {
  const absolutePath = path.resolve(repoRoot, relativePath)
  const rootPrefix = `${path.resolve(repoRoot)}${path.sep}`
  if (absolutePath !== path.resolve(repoRoot) && !absolutePath.startsWith(rootPrefix))
    throw new Error(`Dependency escapes repository root: ${relativePath}`)
  if (!(await exists(absolutePath))) throw new Error(`Missing dependency: ${relativePath}`)
  const files = await listFilesRecursively(absolutePath)
  const hashes = {}
  const sizes = {}
  for (const filePath of files) {
    const key = `${repoId}/${path.relative(repoRoot, filePath).split(path.sep).join('/')}`
    const contents = await readFile(filePath)
    hashes[key] = sha256(contents)
    sizes[key] = contents.byteLength
  }
  return { hashes, sizes }
}

/** Hash a file or every regular file below a directory, returning portable relative keys. */
export async function hashPath(repoRoot, relativePath, repoId = 'repo') {
  return (await inspectPath(repoRoot, relativePath, repoId)).hashes
}

function dependenciesFor(asset, map) {
  const dependencies = []
  for (const groupName of [...asset.nativeGroups, ...asset.landingGroups]) {
    const group = map.dependencyGroups[groupName]
    if (!group) throw new Error(`Unknown dependency group "${groupName}" for ${asset.id}.`)
    dependencies.push(...group)
  }
  dependencies.push(
    { repo: 'landing', path: asset.original, impact: 'recapture', why: 'Native simulator original PNG.' },
    { repo: 'landing', path: `public${asset.webPath}`, impact: 'landing-review', why: 'Published WebP shown on the site.' }
  )
  for (const guide of asset.guideContent ?? []) {
    dependencies.push({
      repo: 'landing',
      path: `src/content/seo/${guide.slug}.md`,
      impact: 'landing-review',
      why: `Guide route ${guide.route} renders this screenshot as ${guide.placement}.`
    })
  }
  return dependencies
}

function assetDefinition(asset, map) {
  const dependencies = dependenciesFor(asset, map)
    .map(({ repo, path: dependencyPath, impact, optional }) => ({
      repo, path: dependencyPath, impact, ...(optional ? { optional: true } : {})
    }))
    .sort((left, right) => `${left.repo}/${left.path}`.localeCompare(`${right.repo}/${right.path}`))
  const fullDefinition = { asset, dependencies }
  const nativeDefinition = {
    screen: asset.screen,
    family: asset.family,
    dimensions: asset.dimensions,
    nativeGroups: asset.nativeGroups,
    dependencies: dependencies.filter(({ repo, path: dependencyPath }) =>
      repo === 'ios' || (repo === 'landing' && dependencyPath === asset.original)
    )
  }
  return {
    definitionHash: sha256(JSON.stringify(fullDefinition)),
    nativeDefinitionHash: sha256(JSON.stringify(nativeDefinition))
  }
}

function mergeImpact(impacts, key, impact) {
  if (impacts[key] === 'recapture' || impact === 'recapture') impacts[key] = 'recapture'
  else impacts[key] = impact
}

export async function snapshotAsset(asset, map, repoRoots) {
  const hashes = {}
  const sizes = {}
  const impacts = {}
  const missing = []
  const optionalMissing = []
  for (const dependency of dependenciesFor(asset, map)) {
    const repoRoot = repoRoots[dependency.repo]
    if (!repoRoot || !(await exists(repoRoot))) {
      missing.push({ path: `${dependency.repo}/${dependency.path}`, reason: `Repository "${dependency.repo}" is unavailable.` })
      continue
    }
    const absolutePath = path.resolve(repoRoot, dependency.path)
    if (!(await exists(absolutePath))) {
      if (dependency.optional) {
        optionalMissing.push(`${dependency.repo}/${dependency.path}`)
      } else {
        missing.push({ path: `${dependency.repo}/${dependency.path}`, reason: 'Dependency path is unavailable.' })
      }
      continue
    }
    const found = await inspectPath(repoRoot, dependency.path, dependency.repo)
    for (const [key, hash] of Object.entries(found.hashes)) {
      hashes[key] = hash
      sizes[key] = found.sizes[key]
      mergeImpact(impacts, key, dependency.impact)
    }
  }
  return {
    hashes: sortObject(hashes),
    sizes: sortObject(sizes),
    impacts: sortObject(impacts),
    ...assetDefinition(asset, map),
    missing,
    optionalMissing: optionalMissing.sort()
  }
}

function sortObject(value) {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)))
}

export function compareSnapshots(previous = {}, current = {}) {
  const previousHashes = previous.hashes ?? {}
  const currentHashes = current.hashes ?? {}
  const changedPaths = []
  for (const key of [...new Set([...Object.keys(previousHashes), ...Object.keys(currentHashes)])].sort()) {
    if (previousHashes[key] === currentHashes[key]) continue
    const change = previousHashes[key] === undefined ? 'added' : currentHashes[key] === undefined ? 'removed' : 'changed'
    const impact = previous.impacts?.[key] === 'recapture' || current.impacts?.[key] === 'recapture'
      ? 'recapture'
      : 'landing-review'
    changedPaths.push({ path: key, change, impact })
  }
  if (previous.definitionHash && current.definitionHash && previous.definitionHash !== current.definitionHash) {
    const nativeDefinitionChanged = previous.nativeDefinitionHash && current.nativeDefinitionHash &&
      previous.nativeDefinitionHash !== current.nativeDefinitionHash
    changedPaths.push({
      path: 'ui-asset-map.json',
      change: 'definition changed',
      impact: nativeDefinitionChanged ? 'recapture' : 'landing-review'
    })
  }
  return {
    changedPaths,
    missing: current.missing ?? [],
    changed: changedPaths.length > 0,
    needsRecapture: changedPaths.some(({ impact }) => impact === 'recapture'),
    needsLandingReview: changedPaths.some(({ impact }) => impact === 'landing-review')
  }
}

export function evaluateAsset(asset, baselineEntry, currentSnapshot) {
  const comparison = compareSnapshots(baselineEntry, currentSnapshot)
  const unknown = comparison.missing.length > 0
  let status = 'CURRENT'
  if (unknown) status = 'UNKNOWN'
  else if (comparison.needsRecapture) status = 'RECAPTURE REQUIRED'
  else if (comparison.needsLandingReview) status = 'LANDING REVIEW REQUIRED'
  else if (!baselineEntry?.reviewed) status = 'NEEDS REVIEW'
  return { asset, status, ...comparison, sizes: currentSnapshot.sizes ?? {}, reviewed: Boolean(baselineEntry?.reviewed) }
}

export function makeBaselineEntry(snapshot, { reviewed = false, at = new Date().toISOString() } = {}) {
  return {
    reviewed,
    baselineCapturedAt: at,
    ...(reviewed ? { acknowledgedAt: at } : {}),
    acknowledgment: reviewed
      ? 'Explicit recapture or visual review; see asset-maintenance.md.'
      : 'Initial dependency snapshot only. Capture freshness has not been verified.',
    hashes: snapshot.hashes,
    definitionHash: snapshot.definitionHash,
    nativeDefinitionHash: snapshot.nativeDefinitionHash,
    impacts: snapshot.impacts,
    missing: snapshot.missing,
    optionalMissing: snapshot.optionalMissing
  }
}

function formatAssetStatus(result) {
  const { asset, status, changedPaths, missing, reviewed } = result
  const lines = [`### ${asset.id} — ${status}`, `WebP: \`${asset.webPath}\` · ${asset.family} ${asset.screen}`]
  lines.push('', 'Routes and placements:')
  for (const use of asset.currentUses ?? []) lines.push(`- \`${use.route}\` — ${use.placement}`)
  for (const use of asset.guideContent ?? []) lines.push(`- \`${use.route}\` — ${use.placement} (${use.slug}.md)`)
  if (!reviewed) lines.push('', 'Review: pending; the initial baseline hash does not verify capture freshness.')
  if (changedPaths.length) {
    lines.push('', 'Changed dependencies:')
    for (const change of changedPaths) lines.push(`- ${change.change} (${change.impact}): \`${change.path}\``)
  }
  if (missing.length) {
    lines.push('', 'Unverified dependencies:')
    for (const dependency of missing) lines.push(`- \`${dependency.path}\`: ${dependency.reason}`)
  }
  return lines.join('\n')
}

export function renderStatusReport(results, generatedAt = new Date().toISOString()) {
  const counts = results.reduce((summary, result) => {
    summary[result.status] = (summary[result.status] ?? 0) + 1
    return summary
  }, {})
  const summary = Object.entries(counts).map(([name, count]) => `${count} ${name.toLowerCase()}`).join(', ')
  const fileSizes = new Map()
  for (const result of results) {
    for (const [file, size] of Object.entries(result.sizes ?? {})) fileSizes.set(file, size)
  }
  const totalBytes = [...fileSizes.values()].reduce((total, size) => total + size, 0)
  return [
    '# Marketing UI asset status',
    '',
    `Generated: ${generatedAt}`,
    '',
    `Summary: ${summary || 'no assets'}.`,
    '',
    `Snapshot inventory: ${fileSizes.size} unique files, ${totalBytes.toLocaleString('en-US')} bytes (${formatBytes(totalBytes)}). Shared files are counted once.`,
    '',
    'This report is generated by `node scripts/check-marketing-assets.mjs --report`. It compares dependency hashes with `asset-baseline.json`; see [maintenance instructions](./asset-maintenance.md) before acknowledging captures.',
    '',
    ...results.map(formatAssetStatus),
    ''
  ].join('\n')
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KiB', 'MiB', 'GiB']
  let value = bytes
  let unit = 'B'
  for (const candidate of units) {
    value /= 1024
    unit = candidate
    if (value < 1024) break
  }
  return `${value.toFixed(1)} ${unit}`
}

function printResults(results, write = (line) => process.stdout.write(`${line}\n`)) {
  for (const result of results) {
    const changed = result.changedPaths.length ? `; ${result.changedPaths.length} changed path(s)` : ''
    const missing = result.missing.length ? `; ${result.missing.length} unverified dependency path(s)` : ''
    write(`${result.asset.id}: ${result.status}${changed}${missing}`)
    for (const change of result.changedPaths) write(`  ${change.change} (${change.impact}): ${change.path}`)
    for (const dependency of result.missing) write(`  unverified: ${dependency.path} — ${dependency.reason}`)
  }
}

export async function runCli({ args = process.argv.slice(2), map, repoRoots, baselineFile, statusFile, now = () => new Date(), write = (line) => process.stdout.write(`${line}\n`) }) {
  const options = parseArgs(args)
  const baseline = JSON.parse(await readFile(baselineFile, 'utf8'))
  if (options.assetId) {
    const asset = map.assets.find(({ id }) => id === options.assetId)
    if (!asset) throw new Error(`Unknown asset id "${options.assetId}". No baseline was changed.`)
    const snapshot = await snapshotAsset(asset, map, repoRoots)
    if (snapshot.missing.length) {
      const details = snapshot.missing.map(({ path: missingPath }) => missingPath).join(', ')
      throw new Error(`Cannot acknowledge ${asset.id}; dependencies are unverified: ${details}`)
    }
    baseline.assets[asset.id] = {
      reviewed: true,
      acknowledgedAt: now().toISOString(),
      acknowledgment: 'Explicit --ack after recapture or visual review; see asset-maintenance.md.',
      hashes: snapshot.hashes,
      definitionHash: snapshot.definitionHash,
      nativeDefinitionHash: snapshot.nativeDefinitionHash,
      impacts: snapshot.impacts,
      missing: snapshot.missing,
      optionalMissing: snapshot.optionalMissing
    }
    baseline.updatedAt = now().toISOString()
    await writeFile(baselineFile, `${JSON.stringify(baseline, null, 2)}\n`)
    write(`Acknowledged ${asset.id} at ${baseline.assets[asset.id].acknowledgedAt}. Run --report to refresh asset-status.md.`)
    return 0
  }

  const results = []
  for (const asset of map.assets) {
    const snapshot = await snapshotAsset(asset, map, repoRoots)
    results.push(evaluateAsset(asset, baseline.assets[asset.id], snapshot))
  }
  printResults(results, write)
  const actionable = results.some((result) => result.status !== 'CURRENT')
  if (options.mode === 'report') {
    await writeFile(statusFile, renderStatusReport(results, now().toISOString()))
    write(`Updated ${statusFile}`)
  }
  if (options.strict && actionable) return 1
  if (actionable) write(options.strict ? 'Strict review failed.' : 'Warning: review is pending; non-strict checks do not block static builds.')
  return 0
}

async function main() {
  const map = JSON.parse(await readFile(mapPath, 'utf8'))
  const repoRoots = Object.fromEntries(
    Object.entries(map.repositories).map(([id, relativePath]) => [id, path.resolve(defaultRoot, relativePath)])
  )
  return runCli({ args: process.argv.slice(2), map, repoRoots, baselineFile: baselinePath, statusFile: statusPath })
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main().then((exitCode) => { process.exitCode = exitCode }).catch((error) => {
    process.stderr.write(`Marketing asset check failed: ${error.message}\n`)
    process.exitCode = 2
  })
}
