/// <reference types="jest" />
import { asyncThread, thread } from "./thread";

test("thread", () => {
	let i = 0;
	thread(function* () {
		while (++i < 5) yield;
	});
	expect(i).toBe(5);
});

test("asyncThread", async () => {
	let i = 0;
	await asyncThread(async function* () {
		while (++i < 5) {
			await Promise.resolve();
			yield;
		}
	});
	expect(i).toBe(5);
});
