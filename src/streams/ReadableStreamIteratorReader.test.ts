/// <reference types="jest" />
import { collect } from "../iterators";
import { enqueue } from "./enqueue";
import { ReadableStreamIteratorReader } from "./ReadableStreamIteratorReader";

test("ReadableStreamIteratorReader", async () => {
	const reader = new ReadableStreamIteratorReader(enqueue([1, 2, 3, 4, 5]));
	expect(await collect(reader.read())).toEqual([1, 2, 3, 4, 5]);
});
