export function partition<T>(
	iter: Iterable<T>,
	predicate: (value: T) => boolean,
): [T[], T[]] {
	const yes: T[] = [];
	const no: T[] = [];

	for (const value of iter) {
		(predicate(value) ? yes : no).push(value);
	}

	return [yes, no];
}
