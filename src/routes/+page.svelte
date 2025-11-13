<script lang="ts">
	import DokoImage from '$lib/DokoImage.svelte';
	import { calculateDateDeltaMillis } from '../utils';
	import { getStreams } from './data.remote';

	import { Icon, Play } from 'svelte-hero-icons';
	import { SvelteDate } from 'svelte/reactivity';
	import NextStream from '$lib/NextStream.svelte';
	import LiveStream from '$lib/LiveStream.svelte';
	import LastStream from '$lib/LastStream.svelte';

	const currentDate = new SvelteDate();
	const streamData = $derived(await getStreams());
	const { liveVideo, nextVideo, pastVideo } = $derived(streamData.items);

	const headline = $derived(liveVideo ? 'Ame Koko!' : 'Ame Doko?');
	const chikuTakuURL = 'https://watsonamelia.itch.io/chikutaku';

	$effect(() => {
		const interval = setInterval(() => {
			currentDate.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Amedoko - Home</title>
</svelte:head>

<div class="flex flex-col py-6 text-center text-ame-dark-brown">
	<h1 class="my-3 text-center text-5xl font-bold">{headline}</h1>

	{#if liveVideo}
		<LiveStream {liveVideo} />
	{:else if nextVideo}
		{@const nextStreamDelta = calculateDateDeltaMillis(
			currentDate,
			new Date(nextVideo.available_at)
		)}
		<NextStream {nextVideo} {nextStreamDelta} />
	{:else if pastVideo}
		{@const lastStreamDelta = calculateDateDeltaMillis(
			currentDate,
			new Date(pastVideo.available_at)
		)}
		<LastStream {pastVideo} {lastStreamDelta} />
	{:else}
		<pre><code>{streamData.message}</code></pre>
	{/if}

	<DokoImage />

	<span class="mx-auto mt-4 text-center">
		<a
			rel="external"
			href={chikuTakuURL}
			type="button"
			class="my-3 flex transform-gpu flex-row rounded-full bg-ame-dark-brown px-5 py-2.5 text-sm font-medium text-ame-light-yellow shadow-md transition-transform hover:scale-105 hover:bg-amber-900 focus:ring-4 focus:ring-stone-300 focus:outline-none"
		>
			<Icon src={Play} solid size="20" class="mr-1" />Play Chiku Taku!
		</a>
	</span>
</div>
