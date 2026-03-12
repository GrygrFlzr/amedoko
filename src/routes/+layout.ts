import previewImg from '$lib/assets/amedoko-landscape-twitter.png';
import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	const description = 'Find out where is Ame!';
	const title = 'Ame Doko?';
	const twitterImageURL = new URL(previewImg, url.origin).toString();

	return {
		twitter: {
			card: 'summary_large_image',
			site: '@amedoko',
			title: title,
			description: description,
			image: twitterImageURL
		},
		description: description,
		image: twitterImageURL,
		url: url,
		type: 'website',
		title: title,
		themeColor: '#F2D7B6'
	};
}) satisfies LayoutLoad;
