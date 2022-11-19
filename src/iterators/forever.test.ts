/// <reference types="vitest/globals" />
import { forever } from "./forever.js";

test("forever", () => {
	const x = {};
	let iterations = 0;

	for (const v of forever(x)) {
		if (iterations++ > 100) {
			break;
		}
		expect(v).toBe(x);
	}
});
