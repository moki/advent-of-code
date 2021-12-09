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

function walk(
    data: number[][],
    i: number,
    j: number,
    visited: boolean[][]
): number {
    if (
        i < 0 ||
        j < 0 ||
        i >= visited.length ||
        j >= visited[0].length ||
        visited[i][j]
    )
        return 0;

    visited[i][j] = true;

    return (
        1 +
        walk(data, i - 1, j, visited) +
        walk(data, i, j + 1, visited) +
        walk(data, i + 1, j, visited) +
        walk(data, i, j - 1, visited)
    );
}

function part_2(input: string) {
    const data = parse_input(input);

    const ps = [];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const adj = get_adjacent(data, i, j);

            if (less_than(adj, data[i][j])) {
                ps.push([i, j]);
            }
        }
    }

    const visited = new Array(data.length)
        .fill([])
        .map((a, i) =>
            new Array(data[0].length)
                .fill(false)
                .map((v, j) => (data[i][j] === 9 ? true : false))
        );

    const bs = [];

    for (let [i, j] of ps) bs.push(walk(data, i, j, visited));

    bs.sort((a, b) => b - a);

    return bs[0] * bs[1] * bs[2];
}

export { part_1, part_2 };
