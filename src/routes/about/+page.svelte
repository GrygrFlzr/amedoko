<script lang="ts">
	import { resolve } from '$app/paths';
	import { Home, Icon } from 'svelte-hero-icons';
</script>

<svelte:head>
	<title>AmeDoko - About</title>
</svelte:head>

<div class="mx-auto flex max-w-2xl flex-col px-8 py-4 text-ame-dark-brown">
	<h1 class="my-4 text-center text-5xl font-bold">About</h1>
	<p class="my-2 text-xl">
		AmeDoko is a web application developed by <a
			href="https://watsonindustries.live"
			class="underline">Watson Industries</a
		>
		that enables TeaMates to track the whereabouts of Ame. With AmeDoko, Gators can find out when Ame
		was last seen and when she is expected to appear again. This can be especially useful for Gators who
		want to make sure they don't miss out on any Ame streams. Whether you're a TeaMate, Investigator,
		or simply a casual viewer of Ame, AmeDoko is the perfect tool for staying up-to-date on her schedule.
		So why wait? Start using AmeDoko today and never miss a chance to see Ame again!
		<img
			src="https://4.bp.blogspot.com/-yl66-FqOzW0/V5Xc0hLD6VI/AAAAAAAA8uk/RepaNKVeLNAGS-y5rDaqBTI9096-S3oKACLcB/s400/pose_arasagashi.png"
			alt="A TeaMate looking for Ame."
		/>
		AmeDoko fetches live stream information from the fantastic
		<a href="https://holodex.stoplight.io/docs/holodex" class="underline">Holodex API</a>.
		<br /><br />
		Big thanks to the following related projects for idea inspiration:
	</p>

	<ul class="my-3 text-xl">
		<li>
			<a href="https://imissfauna.com" class="underline">I Miss Fauna</a>
		</li>
		<li>
			<a href="https://imissina-com.vercel.app" class="underline">I Miss Ina</a>
		</li>
	</ul>
	<br />

	<p class="my-2 text-xl">
		AmeDoko patent and license owned by: <a href="https://twitter.com/DaniruKun" class="underline"
			>@DaniruKun</a
		>
		<br />
		Crying Gator art kindly provided by:
		<a href="https://twitter.com/Nagi_Nyaaa" class="underline">@Nagi</a>
	</p>

	<div class="mx-auto text-center">
		<a
			href={resolve('/')}
			type="button"
			class="my-3 mr-2 flex flex-row rounded-lg bg-ame-dark-brown px-5 py-2.5 text-sm font-medium text-ame-light-yellow hover:bg-stone-600 focus:ring-4 focus:ring-stone-300 focus:outline-none"
		>
			<Icon src={Home} solid size="20" class="mr-1" />Go Back
		</a>
	</div>
</div>
