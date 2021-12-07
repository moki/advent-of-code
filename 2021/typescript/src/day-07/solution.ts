const parse_input = (input: string) => input.split(",").map((n) => ~~n);

const fsum = (sum: number, x: number) => (sum += x);

const mad = (n: number) => (x: number) => Math.abs(n - x);

const range = (n: number, m: number) =>
    new Array(m - n + 1).fill(0).map((_, i) => n + i);

function part_1(input: string) {
    const data = parse_input(input);

    data.sort((a, b) => a - b);

    const mi = ~~(data.length / 2) - (data.length % 2 ? 0 : 1);

    const median = data[mi];

    return data.map(mad(median)).reduce(fsum, 0);
}

function part_2(input: string) {
    const data = parse_input(input);

    let mean = data.reduce(fsum, 0) / data.length;

    const mf = Math.floor(mean);
    const mc = Math.ceil(mean);

    return Math.min(
        ...data.reduce(
            ([tf, tc], d) => {
                return [
                    tf + range(1, Math.abs(mf - d)).reduce(fsum, 0),
                    tc + range(1, Math.abs(mc - d)).reduce(fsum, 0),
                ];
            },
            [0, 0]
        )
    );
}

export { part_1, part_2 };
