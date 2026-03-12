<script lang="ts">
	// Replace these if needed
	import gatorBox from '$lib/assets/ame-doko-gator-box.jpeg';
	import amewhereGator from '$lib/assets/ame-where-gator.jpeg';
	import missingAme from '$lib/assets/missing-ame.jpeg';
	import nagiGator from '$lib/assets/nagi-amedoko.jpeg';

	const imgCollection = [
		{ url: nagiGator, alt: 'Ame Doko gator by Nabi' },
		{ url: gatorBox, alt: 'Gator in a box' },
		{ url: amewhereGator, alt: 'Ame where gator comic' },
		{ url: missingAme, alt: 'Missing Ame poster by CaptPolybius' }
	];

	let imgIndex = $state(getRandomInt(imgCollection.length));
	const activeImg = $derived(imgCollection[imgIndex]);

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	function handleClick() {
		imgIndex = (imgIndex + 1) % imgCollection.length;
	}
</script>

<div
	role="button"
	tabindex="0"
	class="mx-auto my-3 max-w-lg drop-shadow-lg hover:cursor-pointer"
	onclick={handleClick}
	onkeydown={handleClick}
>
	<img
		src={activeImg.url}
		alt={activeImg.alt}
		class="mx-auto w-3/4 rounded-xl object-contain"
		width="1000"
		height="1000"
	/>
</div>
