export async function collect<T>(items: AsyncIterable<T>) {
	const result = [];

	for await (const item of items) {
		result.push(item);
	}

	return result;
}
