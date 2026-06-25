import { getCache } from '@vercel/functions';
import { HOLODEX_API_KEY } from '$app/env/private';
import { query } from '$app/server';
import type { LiveStream, PastStream, SearchResponse, UpcomingStream } from '$lib/types/holodex';

const BASE_API_URI = 'https://holodex.net/api/v2';
const AME_CH_ID = 'UCyl1z3jo3XHR1riLFKG5UAg';
const EXCLUDE_EXTERNAL_CHANNEL_IDS = [
	'UCotXwY6s8pWmuWd_snKYjhg' // hololive English channel
];
const EXCLUDE_TOPIC_IDS = ['membersonly', 'shorts', 'FreeChat'];

const TTL_SECONDS = 60;
const CACHE_KEY = 'holodex:ame-streams';
const CACHE_TAG = 'ame-streams';

type Streams = {
	pastVideo: PastStream | null;
	liveVideo: LiveStream | null;
	nextVideo: UpcomingStream | null;
};
type CacheEntry = Streams & { fetchedAt: number };

const emptyStreams: Streams = { pastVideo: null, liveVideo: null, nextVideo: null };

async function readCache(): Promise<CacheEntry | undefined> {
	try {
		return (await getCache().get(CACHE_KEY)) as CacheEntry | undefined;
	} catch {
		return undefined;
	}
}

async function writeCache(entry: CacheEntry): Promise<void> {
	try {
		await getCache().set(CACHE_KEY, entry, {
			ttl: TTL_SECONDS,
			tags: [CACHE_TAG],
			name: 'holodex ame streams'
		});
	} catch {
		// cache unavailable
		// pass through without persisting
	}
}

export const getStreams = query(async () => {
	// 1. check regional runtime cache
	const cached = await readCache();
	if (cached) {
		const { fetchedAt, ...items } = cached;
		return { items, age: Math.floor((Date.now() - fetchedAt) / 1_000), message: 'ok' };
	}

	// 2. cache miss
	try {
		const apiResponse = await fetch(`${BASE_API_URI}/search/videoSearch`, {
			method: 'POST',
			headers: {
				'User-Agent': 'amedoko.com',
				'Content-Type': 'application/json; charset=utf-8',
				'X-APIKEY': HOLODEX_API_KEY
			},
			body: JSON.stringify({
				sort: 'newest',
				target: ['stream'],
				paginated: true,
				limit: 30,
				offset: 0,
				vch: [AME_CH_ID]
			})
		});

		// Validate before caching
		const responseText = await apiResponse.text();
		if (responseText === 'Incorrect X-APIKEY') {
			console.error('Incorrect X-APIKEY');

			return {
				items: emptyStreams,
				age: 0,
				message: 'Your deployment of Amedoko did not specify `HOLODEX_API_KEY`'
			};
		}
		const responseData: SearchResponse = JSON.parse(responseText);
		if ('message' in responseData) {
			// API returned an error, do not cache
			console.error(responseData.message);
			return { items: emptyStreams, age: 0, message: 'Unexpected response from upstream server' };
		}
		const filtered = responseData.items.filter((stream) => {
			if (stream.status === 'missing') return false;
			// Exclude compilations on other channels
			if (EXCLUDE_EXTERNAL_CHANNEL_IDS.includes(stream.channel.id)) return false;
			// Exclude free chat, compilation types like shorts, or paywalled content like membersonly
			if (stream.topic_id && EXCLUDE_TOPIC_IDS.includes(stream.topic_id)) return false;
			return true;
		});
		const items: Streams = {
			pastVideo: filtered.find((s) => s.status === 'past') ?? null,
			liveVideo: filtered.find((s) => s.status === 'live') ?? null,
			nextVideo: filtered.find((s) => s.status === 'upcoming') ?? null
		};

		// 3. persist success in cache
		await writeCache({ ...items, fetchedAt: Date.now() });

		return { items, age: 0, message: 'ok' };
	} catch (e) {
		if (e instanceof TypeError) {
			return {
				items: emptyStreams,
				age: 0,
				message: 'Either the upstream URL is invalid or a network error occured'
			};
		}

		throw e;
	}
});

export const getDokoSeed = query(async () => Math.random());
