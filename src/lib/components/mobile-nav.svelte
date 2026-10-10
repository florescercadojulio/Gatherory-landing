<script lang="ts">
	import {
		IconArrowRight,
		IconBook2,
		IconLayoutGrid,
		IconMenu2,
		IconRoute,
		IconUsers,
		IconX,
	} from "@tabler/icons-svelte";
	import { onDestroy, tick } from "svelte";
	import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "@/lib/site-links";

	const links = [
		{
			href: "/#product",
			label: "Product",
			description: "See how the whole gathering stays connected.",
			icon: IconLayoutGrid,
		},
		{
			href: "/#how-it-works",
			label: "How it works",
			description: "Move ideas into decisions and a shared plan.",
			icon: IconRoute,
		},
		{
			href: "/#people",
			label: "People",
			description: "Give hosts, collaborators, and guests the right context.",
			icon: IconUsers,
		},
		{
			href: "/resources",
			label: "Guides",
			description: "Practical help for planning an event with clarity.",
			icon: IconBook2,
		},
	];

	let open = false;
	let triggerButton: HTMLButtonElement;
	let closeButton: HTMLButtonElement;
	let dialog: HTMLDialogElement;
	let previousOverflow = "";

	async function openMenu() {
		previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		open = true;
		await tick();
		dialog.showModal();
		closeButton?.focus();
	}

	async function closeMenu(restoreFocus = true) {
		if (dialog.open) dialog.close();
		open = false;
		document.body.style.overflow = previousOverflow;
		if (restoreFocus) {
			await tick();
			triggerButton?.focus();
		}
	}

	function handleCancel(event: Event) {
		event.preventDefault();
		void closeMenu();
	}

	onDestroy(() => {
		if (open) document.body.style.overflow = previousOverflow;
	});
</script>

<button
	bind:this={triggerButton}
	type="button"
	class="inline-flex size-11 items-center justify-center rounded-full border border-black bg-white text-black transition-colors hover:bg-black hover:text-white lg:hidden"
	aria-label="Open navigation menu"
	aria-controls="mobile-navigation"
	aria-expanded={open}
	onclick={openMenu}
>
	<IconMenu2 class="size-5" stroke={1.8} />
</button>


<dialog
	bind:this={dialog}
	id="mobile-navigation"
	class="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-black backdrop:bg-black/20 backdrop:backdrop-blur-[2px] lg:hidden"
	aria-labelledby="mobile-navigation-title"
	oncancel={handleCancel}
>
	<button
		type="button"
		class="absolute inset-0 h-full w-full cursor-default"
		aria-label="Close navigation menu"
		onclick={() => closeMenu()}
	></button>

	<aside class="mobile-drawer absolute inset-y-0 right-0 flex h-dvh w-[min(82vw,23rem)] flex-col border-l border-black/15 bg-white shadow-[-12px_0_32px_rgba(0,0,0,0.08)]">
			<div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
				<div class="flex items-center justify-between px-4 py-3">
					<a href="/" class="inline-flex items-center gap-2.5" onclick={() => closeMenu(false)}>
						<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
						<span id="mobile-navigation-title" class="font-[540] tracking-[-0.02em]">Gatherory</span>
					</a>
					<button
						bind:this={closeButton}
						type="button"
						class="inline-flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-95"
						aria-label="Close navigation menu"
						onclick={() => closeMenu()}
					>
						<IconX class="size-5" stroke={1.8} />
					</button>
				</div>

				<p class="border-b border-black/15 px-4 pb-5 pt-1 text-sm leading-5 text-black/70">
					Plan the event, shape the moments around it, and bring the right people in.
				</p>

				<nav class="grid gap-2 p-3" aria-label="Mobile navigation">
					{#each links as link}
						<a
							href={link.href}
							class="grid grid-cols-[1.25rem_1fr] gap-3 rounded-xl border border-black/85 p-3.5 transition-colors hover:bg-brand-blue-light"
							onclick={() => closeMenu(false)}
						>
							<link.icon class="mt-0.5 size-4.5" stroke={1.7} />
							<span>
								<strong class="block font-[540] leading-5">{link.label}</strong>
								<span class="mt-1 block text-sm leading-5 text-black/68">{link.description}</span>
							</span>
						</a>
					{/each}
				</nav>

				<div class="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-black/15 px-4 py-4 text-sm">
					<a class="nav-link" href="/privacy" onclick={() => closeMenu(false)}>Privacy</a>
					<a class="nav-link" href="/terms" onclick={() => closeMenu(false)}>Terms</a>
				</div>
			</div>

			<div class="grid gap-2 border-t border-black/15 bg-white p-3">
				<a href={APP_SIGN_UP_URL} class="pill-button h-12 w-full px-5" onclick={() => closeMenu(false)}>
					Start planning <IconArrowRight class="size-4" />
				</a>
				<a href={APP_SIGN_IN_URL} class="inline-flex h-11 items-center justify-center rounded-full border border-black font-[480] transition-colors hover:bg-black hover:text-white" onclick={() => closeMenu(false)}>
					Sign in
				</a>
			</div>
	</aside>
</dialog>

<style>
	dialog[open]::backdrop {
		animation: mobile-nav-backdrop-in 160ms ease-out both;
	}

	dialog[open] .mobile-drawer {
		animation: mobile-nav-drawer-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes mobile-nav-backdrop-in {
		from {
			opacity: 0;
		}
	}

	@keyframes mobile-nav-drawer-in {
		from {
			transform: translateX(3.5rem);
			opacity: 0.72;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open]::backdrop,
		dialog[open] .mobile-drawer {
			animation-duration: 0.01ms;
		}
	}
</style>
