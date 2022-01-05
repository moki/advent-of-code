// option utilities
type None = null | boolean;

type Option<T> = T | None;

const Some = <T>(a?: T) => a ?? false;

const isSome = <T>(a: T) => !!a ?? false;

const None = <T>(a?: T) => false;

const isNone = <T>(a: T) => !a;

// lib parsers start
// parsers
type TokenParser<s, r> = (t: s) => (xs: s) => [r, s];

type StringTokenParser = TokenParser<string, Option<string>>;

const token: StringTokenParser = (t) => (xs) => {
    if (!xs.length) return [None(), xs];

    const mbt = xs.slice(0, t.length);

    return mbt === t ? [t, xs.slice(t.length)] : [None(), xs];
};

type SatisfyParser<s> = (
    p: (s: s, i: number) => boolean
) => (xs: s) => [Option<s>, s];

type StringSatisfyParser = SatisfyParser<string>;

const satisfy: StringSatisfyParser = (p) => (xs) => {
    if (!xs.length) return [None(), xs];

    const mbt = filter(xs, p);

    return mbt ? [mbt, xs.slice(mbt.length)] : [None(), xs];
};

type ParserCombinator<s, r> = (
    ...parsers: ((xs: s) => [r, s])[]
) => (xs: s) => [r[], s];

const combine: ParserCombinator<string, Option<string>> =
    (...parsers) =>
    (xs) =>
        parsers.reduce(
            ([ts, rest], p) => {
                const [token, left] = p(rest);

                return [[...ts, token], left];
            },
            [new Array<Option<string>>(), xs]
        );

const take = (n: number) => (_: string, i: number) => i < n;

// str utilities
const filter = (xs: string, p: (y: string, i: number) => boolean) =>
    xs.split("").filter(p).join("");

// interpretator
// packets values sum
function part_1(input: string): number {
    let code = parse_input(input);

    let packets: Packet[] = [];

    let parsed, old_len, bits_read, skip;

    let i = 0;

    for (;;) {
        old_len = code.length;

        [parsed, code] = packet(code);

        if (isNone(parsed)) break;

        packets.push(parsed as Packet);

        skip = calculate_skip(old_len, code.length);

        for (let j = 0; j < skip; j++) [parsed, code] = padding(code);

        if (isNone(parsed)) break;
    }

    const flatten = (packet: Packet): number =>
        packet.type === "100"
            ? parseInt(packet.version, 2)
            : parseInt(packet.version, 2) +
              (packet as PacketOperator).payload
                  .map(flatten)
                  .reduce((s, v) => (s += v), 0);

    return packets.map(flatten).reduce((s, v) => (s += v), 0);
}

// interpretator
//
// 100 - literal packet
//     - value is the value field
//
// 000 - sum packet
//     - value is the sum of subpackets
//
// 001 - product packet
//     - value is the product of subpackets
//
// 010 - minimum packet
//     - value is the minimum of subpackets
//
// 011 - maximum packet
//     - value is the maximum of subpackets
//
// 101 - greater than packet
//     - value is
//     - 1 if the value of the first subpacket is greater than the second one
//     - 0 otherwise
//
// 110 - less than packet
//     - value is
//     - 1 if the value of the first subpacket is less than the second one
//     - 0 otherwise
//
// 111 - equal to
//     - value is
//     - 1 if the the value of the first subpacket is equal to value of the second one
//     - 0 otherwise
function part_2(input: string) {
    let code = parse_input(input);

    let packets: Packet[] = [];

    let parsed, old_len, bits_read, skip;

    let i = 0;

    for (;;) {
        old_len = code.length;

        [parsed, code] = packet(code);

        if (isNone(parsed)) break;

        packets.push(parsed as Packet);

        skip = calculate_skip(old_len, code.length);

        for (let j = 0; j < skip; j++) [parsed, code] = padding(code);

        if (isNone(parsed)) break;
    }

    const fsum = (a: number, x: number) => (a += x);

    const fprod = (a: number, x: number) => (a *= x);

    const interpret = (packet: Packet): number => {
        const pvmap = (packet: Packet) => {
            switch (packet.type) {
                case "100":
                    return parseInt((packet as PacketLiteral).value, 2);
                default:
                    return interpret(packet);
            }
        };

        switch (packet.type) {
            case "000":
                return (packet as PacketOperator).payload
                    .map(pvmap)
                    .reduce(fsum, 0);
            case "001":
                return (packet as PacketOperator).payload
                    .map(pvmap)
                    .reduce(fprod, 1);
            case "010":
                return Math.min(
                    ...(packet as PacketOperator).payload.map(pvmap)
                );
            case "011":
                return Math.max(
                    ...(packet as PacketOperator).payload.map(pvmap)
                );
            case "101": {
                const [a, b] = (packet as PacketOperator).payload.map(pvmap);

                return ~~(a > b);
            }
            case "110": {
                const [a, b] = (packet as PacketOperator).payload.map(pvmap);

                return ~~(a < b);
            }
            case "111": {
                const [a, b] = (packet as PacketOperator).payload.map(pvmap);

                return ~~(a === b);
            }
            default:
                return parseInt((packet as PacketLiteral).value, 2);
        }
    };

    return packets.map(interpret).reduce(fsum, 0);
}

