export function use<T>(initialValue: T, ...transformers: Array<(x: T) => void>): T {
	transformers.forEach((transformer) => transformer(initialValue));
	return initialValue;
}
