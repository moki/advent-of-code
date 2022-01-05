const parse_input = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((l) => l.split("").map((t) => ~~t));

function part_1(input: string) {
    let grid = parse_input(input);

    const n = grid.length;

    const m = grid[0].length;

    const visited: boolean[][] = new Array(n)
        .fill([])
        .map((a) => new Array(m).fill(false));

    const distance: number[][] = new Array(n)
        .fill([])
        .map((a) => new Array(m).fill(Infinity));

    traverse(grid, distance, 0, 0, grid.length, grid[0].length);

    return distance[n - 1][m - 1];
}

function part_2(input: string) {
    let data = parse_input(input);

    const n = data.length * 5;

    const m = data[0].length * 5;

    const lenn = (n + "").length - 1;

    const lenm = (m + "").length - 1;

    const grid = new Array(n).fill([]).map((a) => new Array(m));

    const wrap = (x: number) => {
        return x > 9 ? ~~(x / 9) : x;
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const addi = (i + "").length > lenn ? ~~(i / data.length) : 0;
            const addj = (j + "").length > lenm ? ~~(j / data[0].length) : 0;

            grid[i][j] =
                ((data[i % data.length][j % data[0].length] + addi + addj - 1) %
                    9) +
                1;
        }
    }

    const distance: number[][] = new Array(n)
        .fill([])
        .map((a) => new Array(m).fill(Infinity));

    traverse(grid, distance, 0, 0, grid.length, grid[0].length);

    return distance[n - 1][m - 1];
}

function traverse(
    grid: number[][],
    distance: number[][],
    i: number,
    j: number,
    n: number,
    m: number
) {
    const queue = [[i, j]];

    distance[i][j] = 0;

    let k = 0;

    for (; queue.length; ) {
        const level = [];

        for (let cursor; (cursor = queue.shift()); level.push(cursor));

        for (const [y, x] of level) {
            const moves = get_moves(y, x, n, m);

            const scores: number[] = [];

            const score_to_indexes = new Map<number, [number, number]>();

            for (const [y2, x2] of moves) {
                const pscore = distance[y2][x2];

                const score = grid[y2][x2] + distance[y][x];

                if (score < pscore) {
                    distance[y2][x2] = score;

                    queue.push([y2, x2]);
                }
            }
        }
    }
}

function get_moves(i: number, j: number, n: number, m: number) {
    return [
        [i - 1, j],
        [i, j + 1],
        [i + 1, j],
        [i, j - 1],
    ].filter(([y, x]) => y >= 0 && y < n && x >= 0 && x < n) as [
        number,
        number
    ][];
}

export { part_1, part_2 };
