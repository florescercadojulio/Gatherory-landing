<script lang="ts">
	import { IconHeart } from "@tabler/icons-svelte";
	import type { SiteCopy } from "@/i18n";
	let { copy } = $props<{ copy: SiteCopy["landing"] }>();
	const imageUrl = (id: string, width: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${width}`;
</script>

<div class="event-poster overflow-hidden rounded-[2rem] bg-brand-blue text-white">
	<div class="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14 lg:px-12">
		<div class="max-w-md">
			<h2 class="text-[clamp(2.75rem,5vw,4.4rem)] font-[340] leading-[0.98] tracking-[-0.045em]">{copy.canvasTitle}</h2>
			<p class="mt-6 max-w-sm text-lg leading-7 text-white/90">{copy.canvasDescription}</p>
		</div>
		<article class="min-w-0 rounded-3xl bg-[#f7f7f5] p-4 text-black sm:p-6" aria-labelledby="example-event-name">
			<div class="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<span class="grid size-11 place-items-center rounded-full bg-brand-blue text-white"><IconHeart class="size-5" /></span>
					<span class="rounded-full bg-block-lime px-3 py-1.5 text-xs">{copy.mainEvent}</span>
				</div>
				<h3 id="example-event-name" class="mt-5 text-3xl font-[540] tracking-[-0.03em]">{copy.exampleEventName}</h3>
				<p class="mt-2 text-sm text-muted-foreground">{copy.exampleEventDateAndLocation}</p>
				<img class="mt-5 h-36 w-full rounded-xl object-cover sm:h-44" src={imageUrl(copy.canvasPhotos[0].imageId, 960)} srcset={`${imageUrl(copy.canvasPhotos[0].imageId, 480)} 480w, ${imageUrl(copy.canvasPhotos[0].imageId, 960)} 960w`} sizes="(min-width: 1024px) 42vw, 90vw" alt={copy.canvasPhotos[0].imageAlt} width="960" height="440" loading="lazy" decoding="async" />
				<div class="mt-5 flex items-center gap-3 border-t border-black/10 pt-4 text-sm">
					<span class="inline-flex -space-x-2" aria-hidden="true">
						<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&amp;h=80&amp;fit=crop&amp;crop=faces&amp;auto=format" alt="" width="28" height="28" loading="lazy" class="size-7 rounded-full border-2 border-white object-cover" />
						<img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&amp;h=80&amp;fit=crop&amp;crop=faces&amp;auto=format" alt="" width="28" height="28" loading="lazy" class="size-7 rounded-full border-2 border-white object-cover" />
						<img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&amp;h=80&amp;fit=crop&amp;crop=faces&amp;auto=format" alt="" width="28" height="28" loading="lazy" class="size-7 rounded-full border-2 border-white object-cover" />
						<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&amp;h=80&amp;fit=crop&amp;crop=faces&amp;auto=format" alt="" width="28" height="28" loading="lazy" class="size-7 rounded-full border-2 border-white object-cover" />
					</span>{copy.examplePeoplePlanning}
				</div>
			</div>
			<div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each copy.canvasPhotos.slice(1) as photo}
					<figure class="overflow-hidden rounded-2xl bg-white">
						<img class="h-28 w-full object-cover sm:h-24" src={imageUrl(photo.imageId, 640)} srcset={`${imageUrl(photo.imageId, 360)} 360w, ${imageUrl(photo.imageId, 640)} 640w`} sizes="(min-width: 1024px) 14vw, (min-width: 640px) 28vw, 90vw" alt={photo.imageAlt} width="640" height="300" loading="lazy" decoding="async" />
						<figcaption class="p-3"><span class="block text-[0.62rem] font-medium uppercase tracking-[0.12em] text-brand-blue">{photo.kind}</span><span class="mt-1 block text-sm font-[540] leading-snug">{photo.title}</span></figcaption>
					</figure>
				{/each}
			</div>
		</article>
	</div>
</div>
