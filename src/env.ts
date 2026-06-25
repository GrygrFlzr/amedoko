import { defineEnvVars } from '@sveltejs/kit/hooks';

export const variables = defineEnvVars({
	HOLODEX_API_KEY: {
		description: 'Holodex API key obtained from Account Settings'
	}
});
