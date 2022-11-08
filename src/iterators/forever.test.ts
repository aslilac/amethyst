/// <reference types="jest" />
import { forever } from "./forever";

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
