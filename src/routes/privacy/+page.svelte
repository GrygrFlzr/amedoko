<script lang="ts">
	import { asset } from '$app/paths';
</script>

<svelte:head>
	<title>AmeDoko - Privacy</title>
</svelte:head>

<div class="mx-8 flex flex-col py-5 text-ame-dark-brown md:mx-36 lg:mx-72 xl:mx-96">
	<h1 class="my-2 mt-2 text-center text-5xl">Privacy Policy</h1>
	<p class="my-2 text-center text-xl">
		We don't want or need your cookies.
		<img
			src={asset('/irasutoya_sweets_cookie.png')}
			class="mx-auto my-4"
			alt="Cookies from Irasutoya"
		/>
		AmeDoko only uses Plausible Analytics for statistics purposes and does not use any cookies or personal
		information.
	</p>
	<p>
		You can read more about how Plausible collect analytics
		<a rel="external" href="https://plausible.io/data-policy" class="underline"
			>on their official website.</a
		>
	</p>
</div>
