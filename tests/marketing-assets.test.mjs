import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  compareSnapshots,
  evaluateAsset,
  hashPath,
  makeBaselineEntry,
  parseArgs,
  renderStatusReport,
  runCli,
  snapshotAsset
} from '../scripts/check-marketing-assets.mjs'

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'marketing-assets-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const landing = path.join(root, 'landing')
  const ios = path.join(root, 'ios')
  await mkdir(landing, { recursive: true })
  await mkdir(ios, { recursive: true })
  const map = {
    repositories: { landing: '.', ios: '../ios' },
    dependencyGroups: {
      common: [{ repo: 'ios', path: 'Shared', impact: 'recapture', why: 'Common native UI.' }],
      screenA: [{ repo: 'ios', path: 'FeatureA', impact: 'recapture', why: 'Asset A screen.' }],
      screenB: [{ repo: 'ios', path: 'FeatureB', impact: 'recapture', why: 'Asset B screen.' }],
      site: [{ repo: 'landing', path: 'site-component.txt', impact: 'landing-review', why: 'Landing component.' }]
    },
    assets: [
      { id: 'a', screen: 'A', family: 'regular', webPath: '/a.webp', original: 'originals/a.png', nativeGroups: ['common', 'screenA'], landingGroups: ['site'], currentUses: [], guideContent: [] },
      { id: 'b', screen: 'B', family: 'regular', webPath: '/b.webp', original: 'originals/b.png', nativeGroups: ['common', 'screenB'], landingGroups: ['site'], currentUses: [], guideContent: [] }
    ]
  }
  for (const file of ['Shared/theme.txt', 'FeatureA/screen.txt', 'FeatureB/screen.txt']) {
    await mkdir(path.dirname(path.join(ios, file)), { recursive: true })
    await writeFile(path.join(ios, file), `${file} initial`)
  }
  await mkdir(path.join(landing, 'originals'), { recursive: true })
  await mkdir(path.join(landing, 'public'), { recursive: true })
  await writeFile(path.join(landing, 'site-component.txt'), 'site')
  for (const id of ['a', 'b']) {
    await writeFile(path.join(landing, 'originals', `${id}.png`), `${id} original`)
    await writeFile(path.join(landing, 'public', `${id}.webp`), `${id} webp`)
  }
  const repoRoots = { landing, ios: path.join(root, 'ios') }
  const baseline = { schemaVersion: 1, assets: {} }
  for (const asset of map.assets) baseline.assets[asset.id] = makeBaselineEntry(await snapshotAsset(asset, map, repoRoots), { reviewed: true, at: '2026-10-21T00:00:00.000Z' })
  const baselineFile = path.join(root, 'asset-baseline.json')
  const statusFile = path.join(root, 'asset-status.md')
  await writeFile(baselineFile, `${JSON.stringify(baseline, null, 2)}\n`)
  return { root, landing, ios, map, repoRoots, baseline, baselineFile, statusFile }
}

test('hash comparisons identify added, removed, and changed files with their review impact', () => {
  const before = { hashes: { 'ios/A.swift': 'old', 'ios/deleted.swift': 'gone' }, impacts: { 'ios/A.swift': 'recapture', 'ios/deleted.swift': 'recapture' } }
  const after = { hashes: { 'ios/A.swift': 'new', 'ios/new.swift': 'added' }, impacts: { 'ios/A.swift': 'recapture', 'ios/new.swift': 'landing-review' }, missing: [] }
  const comparison = compareSnapshots(before, after)
  assert.deepEqual(comparison.changedPaths, [
    { path: 'ios/A.swift', change: 'changed', impact: 'recapture' },
    { path: 'ios/deleted.swift', change: 'removed', impact: 'recapture' },
    { path: 'ios/new.swift', change: 'added', impact: 'landing-review' }
  ])
})

