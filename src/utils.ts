import type { SvelteDate } from 'svelte/reactivity';

type Datelike = Date | SvelteDate;
const UNITS_AND_FACTOR = [
	['year', 31_556_952_000], // 365.2425 days in a year
	['month', 2_629_746_000], // 12 months in a year
	['week', 604_800_000],
	['day', 86_400_000],
	['hour', 3_600_000],
	['minute', 60_000],
	['second', 1_000]
] as const;

type Unit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';
type UnitValueTuple = [Unit, number];

/** Returns the delta in milliseconds of 2 date objects, will always be positive */
export function calculateDateDeltaMillis(dateA: Datelike, dateB: Datelike): number {
	return Math.abs(dateA.getTime() - dateB.getTime());
}

/** Returns a formatted time string of a time period in milliseconds */
export function deltaFormatted(delta: number): string {
	const unitValues = UNITS_AND_FACTOR.map(([unit, factor], index) => {
		const modFactor = index === 0 ? Infinity : UNITS_AND_FACTOR[index - 1][1];
		return [unit, Math.trunc((delta % modFactor) / factor)] satisfies UnitValueTuple;
	})
		.filter(([, value]) => value >= 1)
		.map(([unit, value]) => {
			const displayUnit = value === 1 ? unit : unit + 's';
			return value + ' ' + displayUnit;
		});
	if (unitValues.length === 0) {
		return 'now';
	} else if (unitValues.length === 1) {
		return unitValues[0];
	} else if (unitValues.length === 2) {
		return unitValues.join(' and ');
	}

	// oxford comma
	const allExceptLast = unitValues.slice(0, -1);
	const last = unitValues[unitValues.length - 1];
	return allExceptLast.join(', ') + ', and ' + last;
}

export function getVideoThumbnailURL(videoID: string) {
	return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
}

export function getVideoURL(videoID: string) {
	return `https://youtu.be/${videoID}`;
}
