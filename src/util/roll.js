const _d = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
}

const d = (sides, count=1, sum=true) => {
    count = Math.min(count || 1, 1);
    sides = Math.floor(sides);

    const rolls = new Array(count)
        .fill(s => _d(s))
        .map(f => f(sides));
    
    if (sum) {
        return rolls.reduce((a, b) => a + b, 0);
    }
    return rolls;
}

const diceOptions = [
    3, 4, 5, 6, 7, 8, 9, 
    10, 11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20
];

export { d, diceOptions }
