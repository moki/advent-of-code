const parse_input = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((l) => l.split("").map((t) => ~~t));

const grid_log = (g: number[][]) => {
    for (let i = 0; i < g.length; i++) {
        let r = "";

        for (let j = 0; j < g[0].length; j++) {
            r += g[i][j];
        }

        console.log(r);
    }
    console.log("");
};

function grid_apply(grid: number[][], f: (a: number) => number) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j] = f(grid[i][j]);
        }
    }
}

function get_adjacent(grid: number[][], i: number, j: number) {
    return [
        // top
        grid[i - 1] ? (grid[i - 1][j] ? [i - 1, j] : null) : null,
        // top-right
        grid[i - 1] ? (grid[i - 1][j + 1] ? [i - 1, j + 1] : null) : null,
        // right
        grid[i][j + 1] ? [i, j + 1] : null,
        // right bottom
        grid[i + 1] ? (grid[i + 1][j + 1] ? [i + 1, j + 1] : null) : null,
        // bottom
        grid[i + 1] ? (grid[i + 1][j] ? [i + 1, j] : null) : null,
        // bottom left
        grid[i + 1] ? (grid[i + 1][j - 1] ? [i + 1, j - 1] : null) : null,
        // left
        grid[i][j - 1] ? [i, j - 1] : null,
        // left top
        grid[i - 1] ? (grid[i - 1][j - 1] ? [i - 1, j - 1] : null) : null,
    ];
}

function grid_flash(grid: number[][]) {
    const set = new Set<string>();

    let pl;

    do {
        pl = set.size;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const hash = `${i}-${j}`;

                if (grid[i][j] || set.has(hash)) continue;

                const adj = get_adjacent(grid, i, j).filter((k) => k) as [
                    number,
                    number
                ][];

                for (const [y, x] of adj)
                    grid[y][x] = grid[y][x]
                        ? (grid[y][x] + 1) % 10
                        : grid[y][x];

                set.add(hash);
            }
        }
    } while (set.size > pl);
}

function part_1(input: string) {
    const grid = parse_input(input);

    let flashes = 0;

    for (let k = 0; k < 100; k++) {
        grid_apply(grid, (a) => (a + 1) % 10);

        grid_flash(grid);

        flashes += grid.flat(2).filter((k) => !k).length;
    }

    return flashes;
}

function part_2(input: string) {
    const code = parse_input(input);

    const grid = parse_input(input);

    let flashes = 0;

    for (let k = 0; ; k++) {
        grid_apply(grid, (a) => (a + 1) % 10);

        grid_flash(grid);

        flashes = grid.flat(2).filter((k) => !k).length;

        if (flashes === 100) return k + 1;
    }
}

export { part_1, part_2 };
