<script lang="ts">
	import {
		IconArrowRight,
		IconHeart,
		IconSparkles,
		IconUsers,
	} from "@tabler/icons-svelte";
	import { APP_SIGN_IN_URL } from "@/lib/site-links";
	import MobileNav from "@/lib/components/mobile-nav.svelte";
	import DevicePair from "./device-pair.svelte";
	import ProductWalkthrough from "./product-walkthrough.svelte";
	import type { SiteCopy } from "@/i18n";

	let { copy } = $props<{ copy: SiteCopy }>();
	const principles = $derived(copy.landing.principles);
	const roles = $derived(copy.landing.roles);
</script>

<div id="top" class="overflow-x-clip bg-background text-foreground">
	<header class="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
		<div class="site-shell relative flex h-16 items-center justify-between">
			<a href="#top" class="inline-flex items-center gap-2.5" aria-label={copy.nav.homeAria}>
				<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
				<span class="text-base font-[540] tracking-[-0.02em]">Gatherory</span>
			</a>

			<nav class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 text-[0.9rem] font-[480] lg:flex" aria-label={copy.nav.mainNavigation}>
				<a class="nav-link" href={copy.nav.iphoneHref}>{copy.nav.iphone}</a>
				<a class="nav-link" href="#how-it-works">{copy.nav.howItWorks}</a>
				<a class="nav-link" href="#people">{copy.nav.people}</a>
				<a class="nav-link" href={copy.nav.guidesHref}>{copy.nav.guides}</a>
			</nav>

			<div class="hidden items-center gap-4 lg:flex">
				<a href={copy.nav.languageHref} class="nav-link text-sm">{copy.nav.languageLabel}</a>
				<a href={copy.nav.iphoneHref} class="pill-button h-11 px-5 text-sm">{copy.nav.iphone}</a>
			</div>
			<MobileNav {copy} />
		</div>
	</header>

	<main>
		<section class="site-shell hero-section">
			<div class="hero-copy">
				<h1 class="display-title max-w-[10ch]">
					{copy.landing.heroTitle} <span class="text-brand-blue">{copy.landing.heroAccent}</span>
				</h1>
				<p class="body-lead mt-6 max-w-xl">{copy.landing.heroDescription}</p>
				<div class="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center">
					<a href={copy.nav.iphoneHref} class="pill-button min-h-12 px-6 py-3 text-base">
						{copy.landing.startPlanning} <IconArrowRight class="size-4 shrink-0" />
					</a>
					<a href="#product" class="text-link">{copy.landing.howItWorks}</a>
				</div>
				<p class="mt-5 text-sm text-muted-foreground">{copy.landing.availability}</p>
			</div>
			<figure class="hero-preview" aria-label={copy.landing.heroPreviewLabel}>
				<div class="hero-orbit" aria-hidden="true"></div>
				<DevicePair
					phoneSrc="/images/ios/ideas.webp"
					phoneAlt={copy.landing.heroImageAlt}
					duoSrc="/images/ios/duo/ideas.webp"
					duoAlt={copy.landing.heroDuoImageAlt}
					phoneLabel={copy.landing.heroPhoneLabel}
					duoLabel={copy.landing.heroDuoLabel}
				/>
				<span class="hero-spark" aria-hidden="true">✳</span>
				<figcaption class="hero-note">
					<span class="hero-note-icon"><IconHeart class="size-5" aria-hidden="true" /></span>
					<div><p class="font-[540]">{copy.landing.heroCardTitle}</p><p class="mt-1 text-sm text-muted-foreground">{copy.landing.heroCardDescription}</p></div>
				</figcaption>
			</figure>
			<div class="hero-occasions">
				{#each copy.landing.heroOccasions as occasion}<span><span class="text-brand-blue" aria-hidden="true">✦</span> {occasion}</span>{/each}
			</div>
		</section>

		<section id="product" class="site-shell scroll-mt-24 pb-24 sm:pb-32">
			<ProductWalkthrough copy={copy.landing} />
		</section>

		<div class="overflow-hidden bg-black py-3 text-white" aria-hidden="true">
			<div class="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em]">
				{#each Array(3) as _}
					{#each copy.landing.marquee as item}<span>{item}</span><span class="text-brand-cyan">✦</span>{/each}
				{/each}
			</div>
		</div>

		<section id="how-it-works" class="site-shell scroll-mt-24 py-24 sm:py-32">
			<div class="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
				<div>
					<h2 class="section-title max-w-[9ch]">{copy.landing.principlesTitle}</h2>
				</div>

				<div class="divide-y divide-black/15 border-y border-black/15">
					{#each principles as principle}
						<article class="grid gap-5 py-8 sm:grid-cols-[3.5rem_1fr] sm:py-10">
							<p class="font-mono text-sm text-brand-blue">{principle.number}</p>
							<div>
								<h3 class="text-2xl font-[540] tracking-[-0.025em]">{principle.title}</h3>
								<p class="mt-3 max-w-2xl text-lg leading-7">{principle.body}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="site-shell lifestyle-section">
			<figure class="lifestyle-photo">
				<img src="https://images.unsplash.com/photo-1758272133833-3a2277d426e4?auto=format&amp;fit=crop&amp;w=1400&amp;q=80" srcset="https://images.unsplash.com/photo-1758272133833-3a2277d426e4?auto=format&amp;fit=crop&amp;w=700&amp;q=80 700w, https://images.unsplash.com/photo-1758272133833-3a2277d426e4?auto=format&amp;fit=crop&amp;w=1400&amp;q=80 1400w" sizes="(min-width: 1024px) 55vw, 100vw" alt={copy.landing.lifestyleImageAlt} width="1400" height="788" loading="lazy" decoding="async" />
			</figure>
			<div class="lifestyle-copy">
				<h2 class="section-title">{copy.landing.lifestyleTitle}</h2>
				<p class="mt-6 text-lg leading-8">{copy.landing.lifestyleDescription}</p>
			</div>
		</section>

		<section id="people" class="site-shell scroll-mt-24 py-8 sm:py-16">
			<div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
				<div>
					<h2 class="section-title max-w-[11ch]">{copy.landing.peopleTitle}</h2>
				</div>
				<p class="max-w-2xl text-xl leading-8">
					{copy.landing.peopleDescription}
				</p>
			</div>

			<div class="mt-14 grid gap-4 md:grid-cols-3">
				{#each roles as role}
					<article class={`min-h-52 rounded-3xl p-7 ${role.color}`}>
						<div class="flex justify-end">
							{#if role.key === "host"}<IconHeart class="size-6" />{:else if role.key === "collaborator"}<IconSparkles class="size-6" />{:else}<IconUsers class="size-6" />{/if}
						</div>
						<h3 class="mt-6 text-2xl font-[540] tracking-[-0.035em]">{role.label}</h3>
						<p class="mt-2 text-base">{role.detail}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="site-shell py-24 sm:py-32">
			<div class="rounded-[2rem] bg-black px-6 py-16 text-center text-white sm:px-12 sm:py-24">
				<img src="/gatherory-icon.png" alt="" class="mx-auto size-16 rounded-2xl" width="64" height="64" />
				<h2 class="section-title mx-auto mt-8 max-w-[13ch]">{copy.landing.closingTitle}</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/85">{copy.landing.closingDescription}</p>
				<a href={copy.nav.iphoneHref} class="pill-button-inverse mt-9 h-12 px-7 text-base">
					{copy.landing.createEvent} <IconArrowRight class="size-4" />
				</a>
			</div>
		</section>
	</main>

	<footer class="border-t border-black/10">
		<div class="site-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
			<div>
				<div class="flex items-center gap-2.5 text-lg font-[540]"><img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" /> Gatherory</div>
				<p class="mt-5 max-w-sm text-sm">{copy.footer.description}</p>
			</div>
			<nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-[480]" aria-label={copy.nav.footerNavigation}>
				<a class="nav-link" href="#product">{copy.nav.product}</a>
				<a class="nav-link" href="#how-it-works">{copy.nav.howItWorks}</a>
				<a class="nav-link" href={copy.nav.guidesHref}>{copy.nav.guides}</a>
				<a class="nav-link" href={copy.nav.privacyHref}>{copy.nav.privacy}</a>
				<a class="nav-link" href={copy.nav.termsHref}>{copy.nav.terms}</a>
				<a class="nav-link" href={APP_SIGN_IN_URL}>{copy.nav.signIn}</a>
				<a class="nav-link" href={copy.nav.languageHref}>{copy.nav.languageLabel}</a>
				<a class="nav-link" href="#top">{copy.nav.backToTop}</a>
			</nav>
		</div>
	</footer>
</div>

<style>
	.hero-section { display: grid; gap: 2.5rem; padding-top: 3.5rem; padding-bottom: 4.5rem; }
	.hero-copy { align-self: center; }
	.hero-preview { position: relative; display: flex; align-items: center; justify-content: center; isolation: isolate; min-height: 34rem; margin: 0; padding: 2rem 1.5rem 5.5rem; border-radius: 2rem; background: #f4f6fc; }
	.hero-orbit { position: absolute; z-index: -1; width: 90%; aspect-ratio: 1; border-radius: 50%; background: #dce8ff; }
	.hero-note { position: absolute; bottom: 1.5rem; left: 1rem; right: 1rem; display: flex; align-items: center; gap: .85rem; padding: 1rem; border: 1px solid #0000000d; border-radius: 1rem; background: white; box-shadow: 0 10px 30px #14275510; }
	.hero-note-icon { display: grid; flex-shrink: 0; width: 2.5rem; height: 2.5rem; place-items: center; border-radius: 50%; background: #dceeb1; }
	.hero-spark { position: absolute; right: 1.5rem; top: 1.25rem; color: #2878ff; font-size: 4rem; line-height: 1; }
	.hero-occasions { display: flex; flex-wrap: wrap; gap: 1rem 2rem; padding-top: 1.5rem; border-top: 1px solid #00000015; font-size: .85rem; color: #545454; }
	.hero-occasions > span { display: inline-flex; align-items: center; gap: .65rem; }
	.lifestyle-section { display: grid; gap: 2.5rem; padding-bottom: 5rem; }
	.lifestyle-photo { position: relative; margin: 0; overflow: hidden; border-radius: 1.5rem; background: #e5eacb; }
	.lifestyle-photo img { display: block; width: 100%; height: 100%; min-height: 19rem; aspect-ratio: 1.55; object-fit: cover; }
	.lifestyle-copy { align-self: center; }
	@media (min-width: 1024px) { .lifestyle-section { grid-template-columns: 1.25fr 1fr; gap: 4rem; padding-bottom: 7rem; } }
	@media (min-width: 640px) { .hero-section { padding-top: 4rem; padding-bottom: 5rem; } .hero-note { left: 1.5rem; right: 1.5rem; } }
	@media (min-width: 1024px) { .hero-section { grid-template-columns: 1.05fr .95fr; column-gap: 3.5rem; row-gap: 3rem; padding-top: 4.5rem; } .hero-preview { min-height: 38rem; } .hero-occasions { grid-column: 1 / -1; } .hero-note { left: -1.5rem; right: 2.5rem; bottom: 2.5rem; } }
</style>