test('recursive directory hashes include added and deleted files', async (t) => {
  const ctx = await fixture(t)
  const before = await hashPath(ctx.ios, 'FeatureA', 'ios')
  await writeFile(path.join(ctx.ios, 'FeatureA/added.txt'), 'new file')
  const withAdded = await hashPath(ctx.ios, 'FeatureA', 'ios')
  assert.ok(withAdded['ios/FeatureA/added.txt'])
  const added = compareSnapshots(
    { hashes: before, impacts: Object.fromEntries(Object.keys(before).map((key) => [key, 'recapture'])) },
    { hashes: withAdded, impacts: Object.fromEntries(Object.keys(withAdded).map((key) => [key, 'recapture'])) }
  )
  assert.ok(added.changedPaths.some(({ path: changed, change }) => changed.endsWith('added.txt') && change === 'added'))

  await rm(path.join(ctx.ios, 'FeatureA/screen.txt'))
  const afterDelete = await hashPath(ctx.ios, 'FeatureA', 'ios')
  const deleted = compareSnapshots(
    { hashes: withAdded, impacts: Object.fromEntries(Object.keys(withAdded).map((key) => [key, 'recapture'])) },
    { hashes: afterDelete, impacts: Object.fromEntries(Object.keys(afterDelete).map((key) => [key, 'recapture'])) }
  )
  assert.ok(deleted.changedPaths.some(({ path: changed, change }) => changed.endsWith('screen.txt') && change === 'removed'))
})

test('a native screen change affects only the screenshot mapped to that feature', async (t) => {
  const ctx = await fixture(t)
  await writeFile(path.join(ctx.ios, 'FeatureA/screen.txt'), 'updated screen')
  const output = []
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: (line) => output.push(line)
  })
  assert.equal(code, 1)
  assert.match(output.join('\n'), /a: RECAPTURE REQUIRED; 1 changed path/)
  assert.match(output.join('\n'), /b: CURRENT/)
})

test('a shared native dependency stales every asset that uses it', async (t) => {
  const ctx = await fixture(t)
  await writeFile(path.join(ctx.ios, 'Shared/theme.txt'), 'updated shared theme')
  const output = []
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: (line) => output.push(line)
  })
  assert.equal(code, 1)
  assert.match(output.join('\n'), /a: RECAPTURE REQUIRED; 1 changed path/)
  assert.match(output.join('\n'), /b: RECAPTURE REQUIRED; 1 changed path/)
})

test('a landing dependency requests visual review without recapture', async (t) => {
  const ctx = await fixture(t)
  await writeFile(path.join(ctx.landing, 'site-component.txt'), 'updated site')
  const output = []
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: (line) => output.push(line)
  })
  assert.equal(code, 1)
  assert.match(output.join('\n'), /a: LANDING REVIEW REQUIRED/)
  assert.match(output.join('\n'), /b: LANDING REVIEW REQUIRED/)
})

test('changes outside mapped inputs do not stale an asset', async (t) => {
  const ctx = await fixture(t)
  await mkdir(path.join(ctx.ios, 'Unrelated'), { recursive: true })
  await writeFile(path.join(ctx.ios, 'Unrelated/other.swift'), 'changed')
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: () => {}
  })
  assert.equal(code, 0)
})

test('default check is read-only', async (t) => {
  const ctx = await fixture(t)
  await writeFile(ctx.statusFile, 'keep this report')
  const baselineBefore = await readFile(ctx.baselineFile, 'utf8')
  const statusBefore = await readFile(ctx.statusFile, 'utf8')
  const code = await runCli({
    args: [], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: () => {}
  })
  assert.equal(code, 0)
  assert.equal(await readFile(ctx.baselineFile, 'utf8'), baselineBefore)
  assert.equal(await readFile(ctx.statusFile, 'utf8'), statusBefore)
})

test('a map usage change stales only the affected asset', async (t) => {
  const ctx = await fixture(t)
  ctx.map.assets[0].currentUses = [{ route: '/', placement: 'new hero placement' }]
  ctx.map.assets[0].guideContent = [{ slug: 'guide-a', route: '/guide-a', placement: 'heroAsset: ios-home' }]
  await mkdir(path.join(ctx.landing, 'src/content/seo'), { recursive: true })
  await writeFile(path.join(ctx.landing, 'src/content/seo/guide-a.md'), 'guide')
  const snapshot = await snapshotAsset(ctx.map.assets[0], ctx.map, ctx.repoRoots)
  const result = evaluateAsset(ctx.map.assets[0], ctx.baseline.assets.a, snapshot)
  assert.equal(result.status, 'LANDING REVIEW REQUIRED')
  assert.ok(result.changedPaths.some(({ path: changed }) => changed === 'ui-asset-map.json'))
  const other = await snapshotAsset(ctx.map.assets[1], ctx.map, ctx.repoRoots)
  assert.equal(evaluateAsset(ctx.map.assets[1], ctx.baseline.assets.b, other).status, 'CURRENT')
})

