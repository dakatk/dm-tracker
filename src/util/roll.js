const d = (sides, count) => {
    const value = Math.round(Math.random() * sides) + 1;
    if (value > sides) {
        return sides;
    } else if (value < 1) {
        return 1;
    }
    return value;
}

export default d;