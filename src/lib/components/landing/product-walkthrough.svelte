<script lang="ts">
	import type { SiteCopy } from "@/i18n";
	import DeviceNotch from "./device-notch.svelte";

	let { copy } = $props<{ copy: SiteCopy["landing"] }>();
	const features = $derived([
		{
			key: "decide",
			title: copy.decideFeatureTitle,
			body: copy.decideFeatureBody,
			image: "/images/ios/decide.webp",
			alt: copy.decideFeatureAlt,
			device: copy.decideFeatureDevice,
			width: 1206,
			height: 2622,
			isDuo: false,
		},
		{
			key: "manage",
			title: copy.manageFeatureTitle,
			body: copy.manageFeatureBody,
			image: "/images/ios/duo/manage.webp",
			alt: copy.manageFeatureAlt,
			device: copy.manageFeatureDevice,
			width: 2007,
			height: 2853,
			isDuo: true,
		},
	]);
</script>

<div class="product-walkthrough">
	{#each features as feature, index}
		<article id={feature.key} class="feature-row" class:feature-reversed={index === 1}>
			<div class="feature-copy">
				<h2 class="section-title max-w-[14ch]">{feature.title}</h2>
				<p class="mt-6 max-w-lg text-lg leading-8">{feature.body}</p>
			</div>
			<figure class="feature-visual" class:feature-duo={feature.isDuo}>
				<a class="screenshot-stage" href={feature.image} target="_blank" rel="noopener noreferrer" aria-label={`${feature.device}: ${copy.viewFullSize}`}>
					<span class="screenshot-screen">
						<img src={feature.image} alt={feature.alt} width={feature.width} height={feature.height} loading="lazy" decoding="async" />
						{#if !feature.isDuo}<DeviceNotch />{/if}
					</span>
				</a>
				<figcaption>{feature.device} · {copy.viewFullSize} <span aria-hidden="true">↗</span></figcaption>
			</figure>
		</article>
	{/each}
</div>

<style>
	.product-walkthrough { display: grid; }
	.feature-row { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); align-items: center; gap: clamp(2.5rem, 7vw, 7rem); padding-block: clamp(3.5rem, 7vw, 6rem); border-bottom: 1px solid #00000015; scroll-margin-top: 6rem; }
	.feature-row:first-child { padding-top: 1rem; }
	.feature-row:last-child { padding-bottom: 0; border-bottom: 0; }
	.feature-copy { min-width: 0; }
	.feature-visual { display: grid; justify-items: center; gap: 1rem; min-width: 0; margin: 0; }
	.screenshot-stage { position: relative; display: block; width: min(100%, 23rem); padding: .5rem; border: 2px solid #777d87; border-radius: 2.75rem; background: #16181d; box-shadow: inset 0 0 0 1px #06070a, 0 0 0 1px #252830, 3px 3px 0 #090b10, 0 28px 50px -28px #162b5460; transform: rotate(1deg); }
	.screenshot-stage::before, .screenshot-stage::after { content: ""; position: absolute; z-index: -1; width: 3px; border-radius: 2px; background: linear-gradient(90deg, #272b33, #979da7, #272b33); }
	.screenshot-stage::before { top: 21%; left: -5px; height: 12%; }
	.screenshot-stage::after { top: 26%; right: -5px; height: 8%; }
	.feature-duo .screenshot-stage { width: min(100%, 32rem); border-radius: 2rem; transform: rotate(-.6deg); }
	.screenshot-stage img { display: block; width: 100%; height: auto; border-radius: 2.15rem; background: #fff; }
	.screenshot-screen { position: relative; display: block; }
	.feature-duo .screenshot-stage img { border-radius: 1.4rem; }
	.screenshot-stage:focus-visible { outline: 3px solid var(--brand-blue); outline-offset: 6px; }
	.feature-visual figcaption { color: #4f5663; font-size: .8rem; font-weight: 520; line-height: 1.4; }
	.feature-reversed { grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); }
	.feature-reversed .feature-copy { order: 2; }
	.feature-reversed .feature-visual { order: 1; }
	@media (max-width: 767px) {
		.feature-row, .feature-reversed { grid-template-columns: minmax(0, 1fr); gap: 2rem; padding-block: 3rem; }
		.feature-row:first-child { padding-top: 1rem; }
		.feature-reversed .feature-copy, .feature-reversed .feature-visual { order: initial; }
		.screenshot-stage, .feature-duo .screenshot-stage { width: min(100%, 24rem); transform: none; }
	}
</style>
