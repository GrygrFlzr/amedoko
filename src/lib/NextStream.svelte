<script lang="ts">
	import Timer from '$lib/Timer.svelte';
	import { deltaFormatted, getVideoThumbnailURL, getVideoURL } from '../utils';
	import type { UpcomingStream } from './types/holodex';

	interface Props {
		nextVideo: UpcomingStream;
		nextStreamDelta: number;
	}
	const { nextVideo, nextStreamDelta }: Props = $props();

	const { id: videoId } = $derived(nextVideo);
	const isStartingSoon = $derived(nextStreamDelta < 60_000 ? true : false);

	const thumbnailURL = $derived(getVideoThumbnailURL(videoId));
	const videoURL = $derived(getVideoURL(videoId));
</script>

<div
	class="mx-auto my-3 w-11/12 max-w-sm rounded-xl bg-ame-dark-brown p-5 text-ame-light-yellow shadow-md"
>
	{#if isStartingSoon}
		<h2 class="text-2xl">Starting soon!</h2>
	{:else}
		<p>Next stream in</p>
		<Timer {videoURL} streamDeltaFormatted={deltaFormatted(nextStreamDelta)} />
	{/if}

	<a rel="external" href={videoURL}>
		<img
			src={thumbnailURL}
			alt={nextVideo.title}
			class="mx-auto mt-3 transform-gpu rounded-sm transition-transform focus:scale-105 active:scale-105"
		/>
	</a>
</div>
