type Command = "^" | "v" | "<" | ">";

type Direction = "x" | "y";

const parse_lines = (input: string) => {
    return input.trim().split("");
};

type State = {
    x: number;
    y: number;
    presents: Set<string>;
};

function simulate(state: State, commands: Command[]) {
    const map = {
        "^": { v: 1, d: "y" },
        v: { v: -1, d: "y" },
        ">": { v: 1, d: "x" },
        "<": { v: -1, d: "x" },
    };

    commands.forEach((c: Command) => {
        const { v, d } = map[c as Command];

        state[d as Direction] += v;

        state.presents.add(`${state.x}-${state.y}`);
    });

    return state;
}

function part_1(input: string) {
    const state = {
        x: 0,
        y: 0,
        presents: new Set<string>(),
    };

    const commands = parse_lines(input) as Command[];

    const new_state = simulate(state, commands);

    return state.presents.size;
}

function part_2(input: string) {
    const data = parse_lines(input);

    const santa_state: State = {
        x: 0,
        y: 0,
        presents: new Set<string>(),
    };

    santa_state.presents.add("0-0");

    const santa_commands = data.filter((c, i) => !(i % 2)) as Command[];

    const new_santa_state = simulate(santa_state, santa_commands);

    const robot_state = {
        x: 0,
        y: 0,
        presents: new Set<string>(),
    };

    const robot_commands = data.filter((c, i) => i % 2) as Command[];

    const new_robot_state = simulate(robot_state, robot_commands);

    return new Set([...santa_state.presents, ...robot_state.presents]).size;
}

export { part_1, part_2 };
