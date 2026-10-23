<script lang="ts">
	import type { SiteCopy } from "@/i18n";
	import { joinWaitlist, waitlistCampaign, WaitlistRequestError } from "@/lib/waitlist-client";
	let { copy, source }: { copy: SiteCopy["beta"]["waitlist"]; source: "landing_home" | "landing_iphone" } = $props();
	let email = $state("");
	let consent = $state(false);
	let website = $state("");
	let busy = $state(false);
	let success = $state(false);
	let error = $state("");
	const endpoint = import.meta.env.PUBLIC_WAITLIST_API_URL || (import.meta.env.DEV ? "http://localhost:3003/api/waitlist" : "https://app.gatherory.com/api/waitlist");
	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (busy) return;
		busy = true;
		error = "";
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 15000);
		try {
			await joinWaitlist(endpoint, { email, consent, website, source, locale: copy.locale === "es" ? "es" : "en", campaign: waitlistCampaign(window.location.href) }, { signal: controller.signal });
			success = true;
			email = "";
			consent = false;
		} catch (cause) {
			error = cause instanceof WaitlistRequestError ? copy.errors[cause.kind] : copy.errors.unavailable;
		} finally {
			clearTimeout(timeout);
			busy = false;
		}
	}
</script>

<section id="waitlist" class="waitlist-panel" aria-labelledby="waitlist-title">
	<div>
		<h2 id="waitlist-title" class="text-3xl font-[540] tracking-[-0.03em] sm:text-4xl">{copy.title}</h2>
		<p class="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{copy.description}</p>
	</div>
	{#if success}
		<p class="rounded-xl bg-surface-soft p-6 leading-7" role="status">{copy.success}</p>
	{:else}
		<form method="post" action={endpoint} onsubmit={submit} aria-busy={busy} class="min-w-0 space-y-4">
			<div>
				<label for="waitlist-email" class="mb-2 block text-sm font-[540]">{copy.emailLabel}</label>
				<input id="waitlist-email" name="email" type="email" autocomplete="email" required maxlength="254" bind:value={email} disabled={busy} class="min-h-12 w-full min-w-0 rounded-xl border border-black/25 bg-white px-4 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-60" />
			</div>
			<div class="honeypot" aria-hidden="true" inert>
				<label for="waitlist-website">Website</label>
				<input id="waitlist-website" name="website" type="text" tabindex="-1" autocomplete="off" bind:value={website} />
			</div>
			<label class="flex items-start gap-3 text-sm leading-6">
				<input name="consent" type="checkbox" required bind:checked={consent} disabled={busy} class="mt-1 size-4 shrink-0 accent-brand-blue" />
				<span>{copy.consent} <a href="/privacy" class="underline underline-offset-4">{copy.privacy}</a></span>
			</label>
			<button type="submit" disabled={busy} class="pill-button min-h-12 w-full px-6 py-3 text-base disabled:opacity-60 sm:w-auto">{busy ? copy.submitting : copy.cta}</button>
			{#if error}<p role="alert" class="text-sm leading-6 text-red-700">{error}</p>{/if}
			<p class="text-xs leading-5 text-muted-foreground">{copy.withdraw}</p>
		</form>
	{/if}
</section>

<style>
	.waitlist-panel { display: grid; gap: 2rem; margin-top: 2rem; padding: clamp(1.5rem, 4vw, 3rem); border: 1px solid #0000001a; border-radius: 2rem; scroll-margin-top: 6rem; }
	.honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); pointer-events: none; }
	@media (min-width: 768px) { .waitlist-panel { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 3rem; } }
</style>
