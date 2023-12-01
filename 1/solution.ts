// Path: 1/solution.ts

export function part1(input: string) {
    let sum = 0;

    for (const line of input.split("\n")) {
        let first = -1;
        let last = -1;

        // get all numbers in the string
        const numbers = line.matchAll(/\d/g);
        for (const number of numbers) {
            if (first === -1) {
                first = parseInt(number[0]);
            } else {
                last = parseInt(number[0]);
            }
        }

        if (last === -1) {
            last = first;
        }
        const innerSum = parseInt(`${first}${last}`);

        sum += innerSum;
    }

    return sum;
}

const betterParseInt = (str: string) => {
    switch (str) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        default:
            return parseInt(str);
    }
};

export function part2(input: string) {
    let sum = 0;

    let newInput = input
        .replaceAll("oneight", "oneeight")
        .replaceAll("threeight", "threeeight")
        .replaceAll("fiveight", "fiveeight")
        .replaceAll("nineight", "nineeight")
        .replaceAll("sevenine", "sevennine")
        .replaceAll("twone", "twoone")
        .replaceAll("eightwo", "eighttwo")
        .replaceAll("eighthree", "eightthree");

    for (const line of newInput.split("\n")) {
        let first = -1;
        let last = -1;

        // get all numbers in the string
        const numbers = line.matchAll(
            /\d|zero|one|two|three|four|five|six|seven|eight|nine/g
        );
        for (const number of numbers) {
            if (first === -1) {
                first = betterParseInt(number[0]);
            } else {
                last = betterParseInt(number[0]);
            }
        }

        if (last === -1) {
            last = first;
        }
        const innerSum = parseInt(`${first}${last}`);

        sum += innerSum;
    }

    return sum;
}

const input = await Bun.file("./1/input.txt").text();

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
