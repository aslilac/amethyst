/// <reference types="vitest/globals" />
import { collect } from "../iterators/index.js";
import { enqueue } from "./enqueue.js";
import { ReadableStreamIteratorReader } from "./ReadableStreamIteratorReader.js";

test("ReadableStreamIteratorReader", async () => {
	const reader = new ReadableStreamIteratorReader(enqueue([1, 2, 3, 4, 5]));
	expect(await collect(reader.read())).toEqual([1, 2, 3, 4, 5]);
});
