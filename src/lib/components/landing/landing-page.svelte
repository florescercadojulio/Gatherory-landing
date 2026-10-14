<script lang="ts">
	import {
		IconArrowRight,
		IconCheck,
		IconHeart,
		IconSparkles,
		IconUsers,
	} from "@tabler/icons-svelte";
	import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "@/lib/site-links";
	import MobileNav from "@/lib/components/mobile-nav.svelte";
	import DecisionDeck from "./decision-deck.svelte";
	import EventCanvas from "./event-canvas.svelte";
	import type { SiteCopy } from "@/i18n";

	let { copy } = $props<{ copy: SiteCopy }>();
	const principles = copy.landing.principles;
	const roles = copy.landing.roles;
</script>

<div id="top" class="overflow-x-clip bg-background text-foreground">
	<header class="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
		<div class="site-shell relative flex h-16 items-center justify-between">
			<a href="#top" class="inline-flex items-center gap-2.5" aria-label={copy.nav.homeAria}>
				<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
				<span class="text-base font-[540] tracking-[-0.02em]">Gatherory</span>
			</a>

			<nav class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[0.95rem] font-[480] lg:flex" aria-label={copy.nav.mainNavigation}>
				<a class="nav-link" href="#product">{copy.nav.product}</a>
				<a class="nav-link" href="#how-it-works">{copy.nav.howItWorks}</a>
				<a class="nav-link" href="#people">{copy.nav.people}</a>
				<a class="nav-link" href="/resources">{copy.nav.guides}</a>
			</nav>

			<a href={APP_SIGN_IN_URL} class="pill-button hidden h-11 px-5 text-[0.95rem] lg:inline-flex">{copy.nav.signIn}</a>
			<MobileNav {copy} />
		</div>
	</header>

	<main>
		<section class="site-shell pb-20 pt-20 text-center sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
			<h1 class="display-title mx-auto max-w-[12ch]">
				{copy.landing.heroTitle} <span class="text-brand-blue">{copy.landing.heroAccent}</span>
			</h1>
			<p class="body-lead mx-auto mt-8 max-w-2xl">
				{copy.landing.heroDescription}
			</p>
			<div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href={APP_SIGN_UP_URL} class="pill-button h-12 px-7 text-base">
					{copy.landing.startPlanning} <IconArrowRight class="size-4" />
				</a>
				<a href="#how-it-works" class="text-link">{copy.landing.howItWorks}</a>
			</div>
			<p class="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">{copy.landing.availability}</p>
		</section>

		<section id="product" class="site-shell scroll-mt-24 pb-24 sm:pb-32">
			<EventCanvas copy={copy.landing} />
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

		<section class="site-shell pb-24 sm:pb-32">
			<div class="poster-grid bg-block-cream">
				<div class="max-w-lg self-center">
					<h2 class="section-title">{copy.landing.decidingTitle}</h2>
					<p class="mt-7 text-xl leading-8">
						{copy.landing.decidingDescription}
					</p>
					<ul class="mt-8 space-y-3 text-base">
						{#each copy.landing.decidingSteps as step}<li class="flex items-center gap-3"><IconCheck class="size-5 text-brand-blue" /> {step}</li>{/each}
					</ul>
				</div>

				<div class="min-w-0">
					<DecisionDeck copy={copy.landing} />
				</div>
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
						<h3 class="mt-16 text-3xl font-[540] tracking-[-0.035em]">{role.label}</h3>
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
				<a href={APP_SIGN_UP_URL} class="pill-button-inverse mt-9 h-12 px-7 text-base">
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
				<a class="nav-link" href="/resources">{copy.nav.guides}</a>
				<a class="nav-link" href="/privacy">{copy.nav.privacy}</a>
				<a class="nav-link" href="/terms">{copy.nav.terms}</a>
				<a class="nav-link" href={APP_SIGN_IN_URL}>{copy.nav.signIn}</a>
				<a class="nav-link" href="#top">{copy.nav.backToTop}</a>
			</nav>
		</div>
	</footer>
</div>
