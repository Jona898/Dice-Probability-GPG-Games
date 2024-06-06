export function range(size: number, startAt: number = 0): Array<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}


export class Dice {
    static FromSides(numberOfSides: number, startValue = 1): Dice {
        return new this(range(numberOfSides, startValue))
    }

    constructor(_sides: number[]) {
        this.sides = _sides.sort((a, b) => a - b)
    }

    sides: number[]
}