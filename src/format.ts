import { guard, $string } from "succulent";

export const Formatter = {
	// display: Symbol("Formatter.display"),
	display: "e6da0195cc3d4ad98c814c78e9275345",
	// debug: Symbol("Formatter.debug"),
	debug: "f048520c55b1465a9adefedaaba864ba",
} as const;

interface Formattable {
	[Formatter.display](): string;
	[Formatter.debug](): string;
}

function format(base: string, ...items: Formattable[]) {
	guard(base, $string);

	const chunks = [];

	let lastChunkEnd = 0;
	let specifierCount = 0;
	for (let i = 0; i < base.length; i++) {
		const [char, nextChar] = base.slice(i);

		if (char === "}" && nextChar === "}") {
			// only include the first "}"
			const guy = base.slice(lastChunkEnd, i + 1);
			chunks.push(() => guy);
			// and skip past the second one
			i += 1;
			lastChunkEnd = i + 1;
			continue;
		}

		if (char === "}" && nextChar !== "}") {
			throw new Error("unmatched }");
		}

		if (base.charAt(i) === "{") {
			if (nextChar === "{") {
				const guy = base.slice(lastChunkEnd, i + 1);
				chunks.push(() => guy);
				// and skip past the second one
				i += 1;
				lastChunkEnd = i + 1;
				continue;
			}

			let j = i;
			for (; j < base.length; j++) {
				if (base.charAt(j) === "}") {
					const guy = base.slice(lastChunkEnd, i);
					chunks.push(() => guy);
					const spec = JSON.stringify(base.slice(i + 1, j));
					console.log("SPECIFIER:", spec);
					const item = items[specifierCount]!;
					chunks.push(() => item.toString());
					specifierCount += 1;
					lastChunkEnd = j + 1;
					i = j;
					break;
				}
			}

			if (!(j < base.length)) {
				throw new Error("unmatched {");
			}
		}
	}

	chunks.push(() => base.slice(lastChunkEnd));
	if (specifierCount !== items.length) {
		throw new Error(
			format("expected {} values but received {}", specifierCount, items.length),
		);
	}

	return chunks.map((chunkThunk) => chunkThunk()).join("");
}

// format("hello, {}!"); // error!
// format("hello, {!"); // error!
// format("hello, }!")); // error!
console.log(format("hello, {{}}!"));
console.log(format("hello, {{!"));
console.log(format("hello, }}!"));
console.log(format("hello, {{{{{{!"));
console.log(format("hello, }}}}}}!"));
console.log(format("hello, {}!", "computer"));
console.log(format("hello, {abcd}!", "computer"));
