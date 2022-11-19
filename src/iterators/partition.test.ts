/// <reference types="vitest/globals" />
import { partition } from "./partition.js";

test("partition", () => {
	const [yes, no] = partition([1, 2, 3, 4, 5], (x) => x % 2 === 0);

	expect(yes).toEqual([2, 4]);
	expect(no).toEqual([1, 3, 5]);
});
