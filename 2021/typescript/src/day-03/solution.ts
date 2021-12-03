const parse_lines = (input: string) => input.split("\n").filter((l) => l);

type Most = true;

type Least = false;

type Mode = boolean;

const MOST = true;

const LEAST = false;

function bits_fold(bits: string[], mode: Mode) {
    const bit_width = bits[0].length;

    const ones = new Array(bit_width).fill(0);

    const bits_length = bits.length;

    for (let i = 0; i < bit_width; i++) {
        for (let j = 0; j < bits_length; j++) {
            ones[i] += ~~bits[j][i];
        }
    }

    const mcb_fill = mode ? "1" : "0";
    const lcb_fill = mode ? "0" : "1";

    const transformer = (b: number) =>
        b >= bits_length - b ? mcb_fill : lcb_fill;

    return ones.map(transformer).join("");
}

function part_1(input: string) {
    const lines = parse_lines(input);

    const gamma = bits_fold(lines, MOST);

    const epsilon = bits_fold(lines, LEAST);

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function mask_filter(bits: string[], mask: string, mode: Mode) {
    for (let i = 0; i < bits[0].length; i++) {
        const mask = bits_fold(bits, mode);

        bits = bits.filter((l) => {
            return l[i] === mask[i];
        });

        if (bits.length === 1) break;
    }

    return bits;
}

function part_2(input: string) {
    const lines = parse_lines(input);

    const oxys = mask_filter(lines, bits_fold(lines, MOST), MOST);

    const co2s = mask_filter(lines, bits_fold(lines, LEAST), LEAST);

    return parseInt(oxys[0], 2) * parseInt(co2s[0], 2);
}

export { part_1, part_2 };