const parse_input = (input: string) =>
    input.trim().split("").map(hex2bin).join("");

const hex2bin = (hex: string) => parseInt(hex, 16).toString(2).padStart(4, "0");

type Packet = PacketLiteral | PacketOperator;

type PacketLiteral = {
    version: string;
    type: string;
    value: string;
};

type PacketOperator = {
    version: string;
    type: string;
    lid: string;
    len: string;
    payload: Packet[];
};

type Padding = "0";

function calculate_skip(old_len: number, new_len: number) {
    const bits_read = old_len - new_len;

    return (
        (bits_read % 4 ? bits_read + (4 - (bits_read % 4)) : bits_read) -
        bits_read
    );
}

function padding(bits: string): [Option<Padding>, string] {
    if (!bits.length) return [None(), bits];

    let zeroes;

    [zeroes, bits] = token("0")(bits);

    if (isSome(zeroes)) return [zeroes as Option<Padding>, bits];

    return [None(), bits];
}

function packet(bits: string): [Option<Packet>, string] {
    if (!bits.length) return [None(), bits];

    let literal, op0, op1;

    [literal, bits] = packet_literal(bits);
    if (isSome(literal)) return [literal, bits];

    [op0, bits] = packet_op0(bits);
    if (isSome(op0)) return [op0, bits];

    [op1, bits] = packet_op1(bits);
    if (isSome(op1)) return [op1, bits];

    return [None(), bits];
}

const packet_literal = (bits: string): [Option<Packet>, string] => {
    if (!bits.length) return [None(), bits];

    let rest, parsed;

    [parsed, rest] = combine(satisfy(take(3)), token("100"))(bits);

    if (parsed.some(isNone)) return [None(), bits];

    let [version, type] = parsed;

    let groups = [];

    let flag, group;

    for (;;) {
        [flag, rest] = token("1")(rest);

        if (isSome(flag)) {
            [group, rest] = satisfy(take(4))(rest);

            if (isSome(group)) groups.push(group);
        } else {
            [[flag, group], rest] = combine(
                satisfy(take(1)),
                satisfy(take(4))
            )(rest);

            if (isSome(group)) groups.push(group);

            break;
        }
    }

    return [
        {
            version: version as string,
            type: type as string,
            value: groups.join(""),
        },
        rest,
    ];
};

const packet_op0 = (bits: string): [Option<Packet>, string] => {
    if (!bits.length) return [None(), bits];

    let rest, parsed, old_len, skip;

    old_len = bits.length;

    [parsed, rest] = combine(
        satisfy(take(3)),
        satisfy(take(3)),
        token("0"),
        satisfy(take(15))
    )(bits);

    if (parsed.some(isNone)) return [None(), bits];

    const [version, type, lid, len] = parsed;

    const nbits = parseInt(len as string, 2);

    const payload: Option<Packet>[] = [];

    for (let i = 0; i < nbits; ) {
        old_len = rest.length;

        [parsed, rest] = packet(rest);

        i += old_len - rest.length;

        if (isNone(parsed)) return [None(), bits];

        payload.push(parsed);
    }

    return [
        {
            version: version as string,
            type: type as string,
            lid: lid as string,
            len: len as string,
            payload: payload as Packet[],
        },
        rest,
    ];
};

const packet_op1 = (bits: string): [Option<Packet>, string] => {
    if (!bits.length) return [None(), bits];

    let parsed, rest, old_len, skip;

    old_len = bits.length;

    [parsed, rest] = combine(
        satisfy(take(3)),
        satisfy(take(3)),
        token("1"),
        satisfy(take(11))
    )(bits);

    if (parsed.some(isNone)) return [None(), bits];

    const [version, type, lid, len] = parsed;

    const nsubs = parseInt(len as string, 2);

    const payload: Option<Packet>[] = [];

    for (let i = 0; i < nsubs; i++) {
        old_len = rest.length;

        [parsed, rest] = packet(rest);

        if (isNone(parsed)) return [None(), bits];

        payload.push(parsed);
    }

    return [
        {
            version: version as string,
            type: type as string,
            lid: lid as string,
            len: len as string,
            payload: payload as Packet[],
        },
        rest,
    ];
};

export { part_1, part_2 };
