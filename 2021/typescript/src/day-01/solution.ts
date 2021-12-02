function count_increase(xs: number[]) {
    return xs.reduce(
        (c: number[], x: number) => [x > c[1] ? c[0] + 1 : c[0], x],
        [0, xs[0]]
    )[0];
}

function part_1(input: string) {
    const lines = input.split("\n").filter((l) => l);

    const numbers = lines.map((l) => ~~l);

    return count_increase(numbers);
}

function part_2(input: string) {
    const lines = input.split("\n").filter((l) => l);

    const numbers = lines.map((l) => ~~l);

    const sums = numbers
        .map(function (this: number[], n: number, i: number) {
            return i + 2 < this.length ? n + this[i + 1] + this[i + 2] : null;
        }, numbers)
        .filter((n) => n) as number[];

    return count_increase(sums);
}

export { part_1, part_2 };
