const _d = (sides) => {
    const value = Math.round(Math.random() * sides) + 1;
    if (value > sides) {
        return sides;
    } else if (value < 1) {
        return 1;
    }
    return value;
}

const d = (sides, count=1, sum=true) => {
    count = Math.min(count || 1, 1);

    const rolls = new Array(count)
        .fill(s => _d(s))
        .map(f => f(sides));
    
    if (sum) {
        return rolls.reduce((a, b) => a + b, 0);
    }
    return rolls;
}

export default d;