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

	const principles = [
		{
			number: "01",
			title: "Ideas stay with the event",
			body: "Save the venue, playlist, attire, and tiny details beside the gathering they belong to—not in another endless group chat.",
		},
		{
			number: "02",
			title: "Decisions have a next step",
			body: "Let the right people pass, consider, or love an idea, then carry the choice forward without recreating it somewhere else.",
		},
		{
			number: "03",
			title: "Every person gets their lane",
			body: "Hosts lead, collaborators help, and guests receive the polished experience when it is ready.",
		},
	];

	const roles = [
		{ label: "Host", detail: "Shapes the gathering", color: "bg-brand-blue text-white" },
		{ label: "Collaborator", detail: "Helps move plans forward", color: "bg-block-lilac text-black" },
		{ label: "Guest", detail: "Gets the context they need", color: "bg-block-lime text-black" },
	];
</script>

<div id="top" class="overflow-x-clip bg-background text-foreground">
	<header class="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
		<div class="site-shell relative flex h-16 items-center justify-between">
			<a href="#top" class="inline-flex items-center gap-2.5" aria-label="Gatherory home">
				<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
				<span class="text-base font-[540] tracking-[-0.02em]">Gatherory</span>
			</a>

			<nav class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[0.95rem] font-[480] lg:flex" aria-label="Main navigation">
				<a class="nav-link" href="#product">Product</a>
				<a class="nav-link" href="#how-it-works">How it works</a>
				<a class="nav-link" href="#people">People</a>
			</nav>

			<a href={APP_SIGN_IN_URL} class="pill-button hidden h-11 px-5 text-[0.95rem] lg:inline-flex">Sign in</a>
			<MobileNav />
		</div>
	</header>

	<main>
		<section class="site-shell pb-20 pt-20 text-center sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
			<h1 class="display-title mx-auto max-w-[12ch]">
				Bring every part of the gathering <span class="text-brand-blue">together.</span>
			</h1>
			<p class="body-lead mx-auto mt-8 max-w-2xl">
				Plan the main event, shape the moments around it, collect ideas, and invite each person into exactly the context they need.
			</p>
			<div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href={APP_SIGN_UP_URL} class="pill-button h-12 px-7 text-base">
					Start planning <IconArrowRight class="size-4" />
				</a>
				<a href="#how-it-works" class="text-link">How it works</a>
			</div>
		</section>

		<section id="product" class="site-shell scroll-mt-24 pb-24 sm:pb-32">
			<EventCanvas />
		</section>

		<div class="overflow-hidden bg-black py-3 text-white" aria-hidden="true">
			<div class="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em]">
				{#each Array(3) as _}
					<span>Ideas</span><span class="text-brand-cyan">✦</span>
					<span>Decisions</span><span class="text-brand-cyan">✦</span>
					<span>People</span><span class="text-brand-cyan">✦</span>
					<span>Moments</span><span class="text-brand-cyan">✦</span>
					<span>One gathering</span><span class="text-brand-cyan">✦</span>
				{/each}
			</div>
		</div>

		<section id="how-it-works" class="site-shell scroll-mt-24 py-24 sm:py-32">
			<div class="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
				<div>
					<h2 class="section-title max-w-[9ch]">Plan without losing the thread.</h2>
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
					<h2 class="section-title">Make deciding feel lighter.</h2>
					<p class="mt-7 text-xl leading-8">
						Ideas can begin casually, gather input from the right people, and become part of the plan without losing their history.
					</p>
					<ul class="mt-8 space-y-3 text-base">
						<li class="flex items-center gap-3"><IconCheck class="size-5 text-brand-blue" /> Capture it while it is fresh</li>
						<li class="flex items-center gap-3"><IconCheck class="size-5 text-brand-blue" /> Decide with your circle</li>
						<li class="flex items-center gap-3"><IconCheck class="size-5 text-brand-blue" /> Carry the choice into the plan</li>
					</ul>
				</div>

				<div class="min-w-0">
					<DecisionDeck />
				</div>
			</div>
		</section>

		<section id="people" class="site-shell scroll-mt-24 py-8 sm:py-16">
			<div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
				<div>
					<h2 class="section-title max-w-[11ch]">The right people see the right parts.</h2>
				</div>
				<p class="max-w-2xl text-xl leading-8">
					A collaborator can help shape the plan. A guest can receive the finished experience. Gatherory keeps those relationships clear without turning every invitation into workspace access.
				</p>
			</div>

			<div class="mt-14 grid gap-4 md:grid-cols-3">
				{#each roles as role}
					<article class={`min-h-52 rounded-3xl p-7 ${role.color}`}>
						<div class="flex justify-end">
							{#if role.label === "Host"}<IconHeart class="size-6" />{:else if role.label === "Collaborator"}<IconSparkles class="size-6" />{:else}<IconUsers class="size-6" />{/if}
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
				<h2 class="section-title mx-auto mt-8 max-w-[13ch]">The gathering is the point. Planning should help you reach it.</h2>
				<p class="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/85">Create the main event, invite your people, and let every good idea find its place.</p>
				<a href={APP_SIGN_UP_URL} class="pill-button-inverse mt-9 h-12 px-7 text-base">
					Create your event <IconArrowRight class="size-4" />
				</a>
			</div>
		</section>
	</main>

	<footer class="border-t border-black/10">
		<div class="site-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
			<div>
				<div class="flex items-center gap-2.5 text-lg font-[540]"><img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" /> Gatherory</div>
				<p class="mt-5 max-w-sm text-sm">Events, decisions, and people—gathered with purpose.</p>
			</div>
			<nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm font-[480]" aria-label="Footer navigation">
				<a class="nav-link" href="#product">Product</a>
				<a class="nav-link" href="#how-it-works">How it works</a>
				<a class="nav-link" href="/resources">Guides</a>
				<a class="nav-link" href="/privacy">Privacy</a>
				<a class="nav-link" href="/terms">Terms</a>
				<a class="nav-link" href={APP_SIGN_IN_URL}>Sign in</a>
				<a class="nav-link" href="#top">Back to top</a>
			</nav>
		</div>
	</footer>
</div>
