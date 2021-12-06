type Token = "(" | ")";

function part_1(input: string) {
    const map = { "(": 1, ")": -1 };

    return input
        .trim()
        .split("")
        .reduce((a: number, t: string) => a + map[t as Token], 0);
}

function part_2(input: string) {
    const map = { "(": 1, ")": -1 };

    const reducer = (a: [number, number], t: string, i: number) => {
        a[0] = a[0] + map[t as Token];
        a[1] = a[0] === -1 && a[1] === 0 ? i : a[1];

        return a;
    };

    return input.trim().split("").reduce(reducer, [0, 0])[1] + 1;
}

export { part_1, part_2 };
