<script lang="ts">
	import DeviceNotch from "./device-notch.svelte";
	import { IconArrowDown, IconArrowRight, IconWifiOff } from "@tabler/icons-svelte";
	import type { IphoneCopy } from "@/lib/iphone-copy";
	import DevicePair from "./device-pair.svelte";

	let { copy, locale = "en" } = $props<{ copy: IphoneCopy; locale?: string }>();
	let activeStep = $state(0);
	const home = $derived(locale === "es" ? "/es/" : "/");
</script>

<div class="iphone-page bg-background text-foreground">
	<header class="border-b border-black/10 bg-white">
		<div class="site-shell flex min-h-18 flex-wrap items-center justify-between gap-4 py-4">
			<a href={home} class="inline-flex items-center gap-2.5" aria-label={copy.home}>
				<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
				<span class="text-base font-[540] tracking-[-0.02em]">Gatherory</span>
			</a>
			<nav aria-label={copy.nav} class="flex items-center gap-5 text-sm font-[480] sm:gap-8">
				<a class="nav-link hidden sm:inline" href={home}>{copy.back}</a>
				<div class="flex items-center gap-2" aria-label={copy.language}>
					<a href="/iphone" lang="en" aria-current={locale === "en" ? "page" : undefined} class:language-active={locale === "en"}>EN</a>
					<span class="text-black/20" aria-hidden="true">/</span>
					<a href="/es/iphone" lang="es" aria-current={locale === "es" ? "page" : undefined} class:language-active={locale === "es"}>ES</a>
				</div>
			</nav>
		</div>
	</header>

	<main>
		<section class="site-shell iphone-hero">
			<div class="hero-copy">
				<h1 class="display-title">{copy.title}<br /><span class="text-brand-blue">{copy.accent}</span></h1>
				<p class="body-lead mt-6 max-w-lg">{copy.description}</p>
				<a class="pill-button mt-8 min-h-12 px-7 text-base" href="#app-preview">{copy.cta}<IconArrowDown size={18} /></a>
				<p class="mt-5 text-sm text-muted-foreground">{copy.status}</p>
			</div>
			<figure class="hero-product">
				<div class="hero-circle" aria-hidden="true"></div>
				<DevicePair
					phoneSrc="/images/ios/home.webp"
					phoneAlt={copy.heroAlt}
					duoSrc="/images/ios/duo/ideas.webp"
					duoAlt={copy.heroDuoAlt}
					phoneLabel={copy.heroPhoneLabel}
					duoLabel={copy.heroDuoLabel}
				/>
				<figcaption class="hero-caption">{copy.heroCaption}</figcaption>
			</figure>
		</section>

		<section id="app-preview" class="preview-section scroll-mt-8">
			<div class="site-shell py-20 sm:py-28">
				<div class="max-w-3xl">
					<h2 class="section-title">{copy.galleryTitle}</h2>
					<p class="mt-5 max-w-xl text-lg leading-7">{copy.galleryDescription}</p>
				</div>
				<div class="preview-grid">
					<div class="step-list" aria-label={copy.galleryLabel}>
						{#each copy.steps as step, index}
							<button type="button" class="step-button" class:step-active={activeStep === index} aria-pressed={activeStep === index} aria-controls="preview-screen" onclick={() => activeStep = index}>
								<span class="step-number">{step.number}</span>
								<span>
									<span class="step-label">{step.label}</span>
									<span class="step-title">{step.title}</span>
									<span class="step-body">{step.body}</span>
								</span>
							</button>
						{/each}
					</div>
					<div id="preview-screen" class="preview-art" aria-live="polite" aria-atomic="true">
						{#each copy.steps as step, index}
							<figure hidden={activeStep !== index}>
								<div class="phone-frame preview-phone">
									<div class="phone-screen">
										<img src={`/images/ios/${step.key}.webp`} alt={step.alt} width="1206" height="2622" loading="lazy" />
										<DeviceNotch />
									</div>
								</div>
								<figcaption class="mt-5 text-center text-sm font-[480]">{step.label}</figcaption>
							</figure>
						{/each}
					</div>
				</div>
				<p class="mx-auto mt-10 max-w-xl text-center text-xs leading-5 text-muted-foreground">{copy.previewNote}</p>
			</div>
		</section>

		<section class="site-shell py-20 sm:py-28">
			<div class="offline-panel">
				<div class="offline-symbol" aria-hidden="true"><IconWifiOff size={54} stroke={1.2} /></div>
				<div>
					<h2 class="section-title max-w-xl">{copy.offlineTitle}</h2>
					<p class="mt-5 max-w-xl text-lg leading-8">{copy.offlineDescription}</p>
					<p class="mt-4 text-sm text-muted-foreground">{copy.offlineNote}</p>
				</div>
			</div>
		</section>

		<section class="site-shell pb-24 sm:pb-32">
			<div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
				<h2 class="section-title max-w-[10ch]">{copy.faqTitle}</h2>
				<div class="divide-y divide-black/15 border-y border-black/15">
					{#each copy.faqs as faq}
						<details class="faq-item">
							<summary>{faq.question}<span aria-hidden="true">+</span></summary>
							<p>{faq.answer}</p>
						</details>
					{/each}
				</div>
			</div>
		</section>

		<section class="bg-brand-blue-light py-20 sm:py-24">
			<div class="site-shell text-center">
				<h2 class="section-title mx-auto max-w-[18ch]">{copy.finalTitle}</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-7">{copy.finalDescription}</p>
				<a href={home} class="pill-button mt-8 min-h-12 px-7 text-base">{copy.finalCta}<IconArrowRight size={18} /></a>
			</div>
		</section>
	</main>

	<footer class="site-shell flex flex-wrap items-center justify-between gap-6 py-10">
		<p class="text-sm">Gatherory <span class="ml-3 text-muted-foreground">{copy.footerDescription}</span></p>
		<nav aria-label={copy.footerNav} class="flex gap-6 text-sm"><a class="nav-link" href="/privacy">{copy.privacy}</a><a class="nav-link" href="/terms">{copy.terms}</a></nav>
	</footer>
</div>

<style>
	.iphone-page { overflow-x: clip; }
	.language-active { color: var(--brand-blue); text-decoration: underline; text-underline-offset: 5px; }
	.iphone-hero { display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 48px; padding-block: 72px 88px; }
	.hero-copy { position: relative; z-index: 1; }
	.hero-product { position: relative; isolation: isolate; display: flex; min-height: 650px; flex-direction: column; align-items: center; justify-content: center; }
	.hero-circle { position: absolute; z-index: -1; top: 11%; width: 115%; aspect-ratio: 1; border-radius: 50%; background: #e7eeff; }
	.phone-frame { position: relative; padding: 6px; overflow: hidden; border: 1px solid #303238; border-radius: 41px; background: #1c1d21; box-shadow: 0 22px 50px -20px #17284750; }
	.phone-frame img { display: block; width: 100%; height: auto; border-radius: 35px; background: #f8f8f8; }
	.phone-screen { position: relative; }
	.hero-caption { position: relative; max-width: 28rem; margin-top: 30px; padding-inline: 1rem; font-size: 13px; line-height: 1.6; text-align: center; }
	.preview-section { background: #f7f8fa; border-block: 1px solid #e9ebef; }
	.preview-grid { display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 80px; margin-top: 56px; }
	.step-list { display: grid; gap: 12px; }
	.step-button { display: grid; grid-template-columns: 26px 1fr; gap: 18px; padding: 25px; text-align: left; border: 1px solid transparent; border-radius: 20px; background: transparent; cursor: pointer; transition: background .2s, border-color .2s; }
	.step-button:hover { background: #edf1f8; }
	.step-active { border-color: #c6d8fc; background: white; }
	.step-active:hover { background: white; }
	.step-number { color: #225fcb; font: 12px/1.6 var(--font-mono); }
	.step-label { display: block; color: #225fcb; font-size: 12px; font-weight: 550; }
	.step-title { display: block; margin-top: 9px; font-size: 24px; font-weight: 450; line-height: 1.15; letter-spacing: -.025em; }
	.step-body { display: block; margin-top: 12px; color: #545454; font-size: 15px; line-height: 1.7; }
	.preview-art { display: grid; place-items: center; padding: 32px; border-radius: 36px; background: #e6edfa; }
	.preview-art figure:not([hidden]) { display: grid; justify-items: center; }
	.preview-phone { width: 264px; max-width: 100%; }
	.offline-panel { display: grid; grid-template-columns: .55fr 1fr; align-items: center; gap: 80px; padding: 64px; border-radius: 32px; background: #f4ecd6; }
	.offline-symbol { display: grid; width: 160px; height: 160px; place-items: center; justify-self: center; border: 1px solid #bbac8866; border-radius: 50%; background: #fbf7ec; color: #625435; }
	.faq-item { padding-block: 23px; }
	.faq-item summary { display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; list-style: none; font-size: 18px; font-weight: 480; }
	.faq-item summary::-webkit-details-marker { display: none; }
	.faq-item summary span { color: #225fcb; font-size: 25px; font-weight: 300; }
	.faq-item[open] summary span { transform: rotate(45deg); }
	.faq-item p { max-width: 36rem; margin-top: 16px; color: #545454; line-height: 1.8; }
	.faq-item summary:focus-visible { outline: 2px solid var(--brand-blue); outline-offset: 6px; border-radius: 3px; }
	@media (max-width: 1023px) {
		.iphone-hero { gap: 24px; }
		.hero-product { min-height: 580px; }
		.preview-grid { gap: 32px; }
		.offline-panel { gap: 40px; padding: 48px; }
	}
	@media (max-width: 767px) {
		.iphone-hero { grid-template-columns: 1fr; gap: 24px; padding-block: 52px 60px; }
		.hero-copy { max-width: 560px; }
		.hero-product { min-height: 0; padding-top: 30px; }
		.hero-circle { top: 15%; width: min(440px, 115%); }
		.hero-caption { margin-top: 22px; }
		.preview-grid { grid-template-columns: 1fr; gap: 28px; margin-top: 36px; }
		.step-button { padding: 20px; }
		.step-title { font-size: 22px; }
		.step-button:not(.step-active) .step-body { display: none; }
		.preview-art { padding: 30px; }
		.offline-panel { grid-template-columns: 1fr; gap: 30px; padding: 32px 24px; }
		.offline-symbol { width: 94px; height: 94px; justify-self: start; }
	}
	@media (prefers-reduced-motion: reduce) { .step-button { transition: none; } }
</style>
