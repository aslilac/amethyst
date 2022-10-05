/**
 * Returns an iterator that will always yield the provided value
 */
export function* forever<T>(v: T): IterableIterator<T> {
	while (true) {
		yield v;
	}
}
