<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import * as InputGroup from "@/lib/components/ui/input-group/index.js";
	import { IconSearch } from '@tabler/icons-svelte';
	import { cn } from "@/lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div data-slot="command-input-wrapper" class="p-1">
	<InputGroup.Root class="bg-transparent border-transparent border-b-input px-3">
		<CommandPrimitive.Input
			{value}
			data-slot="command-input"
			class={cn(
				"w-full text-sm px-2 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...restProps}
		>
			{#snippet child({ props })}
				<InputGroup.Input {...props} bind:value bind:ref />
			{/snippet}
		</CommandPrimitive.Input>
		<InputGroup.Addon>
			<IconSearch class="size-3.5 shrink-0 opacity-50" />
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
