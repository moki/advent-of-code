type Command = "forward" | "down" | "up";

const parse_line = (line: string) => {
    const [cmd, arg] = line.split(" ");

    if (!(cmd === "forward" || cmd === "down" || cmd === "up"))
        throw new Error("Failed to parse line: invalid command");

    const value = parseInt(arg);

    return [cmd, value] as [Command, number];
};

function part_1(input: string) {
    const lines = input.split("\n").filter((l) => l);

    const state = { d: 0, h: 0 };

    const map = {
        forward: { d: "h", c: 1 },
        down: { d: "d", c: 1 },
        up: { d: "d", c: -1 },
    };

    const new_state = lines.reduce((state: any, v: string) => {
        const [cmd, arg] = parse_line(v);

        state[map[cmd].d] += arg * map[cmd].c;

        return state;
    }, state);

    return new_state.d * new_state.h;
}

function part_2(input: string) {
    const lines = input.split("\n").filter((l) => l);

    const state = { d: 0, h: 0, a: 0 };

    const map = {
        down: { d: "a", c: 1 },
        up: { d: "a", c: -1 },
    };

    const new_state = lines.reduce((state: any, v: string) => {
        const [cmd, arg] = parse_line(v);

        if (cmd === "forward") {
            state.h += arg;
            state.d += state.a * arg;

            return state;
        }

        state[map[cmd].d] += arg * map[cmd].c;

        return state;
    }, state);

    return new_state.d * new_state.h;
}

export { part_1, part_2 };
