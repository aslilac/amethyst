export class IteratorSource<T> implements UnderlyingSource<T> {
	iter: Iterator<T>;

	constructor(readonly items: Iterable<T>) {
		this.iter = items[Symbol.iterator]();
	}

	pull(controller: ReadableStreamDefaultController<T>) {
		const next = this.iter.next();

		if (next.done) {
			controller.close();
			return;
		}

		controller.enqueue(next.value);
	}
}
