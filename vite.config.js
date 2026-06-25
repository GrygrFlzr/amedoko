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
		reportCompressedSize: false,
		modulePreload: {
			polyfill: false
		}
	}
});
