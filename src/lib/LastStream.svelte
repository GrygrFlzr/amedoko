<script lang="ts">
	import type { PastStream } from '$lib/types/holodex';
	import { getVideoURL, deltaFormatted } from '../utils';
	import Timer from './Timer.svelte';

	interface Props {
		pastVideo: PastStream;
		lastStreamDelta: number;
	}
	const { pastVideo, lastStreamDelta }: Props = $props();

	const videoURL = $derived(getVideoURL(pastVideo.id));
</script>

<div
	class="mx-auto my-3 w-11/12 max-w-sm rounded-xl bg-ame-dark-brown p-5 text-ame-light-yellow shadow-md"
>
	Last seen
	<br />
	<Timer {videoURL} streamDeltaFormatted={deltaFormatted(lastStreamDelta)} /> ago
</div>
