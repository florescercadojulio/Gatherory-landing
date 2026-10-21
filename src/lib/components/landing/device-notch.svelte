<script lang="ts">
	let { duo = false } = $props<{ duo?: boolean }>();
</script>

<span class="device-notch" class:duo aria-hidden="true"></span>

<style>
	.device-notch { position: absolute; z-index: 1; top: 1.8%; left: 50%; width: 27%; max-width: 7rem; aspect-ratio: 4.8; transform: translateX(-50%); border-radius: 999px; background: #050506; box-shadow: inset 0 0 0 1px #202126; pointer-events: none; }
	.device-notch::after { content: ""; position: absolute; top: 25%; right: 7%; height: 50%; aspect-ratio: 1; border-radius: 50%; background: #101725; box-shadow: inset 0 0 0 1px #242a35; }
	.duo { width: 16%; }
</style>
