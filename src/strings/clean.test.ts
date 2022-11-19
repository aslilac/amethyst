/// <reference types="vitest/globals" />
import { undent } from "./clean.js";

test("undent", () => {
	const undented = undent`
		August
		Bandit
		Dot
		Mady
		Toby
	`;
	expect(undented).toBe("August\nBandit\nDot\nMady\nToby\n");
});
