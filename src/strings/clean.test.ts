/// <reference types="jest" />
import { ct } from "./clean";

test("ct", () => {
	const withCt = ct`
		August
		Bandit
		Dot
		Mady
		Toby
	`;

	const withoutCt = "August\nBandit\nDot\nMady\nToby\n";

	expect(withCt).toBe(withoutCt);
});
