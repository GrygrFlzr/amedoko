import { execSync } from 'node:child_process';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			experimental: {
				remoteFunctions: true,
				explicitEnvironmentVariables: true
			},
			version: {
				name: execSync('git rev-parse HEAD').toString().trim(),
				pollInterval: 0
			},
			compilerOptions: {
				runes: true,
				modernAst: true,
				experimental: {
					async: true
				}
			}
		})
	],
	oxc: {
		assumptions: {
			noDocumentAll: true
		}
	},
	worker: {
		format: 'es'
	},
	build: {
		reportCompressedSize: false,
		modulePreload: {
			polyfill: false
		}
	}
});
