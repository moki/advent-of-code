type Commands = "turn on" | "turn off" | "toggle";

const parse_input = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((l) =>
            l
                .split(/(\d*,\d*)/)
                .map((l, i) =>
                    i % 2 ? l.split(",").map((n) => ~~n) : l.trim()
                )
                .filter((l) => l && l !== "through")
        );

const fsum = (a: number, x: number) => (a += x);

function part_1(input: string) {
    const commands = parse_input(input);

    const grid = new Array(1000)
        .fill([])
        .map((a) => new Array(1000).fill(false));

    for (let [command, [x1, y1], [x2, y2]] of commands) {
        for (let i = y1 as number; i <= y2; i++) {
            for (let j = x1 as number; j <= x2; j++) {
                switch (command) {
                    case "turn on":
                        grid[j][i] = true;
                        break;
                    case "turn off":
                        grid[j][i] = false;
                        break;
                    case "toggle":
                        grid[j][i] = !grid[j][i];
                        break;
                    default:
                        throw Error("unknown command");
                }
            }
        }
    }

    return grid.flat(2).reduce(fsum, 0);
}

function part_2(input: string) {
    const commands = parse_input(input);

    const grid = new Array(1000).fill([]).map((a) => new Array(1000).fill(0));

    for (let [command, [x1, y1], [x2, y2]] of commands) {
        for (let i = y1 as number; i <= y2; i++) {
            for (let j = x1 as number; j <= x2; j++) {
                switch (command) {
                    case "turn on":
                        grid[j][i]++;
                        break;
                    case "turn off":
                        grid[j][i] = grid[j][i] - 1 > -1 ? grid[j][i] - 1 : 0;
                        break;
                    case "toggle":
                        grid[j][i] = grid[j][i] + 2;
                        break;
                    default:
                        throw Error("unknown command");
                }
            }
        }
    }

    return grid.flat(2).reduce(fsum, 0);
}

export { part_1, part_2 };
