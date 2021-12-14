function part_1(input: string) {
    let data = parse_input(input);

    return polymer_calculate(...data, 10);
}

function part_2(input: string) {
    let data = parse_input(input);

    return polymer_calculate(...data, 40);
}

function polymer_calculate(
    polymer: string,
    rules: [string, string][],
    insertions: number
) {
    const rules_map = new Map<string, string>(
        rules.map(([k, v]) => [k, k.split("")[0] + v + k.split("")[1]])
    );

    const pairs = polymer
        .split("")
        .map((p: string, i: number, polymer: string[]) =>
            !i ? "" : polymer[i - 1] + p
        )
        .filter((p) => p.length);

    let poly_map = new Map<string, number>();

    for (let i = 0; i < pairs.length; i++)
        poly_map.set(pairs[i], (poly_map.get(pairs[i]) ?? 0) + 1);

    for (let i = 0; i < insertions; i++) {
        const new_map = new Map<string, number>();

        for (const [pair, count] of poly_map) {
            const n = rules_map.get(pair)!;

            let new_pair = n.slice(0, 2);

            new_map.set(new_pair, (new_map.get(new_pair) ?? 0) + count);

            new_pair = n.slice(1, 3);

            new_map.set(new_pair, (new_map.get(new_pair) ?? 0) + count);
        }

        poly_map = new_map;
    }

    const count_map = new Map<string, number>();

    for (let [pair, count] of poly_map) {
        let k = pair[1];

        count_map.set(k, (count_map.get(k) ?? 0) + count);
    }

    return Math.max(...count_map.values()) - Math.min(...count_map.values());
}

const parse_input = (input: string): [string, [string, string][]] => {
    const [polymer, rules] = input.trim().split("\n\n");
    return [
        polymer,
        rules.split("\n").map((r) => r.split(" -> ") as [string, string]),
    ];
};

export { part_1, part_2 };
