/**
 * Takes an `Iterable`, and partitions the values into two groups based on the
 * predicate function. If the predicate returns`true`, the value will be added to
 * the first group, otherwise the value will be added to the second group.
 * @returns two `Iterable`s, one for each group
 */
export function partition<T>(
	iter: Iterable<T>,
	predicate: (value: T) => boolean,
): [yes: Iterable<T>, no: Iterable<T>] {
	const yes: T[] = [];
	const no: T[] = [];

	for (const value of iter) {
		const group = predicate(value) ? yes : no;
		group.push(value);
	}

	return [yes, no];
}
