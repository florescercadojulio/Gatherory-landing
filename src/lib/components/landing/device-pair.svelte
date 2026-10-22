<script lang="ts">
	import DeviceNotch from "./device-notch.svelte";
	let {
		phoneSrc,
		phoneAlt,
		duoSrc,
		duoAlt,
		phoneLabel,
		duoLabel,
	} = $props<{
		phoneSrc: string;
		phoneAlt: string;
		duoSrc: string;
		duoAlt: string;
		phoneLabel: string;
		duoLabel: string;
	}>();
</script>

<div class="device-pair">
	<figure class="device-item phone-item">
		<div class="phone-frame">
			<div class="phone-screen">
				<img src={phoneSrc} alt={phoneAlt} width="1206" height="2622" />
				<DeviceNotch />
			</div>
		</div>
		<figcaption>{phoneLabel}</figcaption>
	</figure>
	<figure class="device-item duo-item">
		<div class="duo-frame">
			<img src={duoSrc} alt={duoAlt} width="2853" height="2007" />
		</div>
		<figcaption>{duoLabel}</figcaption>
	</figure>
</div>

<style>
	.device-pair { display: grid; grid-template-columns: minmax(0, .43fr) minmax(0, 1fr); align-items: center; gap: clamp(.5rem, 2vw, 1.25rem); width: min(100%, 34rem); margin-inline: auto; }
	.device-item { display: grid; min-width: 0; justify-items: center; gap: .75rem; margin: 0; }
	.device-item figcaption { color: #4f5663; font-size: .75rem; font-weight: 520; line-height: 1.25; text-align: center; }
	.phone-frame { position: relative; width: min(100%, 9rem); padding: 5px; overflow: hidden; border: 1px solid #303238; border-radius: 1.5rem; background: #1c1d21; box-shadow: 0 18px 36px -18px #17284760; transform: rotate(2deg); }
	.phone-frame img { display: block; width: 100%; height: auto; border-radius: 1.2rem; background: #f8f8f8; }
	.phone-screen { position: relative; }
	.duo-frame { position: relative; width: 100%; padding: 6px; overflow: hidden; border: 1px solid #303238; border-radius: 1.15rem; background: #1c1d21; box-shadow: 0 18px 36px -18px #17284760; transform: rotate(-1deg); }
	.duo-frame img { display: block; width: 100%; height: auto; border-radius: .7rem; background: #f8f8f8; }
	@media (max-width: 380px) {
		.device-pair { grid-template-columns: minmax(0, .4fr) minmax(0, 1fr); gap: .45rem; }
		.device-item figcaption { font-size: .68rem; }
		.phone-frame { padding: 4px; border-radius: 1.15rem; }
		.phone-frame img { border-radius: .9rem; }
		.duo-frame { padding: 4px; border-radius: .85rem; }
		.duo-frame img { border-radius: .5rem; }
	}
</style>
