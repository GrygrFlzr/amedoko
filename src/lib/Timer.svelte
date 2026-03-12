<script lang="ts">
	interface Props {
		videoURL: string;
		streamDeltaFormatted: string;
	}
	const { videoURL, streamDeltaFormatted }: Props = $props();
</script>

<a rel="external" href={videoURL} class="font-bold">{streamDeltaFormatted}</a>
