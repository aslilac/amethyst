/**
 * Collects all of the values from the individual `Promise`s yielded by an
 * `AsyncIterable`, and returns a single `Promise` which resolves to a single
 * synchronous `Iterable`.
 */
export async function collect<T>(items: AsyncIterable<T>): Promise<Iterable<T>> {
	const result = [];
	for await (const item of items) {
		result.push(item);
	}

	return Promise.all(result);
}
