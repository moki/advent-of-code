function parse_input(input: string) {
    return input
        .split("\n")
        .filter((l) => l)
        .map((l) => l.split(" -> ").map((t) => t.split(",").map((c) => ~~c)));
}

function part_1(input: string) {
    const data = parse_input(input);

    const max = Math.max(...data.flat(2)) + 1;

    const grid = new Array(max).fill([]);

    for (let i = 0; i < max; i++) grid[i] = Array(max).fill(0);

    for (let [[x1, y1], [x2, y2]] of data) {
        if (x1 === x2) {
            if (y2 < y1) [y1, y2] = [y2, y1];

            for (let i = y1; i <= y2; i++) grid[i][x1]++;
        }

        if (y1 === y2) {
            if (x2 < x1) [x1, x2] = [x2, x1];

            for (let i = x1; i <= x2; i++) grid[y1][i]++;
        }
    }

    return grid.flat().filter((c) => c >= 2).length;
}

function part_2(input: string) {
    const data = parse_input(input);

    const max = Math.max(...data.flat(2)) + 1;

    const grid = new Array(max).fill([]);

    for (let i = 0; i < max; i++) grid[i] = Array(max).fill(0);

    for (let [[x1, y1], [x2, y2]] of data) {
        if (x1 === x2) {
            if (y2 < y1) [y1, y2] = [y2, y1];

            for (let i = y1; i <= y2; i++) grid[i][x1]++;
        } else if (y1 === y2) {
            if (x2 < x1) [x1, x2] = [x2, x1];

            for (let i = x1; i <= x2; i++) grid[y1][i]++;
        } else {
            let span = x1 < x2 ? x2 - x1 : x1 - x2;

            for (let i = 0; i <= span; i++) {
                const x = x1 < x2 ? x1 + i : x1 - i;
                const y = y1 < y2 ? y1 + i : y1 - i;

                grid[y][x]++;
            }
        }
    }

    return grid.flat().filter((c) => c >= 2).length;
}

export { part_1, part_2 };
