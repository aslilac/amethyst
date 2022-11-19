/// <reference types="vitest/globals" />
import { forever } from "./forever.js";
import { nextYield } from "./nextYield.js";

function* echo<T>(): Generator<T | undefined, void, T | undefined> {
	let value: T | undefined;
	do {
		value = yield value;
	} while (value);
}

test("nextYield", () => {
	const x = {};

	const foreverIterator = forever(x);
	expect(nextYield(foreverIterator)).toBe(x);

	const echoIterator = echo();
	expect(nextYield(echoIterator, 1)).toBeUndefined();
	expect(nextYield(echoIterator, 2)).toBe(2);
	expect(nextYield(echoIterator, 3)).toBe(3);
	expect(() => nextYield(echoIterator)).toThrow();
});
