import { df } from "./df";

export function clean(str: string) {
	return (
		str
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean)
			.join("\n") + "\n"
	);
}

export function ct(chunks: TemplateStringsArray, ...intrp: unknown[]) {
	return clean(df(chunks, ...intrp));
}
