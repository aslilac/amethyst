/// <reference types="jest" />
import { Observable } from "./Observable";
import { RefPromise } from "./RefPromise";
import { Signal } from "./Signal";

test("Observable", () => {
	const rp = new RefPromise();
	const signal = new Signal();
	const observable = new Observable((resolve) => {
		let i = 0;
		resolve(i++);
		signal.subscribe(() => resolve(i++));
	});

	rp.ref();
	const unsubscribe = observable.subscribe((value) => {
		// expect(value).toBe(0);
		return (cleanup) => {
			expect(cleanup).toBe(0);
			rp.release();
		};
	});

	signal.signal();
	unsubscribe();

	rp.ref();
	observable.subscribe((value) => {
		expect(value).toBe(1);
		rp.release();
	});

	return rp.await();
});
