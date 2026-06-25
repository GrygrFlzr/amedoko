<script lang="ts">
	import '../app.css';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import Icon from '$lib/Icon.svelte';
	import type { LayoutProps } from './$types';

	const { children, data }: LayoutProps = $props();
	const canonicalHref = $derived(`https://amedoko.com${page.url.pathname}`);
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<link rel="canonical" href={canonicalHref} />
	<meta name="description" content="Find out where is Ame!" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://amedoko.com" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Find out where is Ame!" />
	<meta property="og:image" content={data.image} />
	<meta property="og:image:secure_url" content={data.image} />
	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="amedoko.com" />
	<meta property="twitter:url" content="https://amedoko.com" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content="Find out where is Ame!" />
	<meta name="twitter:image" content={data.twitter.image} />
</svelte:head>

<div
	class="bg-cogs min-h-screen bg-ame-light-yellow bg-fixed"
	style="background-image: url('{asset('/cogs.svg')}')"
>
	{@render children()}

	<footer class="mt-auto flex flex-col text-ame-dark-brown">
		<div class="flex">
			<a
				rel="external"
				class="mx-auto text-center text-2xl underline"
				href="https://www.youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg">Amelia Watson's Channel</a
			>
		</div>

		<div class="my-6 flex flex-col space-y-2" role="list">
			<a class="inline-flex items-center justify-center hover:underline" href={resolve('/about')}>
				<Icon name="question-mark-circle" size={16} />
				<p class="ml-1">About</p>
			</a>

			<a
				rel="external"
				class="inline-flex items-center justify-center hover:underline"
				href="https://watsonindustries.live"
			>
				<Icon name="globe-alt" size={16} />
				<p class="ml-1">Watson Industries</p>
			</a>

			<a class="inline-flex items-center justify-center hover:underline" href={resolve('/privacy')}>
				<Icon name="eye" size={16} />
				<p class="ml-1">Privacy Policy</p>
			</a>

			<a
				rel="external"
				class="inline-flex items-center justify-center hover:underline"
				href="https://github.com/watsonindustries/amedoko"
				><Icon name="github" size={16} class="mr-1" /> Source Code</a
			>
		</div>
		<div
			class="flex flex-col items-center bg-ame-dark-brown py-5 text-sm text-ame-light-yellow opacity-80"
		>
			<p class="mx-1">Copyright © Watson Industries Inc.</p>
			<p class="mx-1">Not affiliated with Cover Corp in any way.</p>
		</div>
	</footer>
</div>
