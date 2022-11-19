import { IteratorSource } from "./IteratorSource.js";

export function enqueue<T>(items: Iterable<T>): ReadableStream<T> {
	return new ReadableStream<T>(new IteratorSource(items));
}
