import { query } from '$app/server';
import { env } from '$env/dynamic/private';
import type { LiveStream, PastStream, SearchReponse, UpcomingStream } from '$lib/types/holodex';

const BASE_API_URI = 'https://holodex.net/api/v2';
const AME_CH_ID = 'UCyl1z3jo3XHR1riLFKG5UAg';
const EXCLUDE_EXTERNAL_CHANNEL_IDS = [
	'UCotXwY6s8pWmuWd_snKYjhg' // hololive English channel
];
const EXCLUDE_TOPIC_IDS = ['membersonly', 'shorts', 'FreeChat'];
const TTL_SECONDS = 60;

type CachedStreams = {
	timestamp: number | null;
	pastVideo: PastStream | null;
	liveVideo: LiveStream | null;
	nextVideo: UpcomingStream | null;
};

const initialCacheObj = {
	timestamp: null,
	pastVideo: null,
	liveVideo: null,
	nextVideo: null
};
let cache: CachedStreams = initialCacheObj;

export const getStreams = query(async () => {
	if (cache.timestamp === null || Date.now() - cache.timestamp > TTL_SECONDS * 1_000) {
		const reqHeaders = new Headers();
		reqHeaders.append('User-Agent', 'amedoko.com');
		reqHeaders.append('Content-Type', 'application/json; charset=utf-8');
		reqHeaders.append('X-APIKEY', env?.HOLODEX_API_KEY ?? '');
		const apiResponse = await fetch(`${BASE_API_URI}/search/videoSearch`, {
			method: 'POST',
			headers: reqHeaders,
			body: JSON.stringify({
				sort: 'newest',
				target: ['stream'],
				paginated: true,
				limit: 30,
				offset: 0,
				vch: [AME_CH_ID]
			})
		});

		// Validate response
		const responseText = await apiResponse.text();
		if (responseText === 'Incorrect X-APIKEY') {
			console.error('Incorrect X-APIKEY');

			return {
				items: initialCacheObj,
				age: 0,
				message: 'Your deployment of Amedoko did not specify `HOLODEX_API_KEY`'
			};
		}
		const responseData: SearchReponse = JSON.parse(responseText);
		if ('message' in responseData) {
			// API returned an error, do not cache
			console.error(responseData.message);

			return {
				items: initialCacheObj,
				age: 0,
				message: 'Unexpected response from upstream server'
			};
		}

		// Should be valid, extract and cache
		const { items: streamEntries } = responseData;
		const filteredStreamEntries = streamEntries.filter((stream) => {
			// Exclude unarchived streams
			if (stream.status === 'missing') return false;
			// Exclude compilations on other channels
			if (EXCLUDE_EXTERNAL_CHANNEL_IDS.includes(stream.channel.id)) return false;
			// Exclude free chat, compilation types like shorts, or paywalled content like membersonly
			if (stream.topic_id && EXCLUDE_TOPIC_IDS.includes(stream.topic_id)) return false;
			return true;
		});
		const pastVideo = filteredStreamEntries.find((stream) => stream.status === 'past') || null;
		const liveVideo = filteredStreamEntries.find((stream) => stream.status === 'live') || null;
		const nextVideo = filteredStreamEntries.find((stream) => stream.status === 'upcoming') || null;
		cache = { timestamp: Date.now(), pastVideo, liveVideo, nextVideo };
		return {
			items: cache,
			age: 0,
			message: 'ok'
		};
	} else {
		// Use cached data
		const age = Math.floor((Date.now() - cache.timestamp) / 1_000);
		return {
			items: cache,
			age,
			message: 'ok'
		};
	}
});
