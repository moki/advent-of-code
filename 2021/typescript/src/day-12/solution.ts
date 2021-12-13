function part_1(input: string) {
    const pairs = parse_input(input);

    const map = new Map<string, string[]>();

    pairs.forEach(([a, b], i) => {
        if (map.has(a)) map.set(a, [...map.get(a)!, b]);
        else map.set(a, [b]);

        if (map.has(b)) map.set(b, [...map.get(b)!, a]);
        else map.set(b, [a]);
    });

    const paths: string[][] = [];

    const path: string[] = [];

    return traverse(map, "start", path, paths, "");
}

function part_2(input: string) {
    const pairs = parse_input(input);

    const map = new Map<string, string[]>();

    pairs.forEach(([a, b], i) => {
        if (map.has(a)) map.set(a, [...map.get(a)!, b]);
        else map.set(a, [b]);

        if (map.has(b)) map.set(b, [...map.get(b)!, a]);
        else map.set(b, [a]);
    });

    let paths: string[][] = [];

    let path: string[] = [];

    const doubles = [...map.keys()]
        .filter((k) => k.toLowerCase() === k)
        .filter((k) => k !== "start" && k !== "end");

    let n = 0;

    for (let j = 0; j < doubles.length; j++)
        n += traverse(map, "start", path, paths, doubles[j]);

    const uniq = new Set<string>();

    for (let i = 0; i < paths.length; i++) uniq.add(paths[i].join(" "));

    return uniq.size;
}

const parse_input = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((l) => l.split("-"));

function traverse(
    map: Map<string, string[]>,
    now: string,
    path: string[],
    paths: string[][],
    double: string
): number {
    if (now === "end") {
        paths.push([...path, "end"]);
        return 1;
    }

    if (now.toLowerCase() === now && path.includes(now)) {
        if (now !== double) return 0;
        double = "";
    }

    path = [...path, now];

    const explore = [0];

    const available = map.get(now)!;

    for (let i = 0; i < available.length; i++) {
        explore.push(traverse(map, available[i], path, paths, double));
    }

    return explore.reduce((a, b) => (a += b), 0);
}

export { part_1, part_2 };
