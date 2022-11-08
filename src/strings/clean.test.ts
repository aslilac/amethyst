/// <reference types="jest" />
import { undent } from "./clean";

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
