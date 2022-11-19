import { plainText } from "./plainText.js";

export function clean(str: string) {
	return (
		str
			.split("\n")
			.map((line) => line.trimStart())
			.filter(Boolean)
			.join("\n") + "\n"
	);
}

export function undent(text: TemplateStringsArray, ...objects: unknown[]) {
	return clean(plainText(text, ...objects));
}
