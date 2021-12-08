const parse_input = (input: string) => input.trim().split("\n");

function part_1(input: string) {
    const data = parse_input(input);

    // [aeiou].*[aeiou].*[aeiou]
    // (.*[aeiou]){3}

    const pattern_1 = new RegExp(/(.*[aeiou]){3}/, "g");

    const pattern_2 = new RegExp(/(.)\1/, "g");

    const pattern_3 = new RegExp(/ab|cd|pq|xy/, "g");

    const good = data
        .filter((d) => (d.match(pattern_1) ?? []).length)
        .filter((d) => (d.match(pattern_2) ?? []).length)
        .filter((d) => !(d.match(pattern_3) ?? []).length);

    return good.length;
}

console.log(part_1("aeiouu"));

function part_2(input: string) {
    const data = parse_input(input);

    const pattern_1 = new RegExp(/(..).*\1/, "g");

    const pattern_2 = new RegExp(/(.).\1/, "g");

    const good = data
        .filter((d) => (d.match(pattern_1) ?? []).length)
        .filter((d) => (d.match(pattern_2) ?? []).length);

    return good.length;
}

export { part_1, part_2 };
