export class ReadableStreamIteratorReader<T> {
	constructor(private readonly stream: ReadableStream<T>) {}

	async *read(): AsyncIterableIterator<T> {
		const reader = this.stream.getReader();

		do {
			const { done, value } = await reader.read();
			if (done) return;
			yield value;
		} while (true);
	}

	/*
	cancel() {}
	close() {}
	releaseLock() {}
	*/
}
