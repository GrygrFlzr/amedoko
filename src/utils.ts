import type { SvelteDate } from 'svelte/reactivity';

type Datelike = Date | SvelteDate;
const MS_IN_ONE_DAY = 86400000;
const MS_IN_ONE_HOUR = 3600000;
const MS_IN_ONE_MINUTE = 60000;

/** Subtracts `dateA` from `dateB` */
export function diffInDaysFloored(dateA: Datelike, dateB: Datelike): number {
	const diff = dateA.getTime() - dateB.getTime();
	return Math.floor(diff / MS_IN_ONE_DAY);
}

/** Returns the delta in milliseconds of 2 date objects, will always be positive */
export function calculateDateDeltaMillis(dateA: Datelike, dateB: Datelike): number {
	return Math.abs(dateA.getTime() - dateB.getTime());
}

/** Returns a formatted time string of a time period in milliseconds */
export function deltaFormatted(delta: number): string {
	const days = (delta / MS_IN_ONE_DAY) | 0;
	const dayname = days > 1 ? 'days' : days === 1 ? 'day' : '';
	const hours = ((delta % MS_IN_ONE_DAY) / MS_IN_ONE_HOUR) | 0;
	const minutes = ((delta % MS_IN_ONE_HOUR) / MS_IN_ONE_MINUTE) | 0;
	const seconds = Math.round((delta % MS_IN_ONE_MINUTE) / 1000);

	return `${days > 0 ? days : ''} ${dayname} ${hours} hours ${minutes} minutes ${seconds} s`;
}

export function getVideoThumbnailURL(videoID: string) {
	return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
}

export function getVideoURL(videoID: string) {
	return `https://youtu.be/${videoID}`;
}
