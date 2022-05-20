class SegmentMap<K extends string, V> {
    constructor(public readonly property: K, private readonly convert: (x: unknown) => V) { }

    validate(x: unknown): { [k in K]: V } {
        return {
            [this.property]: this.convert(x)
        } as { [k in K]: V };
    }
}

function bool<K extends string>(property: K): SegmentMap<K, boolean> {
    return new SegmentMap(property, (x) => Boolean(x));
}

function int<K extends string>(property: K): SegmentMap<K, number> {
    return new SegmentMap(property, (x) => Number(x) >> 0);
}

function uuid<K extends string>(property: K): SegmentMap<K, string> {
    return new SegmentMap(property, (x) => String(x));
}

type UnwrapSegmentMap<F> = F extends SegmentMap<infer K, infer V> ? [K, V] : never;

type ParamsFromSegments<F extends readonly SegmentMap<string, unknown>[]> = { [K in keyof F & string as UnwrapSegmentMap<F[K]>[0]]: UnwrapSegmentMap<F[K]>[1] };

class UrlPattern<F extends readonly SegmentMap<string, unknown>[]> {
    constructor(private readonly segmentMaps: F, private readonly toString: (params: ParamsFromSegments<F>) => string) { }

    make(params: ParamsFromSegments<F>): string {
        return this.toString(params);
    }

    match(url?: string): ParamsFromSegments<F> {
        // To be implemented...
        // This is at least enough to show that type info is getting passed around correctly
        return Object.assign({}, ...this.segmentMaps.map((segmentMap) => ({
            ...segmentMap.validate(1)
        }))) as ParamsFromSegments<F>;
    }
}

function url<F extends readonly SegmentMap<string, unknown>[]>(_: TemplateStringsArray, ...segmentMaps: F) {
    return new UrlPattern(segmentMaps, (params) => {
        let s = _[0];

        for (let i = 1; i < _.length; i++) {
            // @ts-expect-error
            s += String(params[segmentMaps[i - 1].property]);
            s += _[i];
        }

        return s;
    });
}

const urlPattern = url`/api/${uuid('userId')}/${uuid('projectId')}/${bool('sharing')}/${int('version')}`;

urlPattern.make({
    sharing: true,
    version: 4000,
    userId: 'kayla',
    projectId: 'abcdefg'
});

urlPattern.make({
    sharing: true,
    version: 4000,
    projectId: 'abcdefg'
});

urlPattern.make({
    sharing: true,
    version: 4000,
    userId: 'kayla',
    projectId: 'abcdefg',
    hello: 'friend'
});

urlPattern.make({
    sharing: true,
    version: '4000',
    userId: 'kayla',
    projectId: 'abcdefg'
});

urlPattern.make({
    
})








console.log(urlPattern.match());

const userId = uuid('userId');
const projectId = uuid('projectId');
const sharing = bool('sharing');
const version = int('version');
const url2 = url`/api/${userId}/${projectId}/${sharing}/${version}`;
console.log(url2.match());
console.log(url2.make({
    sharing: true,
    version: 4000,
    userId: 'kayla',
    projectId: '534-63003-452355'
}));
console.log(url2.make({
    sharing: true,
    version: 4000,
    projectId: '534-63003-452355'
}));
console.log(url2.make({
    sharing: true,
    version: 4000,
    userId: 'kayla',
    projectId: '534-63003-452355'
    hello: 'friend'
}));
console.log(url2.make({
    sharing: true,
    version: '4000',
    userId: 'kayla',
    projectId: '534-63003-452355'
}));
