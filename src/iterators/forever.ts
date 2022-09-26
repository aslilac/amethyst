export function* forever<T>(v: T): IterableIterator<T> {
	while (true) {
		yield v;
	}
}
