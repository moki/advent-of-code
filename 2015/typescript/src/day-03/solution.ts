type Token = "^" | "v" | "<" | ">";

type Direction = "x" | "y";

const parse_lines = (input: string) => {
    return input.trim().split("");
};

function part_1(input: string) {
    const map = {
        "^": { v: 1, d: "y" },
        v: { v: -1, d: "y" },
        ">": { v: 1, d: "x" },
        "<": { v: -1, d: "x" },
    };

    const state: {
        x: number;
        y: number;
        presents: { [key: string]: number };
    } = {
        x: 0,
        y: 0,
        presents: {},
    };

    state.presents[`${state.x}-${state.y}`] = 0;

    parse_lines(input).forEach((t) => {
        const { v, d } = map[t as Token];

        state[d as Direction] += v;

        const p = state.presents[`${state.x}-${state.y}`];

        state.presents[`${state.x}-${state.y}`] = p ? p + 1 : 1;
    });

    return Object.keys(state.presents).length;
}

function part_2(input: string) {
    const map = {
        "^": { v: 1, d: "y" },
        v: { v: -1, d: "y" },
        ">": { v: 1, d: "x" },
        "<": { v: -1, d: "x" },
    };

    const data = parse_lines(input);

    const santa_state: {
        x: number;
        y: number;
        presents: { [key: string]: number };
    } = {
        x: 0,
        y: 0,
        presents: {},
    };

    santa_state.presents[`${santa_state.x}-${santa_state.y}`] = 0;

    const santa = data.filter((c, i) => i % 2 === 0);

    santa.forEach((t) => {
        const { v, d } = map[t as Token];

        santa_state[d as Direction] += v;

        const p = santa_state.presents[`${santa_state.x}-${santa_state.y}`];

        santa_state.presents[`${santa_state.x}-${santa_state.y}`] = p
            ? p + 1
            : 1;
    });

    const robot_state: {
        x: number;
        y: number;
        presents: { [key: string]: number };
    } = {
        x: 0,
        y: 0,
        presents: {},
    };

    const robot = data.filter((c, i) => i % 2);

    robot.forEach((t) => {
        const { v, d } = map[t as Token];

        robot_state[d as Direction] += v;

        const p = robot_state.presents[`${robot_state.x}-${robot_state.y}`];

        robot_state.presents[`${robot_state.x}-${robot_state.y}`] = p
            ? p + 1
            : 1;
    });

    return Object.keys({ ...santa_state.presents, ...robot_state.presents })
        .length;
}

export { part_1, part_2 };
