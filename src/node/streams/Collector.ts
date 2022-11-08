/// <reference types="node" />
import { Readable } from "stream";

export class Collector {
	#chunks: Buffer[];
	#error?: Error;

	constructor(stream: Readable) {
		this.#chunks = [];
		stream.on("data", (chunk: Buffer) => {
			if (this.#error) {
				return;
			}

			if (!Buffer.isBuffer(chunk)) {
				this.#error = new TypeError("Encountered a chunk that is not a Buffer");
				this.#chunks = [];
				return;
			}

			this.#chunks.push(chunk);
		});
	}

	consume() {
		if (this.#error) {
			throw this.#error;
		}

		return Buffer.concat(this.#chunks);
	}
}
