<script lang="ts">
	import {
		IconCalendarEvent,
		IconHeart,
		IconMapPin,
		IconSparkles,
		IconUsers,
	} from "@tabler/icons-svelte";
	import type { SiteCopy } from "@/i18n";

	let { copy } = $props<{ copy: SiteCopy["landing"] }>();
</script>

<div class="event-poster overflow-hidden rounded-[2rem] bg-brand-blue text-white">
	<div class="grid gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:px-12 lg:py-12">
		<div class="max-w-md">
			<h2 class="text-[clamp(2.75rem,5vw,4.4rem)] font-[340] leading-[0.98] tracking-[-0.045em]">
				{copy.canvasTitle}
			</h2>
			<p class="mt-6 max-w-sm text-lg leading-7 text-white/90">
				{copy.canvasDescription}
			</p>
		</div>

		<div class="relative mx-auto h-[31rem] w-full max-w-[42rem] sm:h-[34rem]" aria-label={copy.canvasAria}>
			<div class="absolute inset-x-0 bottom-0 top-5 rotate-[1.5deg] rounded-[1.75rem] bg-[#dce8ff]"></div>
			<div class="absolute inset-0 -rotate-[1deg] overflow-hidden rounded-[1.75rem] bg-[#f7f7f5] text-black">
				<div class="absolute inset-x-0 top-0 flex h-12 items-center gap-2 border-b border-black/10 px-5 font-mono text-[0.65rem] uppercase tracking-[0.12em]">
					<span class="size-2 rounded-full bg-brand-blue"></span>
					{copy.exampleGathering}
				</div>

				<div class="absolute left-5 top-[4.5rem] w-[58%] rotate-[-2deg] rounded-2xl border border-black/10 bg-white p-5 sm:left-8 sm:w-[54%] sm:p-6">
					<div class="flex items-start justify-between gap-4">
						<div class="grid size-11 shrink-0 place-items-center rounded-full bg-brand-blue text-white">
							<IconHeart class="size-5" stroke={1.8} />
						</div>
						<span class="rounded-full bg-block-lime px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider">{copy.mainEvent}</span>
					</div>
					<h3 class="mt-8 text-2xl font-[540] tracking-[-0.03em] sm:text-3xl">{copy.exampleEventName}</h3>
					<p class="mt-2 text-sm">{copy.exampleEventDateAndLocation}</p>
					<div class="mt-6 flex items-center gap-2 text-sm">
						<span class="inline-flex -space-x-2">
							<span class="size-7 rounded-full border-2 border-white bg-block-lilac"></span>
							<span class="size-7 rounded-full border-2 border-white bg-block-coral"></span>
							<span class="size-7 rounded-full border-2 border-white bg-block-mint"></span>
						</span>
						{copy.examplePeoplePlanning}
					</div>
				</div>

				<div class="absolute right-4 top-16 w-[42%] rotate-[3deg] rounded-xl bg-block-lilac p-4 sm:right-7 sm:w-[38%] sm:p-5">
					<IconMapPin class="size-5" stroke={1.8} />
					<p class="mt-8 font-[540] leading-tight">{copy.venueWalkthrough}</p>
					<p class="mt-2 text-xs">{copy.planningDate}</p>
				</div>

				<div class="absolute bottom-6 left-5 w-[44%] rotate-[2deg] rounded-xl bg-block-lime p-4 sm:left-8 sm:w-[40%] sm:p-5">
					<IconSparkles class="size-5" stroke={1.8} />
					<p class="mt-7 font-[540] leading-tight">{copy.dinnerAndDancing}</p>
					<p class="mt-2 text-xs">{copy.guestMomentDate}</p>
				</div>

				<div class="absolute bottom-10 right-4 w-[45%] rotate-[-3deg] rounded-xl bg-block-coral p-4 sm:right-7 sm:w-[40%] sm:p-5">
					<div class="flex items-center justify-between">
						<IconCalendarEvent class="size-5" stroke={1.8} />
						<IconUsers class="size-5" stroke={1.8} />
					</div>
				<p class="mt-7 font-[540] leading-tight">{copy.menuTasting}</p>
				<p class="mt-2 text-xs">{copy.collaboratorsCount}</p>
				</div>
			</div>
		</div>
	</div>
</div>
