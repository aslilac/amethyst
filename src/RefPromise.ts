export class RefPromise {
	// @ts-expect-error - ugh
	#resolve: () => void;
	#promise: Promise<void>;
	#rc = 0;

	constructor() {
		this.#promise = new Promise((resolve) => {
			this.#resolve = resolve;
		});
	}

	ref() {
		this.#rc++;
	}

	release() {
		this.#rc--;

		if (this.#rc === 0) {
			this.#resolve();
		}

		if (this.#rc < 0) {
			throw new Error("RefPromise was released more than it was refed");
		}
	}

	await() {
		return this.#promise;
	}
}
