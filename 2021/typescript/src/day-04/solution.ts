type Cell = { n: number; s: boolean };

type Deck = Cell[];

type Input = {
    moves: number[];

    decks: Deck[];
};

const M = 5;
const N = 5;

function parse_lines(input: string) {
    const raw = input.split("\n\n");

    return {
        moves: raw[0]
            .split(",")
            .filter((t) => t)
            .map((n) => ~~n),
        decks: raw.slice(1).map((d: string) =>
            d
                .replaceAll("\n", " ")
                .split(" ")
                .filter((t) => t)
                .map((m) => ({ n: ~~m, s: false }))
        ),
    };
}

function check_deck_condition(deck: Deck) {
    for (let i = 0; i < N; i++) {
        let condition = true;

        for (let j = 0; j < M; j++) condition = condition && deck[i * N + j].s;

        if (condition) return condition;
    }

    for (let i = 0; i < M; i++) {
        let condition = true;

        for (let j = i; j < N * M; j += M) condition = condition && deck[j].s;

        if (condition) return condition;
    }

    return false;
}

function set_number_in_deck(deck: Deck, n: number) {
    for (let i = 0; i < deck.length; i++)
        deck[i] = deck[i].n === n ? { n: deck[i].n, s: true } : deck[i];

    return deck;
}

function calculate_score(deck: Deck, n: number) {
    return (
        deck.filter(({ n, s }: Cell) => !s).reduce((a, { n }) => a + n, 0) * n
    );
}

function part_1(input: string) {
    const { moves, decks }: Input = parse_lines(input);

    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < decks.length; j++) {
            decks[j] = set_number_in_deck(decks[j], moves[i]);

            const won = check_deck_condition(decks[j]);

            if (won) return calculate_score(decks[j], moves[i]);
        }
    }
}

function part_2(input: string) {
    const { moves, decks }: Input = parse_lines(input);

    const winners = [];

    const skip: number[] = [];

    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < decks.length; j++) {
            if (skip.includes(j)) continue;

            decks[j] = set_number_in_deck(decks[j], moves[i]);

            const won = check_deck_condition(decks[j]);

            if (won) {
                winners.push(calculate_score(decks[j], moves[i]));

                skip.push(j);
            }
        }
    }

    return winners[winners.length - 1];
}

export { part_1, part_2 };
