import { execSync } from 'node:child_process';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true,
			explicitEnvironmentVariables: true
		},
		version: {
			name: execSync('git rev-parse HEAD').toString().trim(),
			pollInterval: 0
		}
	},
	compilerOptions: {
		runes: true,
		modernAst: true,
		experimental: {
			async: true
		}
	}
};

export default config;
