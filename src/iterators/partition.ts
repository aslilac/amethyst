/**
 * Takes an `Iterable`, and partitions the values into two groups based on the
 * predicate function. If the predicate returns`true`, the value will be added to
 * the first group, otherwise the value will be added to the second group.
 * @returns two `Iterable`s, one for each group
 */
export function partition<T>(
	iter: Iterable<T>,
	predicate: (value: T) => boolean,
): [Iterable<T>, Iterable<T>] {
	const yes: T[] = [];
	const no: T[] = [];

	for (const value of iter) {
		(predicate(value) ? yes : no).push(value);
	}

	return [yes, no];
}
