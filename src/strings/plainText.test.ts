/// <reference types="jest" />
import { plainText } from "./plainText";

test("plainText", () => {
	const example = plainText`Hello, ${"computer"}!`;
	expect(example).toBe("Hello, computer!");
});
