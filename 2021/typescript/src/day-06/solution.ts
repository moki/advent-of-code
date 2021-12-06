const parse_input = (input: string) =>
    input
        .split(",")
        .filter((t) => t)
        .map((n) => ~~n);

function array_shift(xs: number[], amount: number = 1) {
    if (amount <= 0) return;

    for (let j = 0; j < xs.length - 1; j++) xs[j] = xs[j + 1] ?? 0;

    array_shift(xs, amount - 1);
}

function simulation(
    state: number[],
    trials: number,
    spawn: number = 0,
    trial: number = 0
): number[] {
    if (trial === trials) return state;

    spawn = state[0];

    array_shift(state);

    state[8] = spawn;

    state[6] += spawn;

    return simulation(state, trials, spawn, trial + 1);
}

function part_1(input: string) {
    const data = parse_input(input);

    let state = Array(9).fill(0);

    data.forEach((d) => state[d]++);

    const final_state = simulation(state, 80);

    return final_state.reduce((a, d) => a + d, 0);
}

function part_2(input: string) {
    const data = parse_input(input);

    let state = Array(9).fill(0);

    data.forEach((d) => state[d]++);

    const new_state = simulation(state, 256);

    return new_state.reduce((a, d) => a + d, 0);
}

export { part_1, part_2 };
