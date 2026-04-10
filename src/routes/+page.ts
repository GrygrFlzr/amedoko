import type { Config } from '@sveltejs/adapter-vercel';

export const config = {
	isr: {
		allowQuery: [],
		expiration: 60
	}
} satisfies Config;
