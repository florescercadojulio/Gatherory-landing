<script lang="ts">
	import { IconCheck, IconHeart, IconRefresh, IconX } from "@tabler/icons-svelte";
	import { Badge } from "@/lib/components/ui/badge/index.js";
	import { Button } from "@/lib/components/ui/button/index.js";
	import type { SiteCopy } from "@/i18n";

	let { copy } = $props<{ copy: SiteCopy["landing"] }>();
	const ideas = copy.demoIdeas;

	let index = $state(0);
	let verdict = $state<"yes" | "pass" | null>(null);
	let isMoving = $state(false);

	const idea = $derived(ideas[index]);

	function decide(nextVerdict: "yes" | "pass") {
		if (isMoving) return;
		verdict = nextVerdict;
		isMoving = true;

		window.setTimeout(() => {
			index = (index + 1) % ideas.length;
			verdict = null;
			isMoving = false;
		}, 320);
	}

	function reset() {
		index = 0;
		verdict = null;
		isMoving = false;
	}
</script>

<div class="mx-auto w-full max-w-[31rem]" aria-live="polite">
	<div class="relative min-h-[35rem] sm:min-h-[39rem]">
		<div class="absolute inset-x-8 top-5 h-[31rem] rotate-3 rounded-[2rem] bg-block-lilac sm:h-[35rem]"></div>
		<div class="absolute inset-x-5 top-2 h-[31rem] -rotate-2 rounded-[2rem] bg-block-cream sm:h-[35rem]"></div>
		<article
			class={`absolute inset-x-0 top-0 overflow-hidden rounded-[2rem] border border-black/10 bg-white text-black shadow-[0_24px_70px_rgba(13,13,13,0.14)] transition-all duration-300 ${verdict === "yes" ? "translate-x-14 rotate-6 opacity-0" : ""} ${verdict === "pass" ? "-translate-x-14 -rotate-6 opacity-0" : ""}`}
		>
			<div class={`relative h-64 overflow-hidden ${idea.color}`}>
				<div class="absolute -right-10 -top-8 size-48 rounded-full border-[22px] border-black/10"></div>
				<div class="absolute bottom-7 left-7 h-36 w-28 -rotate-6 rounded-t-full bg-white/75"></div>
				<div class="absolute bottom-10 left-[8.5rem] h-28 w-24 rotate-6 rounded-t-full bg-brand-blue/75"></div>
				<div class="absolute left-6 top-6">
					<Badge variant="default">{idea.label}</Badge>
				</div>
				{#if verdict}
					<div class={`absolute right-6 top-6 rotate-6 rounded-xl border-4 px-4 py-2 font-mono text-xl font-bold uppercase tracking-widest ${verdict === "yes" ? "border-black bg-block-lime" : "border-black bg-white"}`}>
						{verdict === "yes" ? copy.saved : copy.passed}
					</div>
				{/if}
			</div>

			<div class="p-6 sm:p-8">
				<p class="metadata-label text-black/50">{idea.note}</p>
				<h3 class="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[2.5rem]">
					{idea.title}
				</h3>
				<p class="mt-4 text-base text-black/60">{idea.detail}</p>

				<div class="mt-8 flex items-center justify-center gap-4 border-t border-black/10 pt-6">
					<Button
						variant="outline"
						size="icon-lg"
						class="size-14 border-black/20 bg-white text-black hover:border-black hover:bg-black hover:text-white"
						onclick={() => decide("pass")}
						aria-label={copy.passIdea}
					>
						<IconX class="size-6" stroke={1.8} />
					</Button>
					<Button
						variant="default"
						size="icon-lg"
						class="size-16 bg-brand-blue text-white shadow-[0_10px_24px_rgba(40,120,255,0.24)] hover:bg-brand-blue-deep"
						onclick={() => decide("yes")}
						aria-label={copy.saveIdea}
					>
						<IconHeart class="size-7" stroke={1.8} />
					</Button>
				</div>
			</div>
		</article>
	</div>

	<div class="mt-2 flex items-center justify-between px-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
		<span>{copy.progress.replace("{{current}}", String(index + 1)).replace("{{total}}", String(ideas.length))}</span>
		<span class="inline-flex items-center gap-1.5"><IconCheck class="size-4" /> {copy.privateToCircle}</span>
		<button class="rounded-full p-2 transition-colors hover:bg-muted hover:text-foreground" onclick={reset} aria-label={copy.resetDemo}>
			<IconRefresh class="size-4" />
		</button>
	</div>
</div>
