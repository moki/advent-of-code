function part_1(input: string) {
    const [points, folds] = parse_input(input) as [
        [number, number][],
        [string, number][]
    ];

    const max_x = Math.max(...(points as number[][]).map(([x, _]) => x)) + 1;

    const max_y = Math.max(...(points as number[][]).map(([_, y]) => y)) + 1;

    const grid = new Array(max_y).fill([]).map((a) => new Array(max_x).fill(0));

    for (let [x, y] of points) grid[y][x] = 1;

    let dimensions = [max_y, max_x] as [number, number];

    for (const fold of folds.slice(0, 1)) {
        grid_fold(grid, fold);

        switch (fold[0]) {
            case "x":
                dimensions[1] = fold[1];
                break;
            case "y":
                dimensions[0] = fold[1];
                break;
        }
    }

    return grid_count(grid, dimensions);
}

const parse_input = (input: string) => {
    const [points, folds] = input.trim().split("\n\n");

    return [
        points.split("\n").map((p) => p.split(",").map((_p) => ~~_p)),
        folds.split("\n").map((l) =>
            l
                .match(/(x|y)=(\d*)/g)![0]
                .split("=")
                .map((t, i) => (i ? ~~t : t))
        ),
    ];
};

function grid_log(grid: number[][], m: number, n: number) {
    const char_map = [".", "#"];

    for (let i = 0; i < m; i++) {
        let r = `${i % 10} `;
        for (let j = 0; j < n; j++) {
            r += char_map[grid[i][j]] + " ";
        }

        console.log(r);
    }
}

function grid_fold(grid: number[][], [dir, change]: [string, number]) {
    switch (dir) {
        case "y":
            grid_yfold(grid, change);
            break;
        case "x":
            grid_xfold(grid, change);
            break;
        default:
            throw new Error(`not implemented: ${dir} fold`);
    }
}

function grid_yfold(grid: number[][], change: number) {
    for (let i = change + 1; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (change - Math.abs(i - change) >= 0) {
                grid[change - Math.abs(i - change)][j] = grid[i][j]
                    ? grid[i][j]
                    : grid[change - Math.abs(i - change)][j];
            }
        }
    }
}

function grid_xfold(grid: number[][], change: number) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = change + 1; j < grid[0].length; j++) {
            grid[i][change - Math.abs(j - change)] = grid[i][j]
                ? grid[i][j]
                : grid[i][change - Math.abs(j - change)];
        }
    }
}

function grid_count(grid: number[][], dimensions: [number, number]) {
    return grid
        .map((r, i) => (i < dimensions[0] ? r : []))
        .map((r) => r.map((c, i) => (i < dimensions[1] ? c : 0)))
        .filter((r) => r.length)
        .flat(2)
        .filter((c) => c).length;
}

function part_2(input: string) {
    const [points, folds] = parse_input(input) as [
        [number, number][],
        [string, number][]
    ];

    const max_x = Math.max(...(points as number[][]).map(([x, _]) => x)) + 1;

    const max_y = Math.max(...(points as number[][]).map(([_, y]) => y)) + 1;

    const grid = new Array(max_y).fill([]).map((a) => new Array(max_x).fill(0));

    for (let [x, y] of points) grid[y][x] = 1;

    let dimensions = [max_y, max_x] as [number, number];

    for (const fold of folds) {
        grid_fold(grid, fold);

        switch (fold[0]) {
            case "x":
                dimensions[1] = fold[1];
                break;
            case "y":
                dimensions[0] = fold[1];
                break;
        }
    }

    grid_log(grid, dimensions[0], dimensions[1]);
}

export { part_1, part_2 };
