import { promises as fs } from "fs";

import path from "path";

import { part_1, part_2 } from "./solution";

test("day-05/part-1", async () => {
    const input = await fs.readFile(
        path.join("static/input", "day-05", "1"),
        "utf-8"
    );

    const expected = ~~(await fs.readFile(
        path.join("static/expected", "day-05", "1"),
        "utf-8"
    ));

    expect(part_1(input)).toBe(expected);
});

test("day-05/part-2", async () => {
    const input = await fs.readFile(
        path.join("static/input", "day-05", "2"),
        "utf-8"
    );

    const expected = ~~(await fs.readFile(
        path.join("static/expected", "day-05", "2"),
        "utf-8"
    ));

    expect(part_2(input)).toBe(expected);
});
