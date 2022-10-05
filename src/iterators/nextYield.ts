/**
 * Takes an iterator and returns the next yielded value.
 * @throws if the iterator is exhausted or if the iterator throws an error
 */
export function nextYield<T, R, N>(iterator: Iterator<T, R, N>, n: N): T {
	const next = iterator.next(n);

	if (next.done) {
		throw new Error("Iterator is already exhausted");
	}

	return next.value;
}
