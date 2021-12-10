const parse_input = (input: string) => input.trim().split("\n");

type Open_Token = "[" | "{" | "<" | "(";

const open_tokens = ["[", "{", "<", "("];

type Close_Token = "]" | "}" | ">" | ")";

const close_tokens: Close_Token[] = ["]", "}", ">", ")"];

const score = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const map = new Map();

for (let i = 0; i < 4; i++) {
    map.set(close_tokens[i], open_tokens[i]);
}

const fsum = (a: number, x: number) => (a += x);

function score_line(line: string) {
    const openp = [];

    for (let t of line.split("")) {
        if (open_tokens.indexOf(t) !== -1) {
            openp.push(t);
        } else {
            const expect = map.get(t);

            const last = openp.pop();

            if (expect !== last) return score[t as Close_Token];
        }
    }

    return 0;
}

function part_1(input: string) {
    const code = parse_input(input);

    const scores = [];

    for (let line of code) scores.push(score_line(line));

    return scores.reduce(fsum, 0);
}

const rscore_map = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
};

function repair_line(line: string) {
    const openp = [];

    for (let t of line.split("")) {
        if (open_tokens.indexOf(t) !== -1) {
            openp.push(t);
        } else {
            const expect = map.get(t);

            const last = openp.pop();

            if (expect !== last) break;
        }
    }

    const score = openp.reduceRight((a, x) => {
        a *= 5;

        a += rscore_map[x as Open_Token];

        return a;
    }, 0);

    return score;
}

function part_2(input: string) {
    const code = parse_input(input);

    const incomplete = [];

    for (let line of code) {
        if (!score_line(line)) incomplete.push(line);
    }

    const scores = [];

    for (let line of incomplete) scores.push(repair_line(line));

    scores.sort((a, b) => a - b);

    return scores[~~(scores.length / 2)];
}

export { part_1, part_2 };
