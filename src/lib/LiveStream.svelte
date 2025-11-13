<script lang="ts">
	import type { LiveStream } from '$lib/types/holodex';
	import { Icon, Play } from 'svelte-hero-icons';

	interface Props {
		liveVideo: LiveStream;
	}
	const { liveVideo }: Props = $props();
</script>

<div class="mx-auto my-3">
	<h2 class="text-3xl">Live NOW 🎥</h2>
	<span class="text-center">
		<a
			href="https://youtu.be/{liveVideo.id}"
			type="button"
			class="my-3 flex transform-gpu animate-pulse flex-row rounded-xl bg-ame-red px-5 py-2.5 text-sm font-medium text-ame-light-yellow transition-transform hover:scale-105 hover:bg-red-800 focus:ring-4 focus:ring-stone-300 focus:outline-none"
		>
			<Icon src={Play} solid size="20" class="mr-1" />Watch on YouTube
		</a>
	</span>
</div>
