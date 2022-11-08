/// <reference types="jest" />
import { forever } from "./forever";
import { nextYield } from "./nextYield";

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
	expect(nextYield(echoIterator, 1)).toBe(undefined);
	expect(nextYield(echoIterator, 2)).toBe(2);
	expect(nextYield(echoIterator, 3)).toBe(3);
	expect(() => nextYield(echoIterator)).toThrow();
});