test('a resolved native group change stales the asset even when file hashes stay the same', async (t) => {
  const ctx = await fixture(t)
  ctx.map.dependencyGroups.screenAAlias = structuredClone(ctx.map.dependencyGroups.screenA)
  ctx.map.assets[0].nativeGroups = ['common', 'screenAAlias']
  const snapshot = await snapshotAsset(ctx.map.assets[0], ctx.map, ctx.repoRoots)
  assert.deepEqual(snapshot.hashes, ctx.baseline.assets.a.hashes)
  const result = evaluateAsset(ctx.map.assets[0], ctx.baseline.assets.a, snapshot)
  assert.equal(result.status, 'RECAPTURE REQUIRED')
  assert.ok(result.changedPaths.some(({ path: changed, impact }) => changed === 'ui-asset-map.json' && impact === 'recapture'))
})

test('status reports list route placements and unique tracked file size', async (t) => {
  const ctx = await fixture(t)
  ctx.map.assets[0].currentUses = [{ route: '/', placement: 'hero iPhone' }]
  ctx.map.assets[0].guideContent = [{ slug: 'planning-guide', route: '/planning-guide', placement: 'heroAsset: ios-home' }]
  await mkdir(path.join(ctx.landing, 'src/content/seo'), { recursive: true })
  await writeFile(path.join(ctx.landing, 'src/content/seo/planning-guide.md'), 'guide content')
  const snapshot = await snapshotAsset(ctx.map.assets[0], ctx.map, ctx.repoRoots)
  const result = evaluateAsset(ctx.map.assets[0], ctx.baseline.assets.a, snapshot)
  const report = renderStatusReport([result], '2026-10-21T00:00:00.000Z')
  assert.match(report, /`\/` — hero iPhone/)
  assert.match(report, /`\/planning-guide` — heroAsset: ios-home \(planning-guide\.md\)/)
  assert.match(report, /Snapshot inventory: \d+ unique files, \d+ bytes/)
})

test('a missing mapped dependency is unknown and blocks strict review', async (t) => {
  const ctx = await fixture(t)
  await rm(path.join(ctx.ios, 'FeatureA'), { recursive: true })
  const snapshot = await snapshotAsset(ctx.map.assets[0], ctx.map, ctx.repoRoots)
  const result = evaluateAsset(ctx.map.assets[0], ctx.baseline.assets.a, snapshot)
  assert.equal(result.status, 'UNKNOWN')
  assert.ok(result.missing.some(({ path: missing }) => missing === 'ios/FeatureA'))
  const output = []
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: (line) => output.push(line)
  })
  assert.equal(code, 1)
  assert.match(output.join('\n'), /a: UNKNOWN/)
  assert.match(output.join('\n'), /b: CURRENT/)
})

