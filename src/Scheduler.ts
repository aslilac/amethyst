import { Signal } from "./Signal.js";

interface SchedulerOptions {
	retries?: number;
	// timeout?: number;
}

type Task<R> = () => R;

export class Scheduler<R> {
	#concurrency: number;
	#retries: number;
	#consumed = false;
	#tasks: Array<Task<R>> = [];
	#running = 0;
	#results: Array<Awaited<R>> = [];
	#completion = new Signal();

	constructor(concurrency: number, options: SchedulerOptions = {}) {
		const { retries = 0 } = options;
		this.#concurrency = concurrency;
		this.#retries = retries;
	}

	schedule(task: Task<R>) {
		if (this.#consumed) {
			throw new Error(
				"Tasks cannot be scheduled after the scheduler has been started",
			);
		}

		this.#tasks.push(task);
	}

	#tick() {
		if (this.#tasks.length < 1) {
			if (this.#running < 1) {
				this.#completion.signal();
			}

			return;
		}

		if (this.#running >= this.#concurrency) {
			return;
		}

		this.#running++;
		let attempts = 0;
		const task = this.#tasks.shift()!;

		const runTask = async () => {
			try {
				const result = await Promise.resolve(task());
				this.#running--;
				this.#results.push(result);
				this.#tick();
			} catch {
				if (this.#retries > attempts) {
					attempts += 1;
					void runTask();
				} else {
					this.#running--;
					this.#tick();
				}
			}
		};

		void runTask();
		this.#tick();
	}

	async start() {
		if (this.#consumed) {
			throw new Error("Scheduler has already been started");
		}

		this.#consumed = true;
		return new Promise((resolve) => {
			this.#completion.subscribe(() => {
				resolve(this.#results);
			});
			this.#tick();
		});
	}
}
