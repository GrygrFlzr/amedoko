import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { loadConfig } from '@sveltejs/load-config';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const svelteConfig = await loadConfig('./', { traverse: false });
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

if (!svelteConfig || !('config' in svelteConfig)) {
	throw new Error('Failed to parse the Svelte config.');
}

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{
		extends: [js.configs.recommended, ts.configs.recommended],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			'no-undef': 'off',
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		extends: [svelte.configs.recommended, svelte.configs.prettier],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	prettier
);
