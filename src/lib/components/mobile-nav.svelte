<script lang="ts">
	import {
		IconArrowRight,
		IconBook2,
		IconLayoutGrid,
		IconMenu2,
		IconUsers,
	} from "@tabler/icons-svelte";
	import { onMount } from "svelte";
	import * as Sheet from "@/lib/components/ui/sheet";
	import { APP_SIGN_IN_URL } from "@/lib/site-links";
	import type { SiteCopy } from "@/i18n";

	let { copy } = $props<{ copy: SiteCopy }>();

	const links = $derived([
		{
			href: `${copy.nav.homeHref}#product`,
			label: copy.nav.product,
			description: copy.mobileNav.productDescription,
			icon: IconLayoutGrid,
		},
		{
			href: `${copy.nav.homeHref}#people`,
			label: copy.nav.people,
			description: copy.mobileNav.peopleDescription,
			icon: IconUsers,
		},
		{
			href: copy.nav.guidesHref,
			label: copy.nav.guides,
			description: copy.mobileNav.guidesDescription,
			icon: IconBook2,
		},
	]);

	let mobileMenuOpen = $state(false);
	let mobileSheetKey = $state(0);

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function resetMobileMenu() {
		mobileMenuOpen = false;
		mobileSheetKey += 1;
		document.body.style.removeProperty("overflow");
		document.body.style.removeProperty("pointer-events");
	}

	onMount(() => {
		const desktopBreakpoint = window.matchMedia("(min-width: 64rem)");
		const closeAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
			if (event.matches) resetMobileMenu();
		};

		document.addEventListener("astro:before-preparation", resetMobileMenu);
		document.addEventListener("astro:page-load", resetMobileMenu);
		desktopBreakpoint.addEventListener("change", closeAtDesktopBreakpoint);

		return () => {
			document.removeEventListener("astro:before-preparation", resetMobileMenu);
			document.removeEventListener("astro:page-load", resetMobileMenu);
			desktopBreakpoint.removeEventListener("change", closeAtDesktopBreakpoint);
		};
	});
</script>

{#key mobileSheetKey}
	<Sheet.Root bind:open={mobileMenuOpen}>
		<Sheet.Trigger
			class="inline-flex size-11 items-center justify-center rounded-full border border-black bg-white text-black transition-colors hover:bg-black hover:text-white lg:hidden"
			aria-label={copy.nav.navigationMenu}
		>
			<IconMenu2 class="size-5" stroke={1.8} aria-hidden="true" />
		</Sheet.Trigger>

		<Sheet.Content
			side="right"
			showCloseButton={true}
			closeLabel={copy.nav.closeNavigation}
			class="w-[min(82vw,23rem)] border-l border-black/15 bg-white p-0 text-black shadow-[-12px_0_32px_rgba(0,0,0,0.08)] lg:hidden"
		>
		<Sheet.Title class="sr-only">{copy.nav.navigationTitle}</Sheet.Title>
		<Sheet.Description class="sr-only">{copy.nav.navigationDescription}</Sheet.Description>

			<div class="flex h-dvh min-h-0 flex-col bg-white text-black">
				<div class="shrink-0 border-b border-black/15 px-4 pb-5 pt-3">
					<a href={copy.nav.homeHref} class="inline-flex items-center gap-2.5 pr-12" onclick={closeMobileMenu}>
						<img src="/gatherory-icon.png" alt="" class="size-8 rounded-lg" width="32" height="32" />
						<span class="font-[540] tracking-[-0.02em]">Gatherory</span>
					</a>
				</div>

				<nav
					class="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-3"
					aria-label={copy.nav.mobileNavigation}
				>
					{#each links as link}
						<a
							href={link.href}
							class="grid grid-cols-[1.25rem_1fr] gap-3 rounded-xl p-3.5 transition-colors hover:bg-brand-blue-light"
							onclick={closeMobileMenu}
						>
							<link.icon class="mt-0.5 size-4.5" stroke={1.7} aria-hidden="true" />
							<span>
								<strong class="block font-[540] leading-5">{link.label}</strong>
								<span class="mt-1 block text-sm leading-5 text-black/68">{link.description}</span>
							</span>
						</a>
					{/each}

					<div class="mt-auto flex flex-wrap gap-x-5 gap-y-2 px-1 pb-1 pt-3 text-sm">
						<a class="nav-link" href={copy.nav.languageHref} onclick={closeMobileMenu}>{copy.nav.languageLabel}</a>
						<a class="nav-link" href="/privacy" onclick={closeMobileMenu}>{copy.nav.privacy}</a>
						<a class="nav-link" href="/terms" onclick={closeMobileMenu}>{copy.nav.terms}</a>
					</div>
				</nav>

				<div class="grid shrink-0 gap-2 border-t border-black/15 bg-white p-3">
					<a href={copy.nav.iphoneHref} class="pill-button h-12 w-full px-5" onclick={closeMobileMenu}>
						{copy.nav.startPlanning} <IconArrowRight class="size-4" />
					</a>
					<a
						href={APP_SIGN_IN_URL}
						class="nav-link inline-flex h-11 items-center justify-center text-sm font-[480]"
						onclick={closeMobileMenu}
					>
						{copy.nav.signIn}
					</a>
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
{/key}
