/// <reference types="vitest/globals" />
import { collect } from "./collect.js";

async function* upTo(limit: number) {
	for (let i = 1; i <= limit; i++) {
		// Do some async work :^)
		await Promise.resolve();
		yield i;
	}
}
/// <reference types="vitest/globals" />
test("collect", async () => {
	const result = await collect(upTo(3));
	expect(result).toEqual([1, 2, 3]);
});
