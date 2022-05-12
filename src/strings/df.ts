export function df(chunks: TemplateStringsArray, ...intrp: unknown[]) {
	let result = "";

	for (let i = 0; i < chunks.length; i++) {
		result += chunks[i];

		if (i < intrp.length) {
			result += String(intrp[i]);
		}
	}

	return result;
}
