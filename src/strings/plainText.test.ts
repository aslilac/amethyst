/// <reference types="vitest/globals" />
import { plainText } from "./plainText.js";

test("plainText", () => {
	const example = plainText`Hello, ${"computer"}!`;
	expect(example).toBe("Hello, computer!");
});
