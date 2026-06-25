import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	oxc: {
		assumptions: {
			noDocumentAll: true
		}
	},
	worker: {
		format: 'es'
	},
	build: {
		assetsInlineLimit: 0,
		reportCompressedSize: false,
		modulePreload: {
			polyfill: false
		}
	}
});
