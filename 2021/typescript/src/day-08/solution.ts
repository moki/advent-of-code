const parse_input = (input: string) => input.trim().split("\n");

const is_one = (s: string) => s.length === 2;

const is_four = (s: string) => s.length === 4;

const is_seven = (s: string) => s.length === 3;

const is_eight = (s: string) => s.length === 7;

function part_1(input: string) {
    const data = parse_input(input).flatMap((l) =>
        l.split("|")[1].trim().split(" ")
    );

    const filtered = data.filter(
        (d) => is_one(d) || is_four(d) || is_seven(d) || is_eight(d)
    );

    return filtered.length;
}

function part_2(input: string) {
    const data = parse_input(input);

    const seq = data.map((a) => a.split("|").map((b) => b.trim().split(" ")));

    let sum = 0;

    for (const [signal, display] of seq) {
        const map = new Array(10).fill("");

        map[1] = signal.find(is_one);

        map[4] = signal.find(is_four);

        map[7] = signal.find(is_seven);

        map[8] = signal.find(is_eight);

        const s253 = signal.filter((s) => s.length === 5);

        map[3] = s253.find((s) =>
            map[1].split("").every((m: string) => s.includes(m))
        );

        map[5] = s253.find((s) => {
            const a = s.split("").filter((n) => map[4].includes(n));

            return s !== map[3] && a.length === 3;
        });

        map[2] = s253.find((s) => {
            return s !== map[3] && s !== map[5];
        });

        const s069 = signal.filter((s) => s.length === 6);

        const set245 = [
            ...map[4].split(""),
            ...map[5].split(""),
            ...map[2].split(""),
        ];

        set245.sort();

        const mid = set245.find(
            (n, i) => i + 2 < set245.length && set245[i + 2] === n
        );

        map[0] = s069.find((s) => {
            const missing = map[8]
                .split("")
                .filter((n: string) => !s.includes(n));

            return missing.length === 1 && missing[0] === mid;
        });

        map[9] = s069.find((s) => {
            const intersect = s.split("").filter((n) => map[1].includes(n));

            return s !== map[0] && intersect.length === 2;
        });

        map[6] = s069.find((s) => s !== map[0] && s !== map[9]);

        const values = display.map((d) =>
            map.findIndex(
                (m, i) =>
                    d.split("").sort().join("") === m.split("").sort().join("")
            )
        );

        sum += parseInt(values.join(""));
    }

    return sum;
}

export { part_1, part_2 };
