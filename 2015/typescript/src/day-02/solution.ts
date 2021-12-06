const parse_lines = (input: string) => {
    return input
        .trim()
        .split("\n")
        .map((l) => l.split("x").map((t) => ~~t));
};

const fsum = (sum: number, x: number) => (sum += x);

const fprod = (prod: number, x: number) => (prod *= x);

function part_1(input: string) {
    return parse_lines(input)
        .map(([l, w, h]) => [l * w, w * h, h * l])
        .map((ds) => ds.map((d) => d * 2).reduce(fsum, Math.min(...ds)))
        .reduce(fsum, 0);
}

function part_2(input: string) {
    return parse_lines(input)
        .map((d) =>
            d
                .sort((a, b) => b - a)
                .slice(1)
                .map((d) => d * 2)
                .reduce(fsum, d.reduce(fprod, 1))
        )
        .reduce((sum, d) => (sum += d), 0);
}

export { part_1, part_2 };
