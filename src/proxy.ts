export function ReadonlyProxy<T extends object>(obj: T): T {
	return new Proxy(obj, {
		get(t, prop, receiver) {
			return Reflect.get(t, prop, receiver) as T[keyof T];
		},
	}) as unknown as T;
}
