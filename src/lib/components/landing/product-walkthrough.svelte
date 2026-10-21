<script lang="ts">
	import type { SiteCopy } from "@/i18n";

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
					<img src={feature.image} alt={feature.alt} width={feature.width} height={feature.height} loading="lazy" decoding="async" />
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
	.screenshot-stage { display: grid; width: min(100%, 23rem); place-items: center; padding: .75rem; border: 1px solid #e2e7f0; border-radius: 1.5rem; background: #f4f6fc; box-shadow: 0 24px 60px -42px #162b5450; }
	.feature-duo .screenshot-stage { width: min(100%, 32rem); }
	.screenshot-stage img { display: block; width: 100%; height: auto; }
	.screenshot-stage:focus-visible { outline: 3px solid var(--brand-blue); outline-offset: 6px; }
	.feature-visual figcaption { color: #4f5663; font-size: .8rem; font-weight: 520; line-height: 1.4; }
	.feature-reversed { grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); }
	.feature-reversed .feature-copy { order: 2; }
	.feature-reversed .feature-visual { order: 1; }
	@media (max-width: 767px) {
		.feature-row, .feature-reversed { grid-template-columns: minmax(0, 1fr); gap: 2rem; padding-block: 3rem; }
		.feature-row:first-child { padding-top: 1rem; }
		.feature-reversed .feature-copy, .feature-reversed .feature-visual { order: initial; }
		.screenshot-stage, .feature-duo .screenshot-stage { width: min(100%, 24rem); padding: .5rem; border-radius: 1rem; }
	}
</style>
