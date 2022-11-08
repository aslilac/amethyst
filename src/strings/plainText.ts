export function plainText(text: TemplateStringsArray, ...objects: unknown[]) {
	const textChunks = [...text];
	let result = textChunks.shift()!;

	for (let i = 0; i < textChunks.length; i++) {
		result += String(objects[i]);
		result += textChunks[i]!;
	}

	return result;
}
