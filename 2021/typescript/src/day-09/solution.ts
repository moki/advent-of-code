const parse_input = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((l) => l.split("").map((t) => ~~t));

function get_adjacent(data: number[][], i: number, j: number) {
    return [
        // top
        data[i - 1] ? data[i - 1][j] ?? null : null,
        // right
        data[i][j + 1] ?? null,
        // bottom
        data[i + 1] ? data[i + 1][j] ?? null : null,
        // left
        data[i][j - 1] ?? null,
    ];
}

function less_than(xs: (number | null)[], n: number) {
    return !xs.filter((x) => (x != null ? x <= n : false)).length;
}

function part_1(input: string) {
    const data = parse_input(input);

    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const adj = get_adjacent(data, i, j);

            if (less_than(adj, data[i][j])) sum += 1 + data[i][j];
        }
    }

    return sum;
}

function part_2(input: string) {
    return 0;
}

export { part_1, part_2 };
