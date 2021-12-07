import { md5 } from "../../lib/md5";

const parse_input = (input: string) => input.trim();

async function with_zeroes(
    seed: string,
    suffix: number,
    zeroes: number,
    chunk_size: number,
    found: boolean
): Promise<number> {
    if (found) return suffix;

    const hashes = await Promise.all(
        new Array(chunk_size)
            .fill(0)
            .map(async (_, i) => md5(seed + (suffix + i)))
    );

    const fits = hashes.filter(
        (s) => s.slice(0, zeroes) === "0".repeat(zeroes)
    );

    if (fits.length)
        return with_zeroes(
            seed,
            suffix + hashes.indexOf(fits[0]),
            zeroes,
            chunk_size,
            true
        );

    return with_zeroes(seed, suffix + chunk_size, zeroes, chunk_size, found);
}

async function part_1(input: string) {
    const data = parse_input(input);

    const chunk_size = 50000;

    const found = await with_zeroes(data, 0, 5, chunk_size, false);

    return found;
}

async function part_2(input: string) {
    const data = parse_input(input);

    const chunk_size = 100000;

    const found = await with_zeroes(data, 0, 6, chunk_size, false);

    return found;
}

export { part_1, part_2 };
