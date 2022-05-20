export class Lazy<I> implements Iterable<I> {
	constructor(private readonly iter: Iterable<I>) {}

	[Symbol.iterator](): Iterator<I> {
		return this.iter[Symbol.iterator]();
	}

	filter(predicate: (i: I) => boolean): Lazy<I> {
		const parent = this;
		return new Lazy(
			(function* () {
				for (const i of parent) {
					console.log("filter", i);
					if (predicate(i)) {
						yield i;
					}
				}
			})(),
		);
	}

	map<O>(func: (i: I) => O): Lazy<O> {
		const parent = this;
		return new Lazy(
			(function* () {
				for (const i of parent) {
					console.log("map", i);
					yield func(i);
				}
			})(),
		);
	}

	collect(): I[] {
		return Array.from(this);
	}

	collectSet(): Set<I> {
		return new Set(this);
	}
}

const lazy = new Lazy([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	.filter((i) => i % 2 === 0)
	.map((i) => i ** 2);

console.log("collect");
// const a = lazy.collect();
// console.log(a);
const s = lazy.collectSet();
console.log(s);