test('an unavailable repository is unknown and blocks strict review', async (t) => {
  const ctx = await fixture(t)
  ctx.repoRoots.ios = path.join(ctx.root, 'unavailable-ios')
  const output = []
  const code = await runCli({
    args: ['--strict'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    write: (line) => output.push(line)
  })
  assert.equal(code, 1)
  assert.match(output.join('\n'), /a: UNKNOWN/)
  assert.match(output.join('\n'), /Repository "ios" is unavailable/)
})

test('explicit acknowledgement snapshots one asset and leaves other baselines intact', async (t) => {
  const ctx = await fixture(t)
  await writeFile(path.join(ctx.ios, 'FeatureA/screen.txt'), 'reviewed and recaptured')
  const code = await runCli({
    args: ['--ack', 'a'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile,
    now: () => new Date('2026-10-21T12:00:00.000Z'), write: () => {}
  })
  assert.equal(code, 0)
  const updated = JSON.parse(await readFile(ctx.baselineFile, 'utf8'))
  assert.equal(updated.assets.a.reviewed, true)
  assert.equal(updated.assets.a.acknowledgedAt, '2026-10-21T12:00:00.000Z')
  assert.deepEqual(updated.assets.b, ctx.baseline.assets.b)
  assert.equal(updated.assets.a.hashes['ios/FeatureA/screen.txt'], (await snapshotAsset(ctx.map.assets[0], ctx.map, ctx.repoRoots)).hashes['ios/FeatureA/screen.txt'])
})

test('malformed acknowledgement arguments never modify the baseline', async (t) => {
  const ctx = await fixture(t)
  const before = await readFile(ctx.baselineFile, 'utf8')
  assert.throws(() => parseArgs(['--ack', '--strict']), /requires an asset id/)
  await assert.rejects(runCli({
    args: ['--ack', 'missing'], map: ctx.map, repoRoots: ctx.repoRoots,
    baselineFile: ctx.baselineFile, statusFile: ctx.statusFile, write: () => {}
  }), /Unknown asset id/)
  assert.equal(await readFile(ctx.baselineFile, 'utf8'), before)
})

test('invalid flag combinations fail before any file write', async () => {
  assert.throws(() => parseArgs(['--check', '--report']), /Choose only one/)
  assert.throws(() => parseArgs(['--report', '--ack', 'a']), /cannot be combined/)
  assert.throws(() => parseArgs(['--strict', '--ack', 'a']), /cannot be combined/)
  assert.throws(() => parseArgs(['--other']), /Unknown argument/)
})

test('the asset map covers guide hero and inline screenshot uses plus resource thumbnails', async () => {
  const landingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const map = JSON.parse(await readFile(path.join(landingRoot, 'docs/marketing-assets/ui-asset-map.json'), 'utf8'))
  const registry = await readFile(path.join(landingRoot, 'src/lib/guide-assets.ts'), 'utf8')
  const screenshotBlock = registry.match(/const screenshots\s*=\s*\[([\s\S]*?)\]\s*satisfies/)
  assert.ok(screenshotBlock, 'guide-assets.ts should expose its screenshot registry')

  const screenshotIdsByPath = new Map()
  for (const match of screenshotBlock[1].matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*src:\s*"([^"]+)"/g)) {
    screenshotIdsByPath.set(match[2], match[1])
  }
  const assetsByPath = new Map(map.assets.map((asset) => [asset.webPath, asset]))
  const assetIdByGuideId = new Map()
  for (const [webPath, guideId] of screenshotIdsByPath) {
    const asset = assetsByPath.get(webPath)
    assert.ok(asset, `screenshot registry image ${webPath} is absent from ui-asset-map.json`)
    assetIdByGuideId.set(guideId, asset.id)
  }
  assert.equal(assetIdByGuideId.size, map.assets.length, 'every mapped UI screenshot should have a guide registry entry')

  const contentRoot = path.join(landingRoot, 'src/content/seo')
  const guideFiles = (await readdir(contentRoot)).filter((file) => file.endsWith('.md')).sort()
  const expectedUses = new Map(map.assets.map((asset) => [asset.id, []]))
  for (const file of guideFiles) {
    const slug = file.slice(0, -3)
    const source = await readFile(path.join(contentRoot, file), 'utf8')
    const heroId = source.match(/^heroAsset:\s*["']([^"']+)["']/m)?.[1]
    assert.ok(heroId, `${file} should declare heroAsset`)
    const heroAssetId = assetIdByGuideId.get(heroId)
    if (heroAssetId) expectedUses.get(heroAssetId).push({ slug, route: `/${slug}`, placement: `heroAsset: ${heroId}` })

    for (const match of source.matchAll(/!\[[^\]]*\]\((\/images\/ios\/[^)]+)\)/g)) {
      const asset = assetsByPath.get(match[1])
      assert.ok(asset, `${file} references unmapped UI screenshot ${match[1]}`)
      expectedUses.get(asset.id).push({ slug, route: `/${slug}`, placement: 'inline Markdown image' })
    }
  }

  const resourcePage = await readFile(path.join(landingRoot, 'src/pages/resources.astro'), 'utf8')
  assert.match(resourcePage, /<GuideImage\s+asset=\{getGuideAsset\(page\.data\.heroAsset\)\}\s+variant="card"\s*\/>/)
  assert.ok(map.dependencyGroups['landing-guides'].some(({ repo, path: dependencyPath }) => repo === 'landing' && dependencyPath === 'src/pages/resources.astro'))

  for (const asset of map.assets) {
    const expected = expectedUses.get(asset.id).sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))
    const actual = asset.guideContent.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))
    assert.deepEqual(actual, expected, `guideContent for ${asset.id} must match actual guide hero and inline screenshot references`)

    const hasGuideHero = expected.some(({ placement }) => placement.startsWith('heroAsset: '))
    const resourceUses = asset.currentUses.filter(({ route }) => route === '/resources')
    assert.deepEqual(resourceUses, hasGuideHero ? [{ route: '/resources', placement: 'guide hub thumbnail' }] : [], `${asset.id} resource thumbnail use should match its guide hero`)
    assert.ok(asset.landingGroups.includes('landing-guides'), `${asset.id} must track the guide and resources renderers`)
  }
})
