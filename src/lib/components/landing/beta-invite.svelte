<script lang="ts">
	import { IconArrowUpRight } from "@tabler/icons-svelte";
	import type { SiteCopy } from "@/i18n";
	import { TESTFLIGHT_BETA_URL } from "@/lib/site-links";
	import WaitlistForm from "./waitlist-form.svelte";
	let { copy, source = "landing_home" } = $props<{ copy: SiteCopy["beta"]; source?: "landing_home" | "landing_iphone" }>();
</script>

<div id="beta" class="beta-panel">
	<div>
		<h2 class="section-title max-w-[18ch]">{copy.title}</h2>
		<p class="mt-6 max-w-xl text-lg leading-8 text-white/85">{copy.description}</p>
		<a href={TESTFLIGHT_BETA_URL} class="pill-button-inverse mt-8 min-h-12 px-6 py-3 text-base">
			{copy.cta}<IconArrowUpRight class="size-4 shrink-0" aria-hidden="true" />
		</a>
		<p class="mt-5 max-w-md text-sm leading-6 text-white/70">{copy.instructions}</p>
	</div>
	<figure class="beta-qr">
		<img src="/images/beta/gatherory-testflight-qr.svg" alt={copy.qrAlt} width="624" height="624" loading="lazy" />
		<figcaption class="mt-2">
			<span class="block text-sm font-[540]">{copy.scan}</span>
			<a class="nav-link mt-3 inline-block text-xs text-muted-foreground" href="/images/beta/gatherory-testflight-qr.png" download="gatherory-testflight-qr.png">{copy.download}</a>
		</figcaption>
	</figure>
</div>

<WaitlistForm copy={copy.waitlist} {source} />

<style>
	.beta-panel { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 4rem; padding: clamp(2rem, 5vw, 4.5rem); border-radius: 2rem; background: #000; color: #fff; scroll-margin-top: 6rem; }
	.beta-qr { display: grid; justify-items: center; width: 14rem; max-width: 100%; margin: 0; padding: 1rem; border-radius: 1.25rem; background: #fff; color: #111; text-align: center; }
	.beta-qr img { display: block; width: 12rem; max-width: 100%; height: auto; }
	@media (max-width: 767px) {
		.beta-panel { grid-template-columns: minmax(0, 1fr); gap: 2rem; padding: 2rem 1.5rem; }
		.beta-qr { justify-self: center; }
	}
</style>
