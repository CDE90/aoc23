// Path: 2/solution.ts

export function part1(input: string) {
    const maxR = 12;
    const maxG = 13;
    const maxB = 14;

    const lines = input.split("\n");

    let invalidSum = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.substring(line.indexOf(":") + 1);

        let isInvalid = false;

        for (const config of line.split(";")) {
            const redIndex = config.indexOf("red");
            const greenIndex = config.indexOf("green");
            const blueIndex = config.indexOf("blue");

            if (redIndex !== -1) {
                const redValue = parseInt(
                    config.substring(redIndex - 3, redIndex - 1).trim()
                );
                if (redValue > maxR && !isInvalid) {
                    invalidSum += i + 1;
                    isInvalid = true;
                }
            }
            if (greenIndex !== -1) {
                const greenValue = parseInt(
                    config.substring(greenIndex - 3, greenIndex - 1).trim()
                );
                if (greenValue > maxG && !isInvalid) {
                    invalidSum += i + 1;
                    isInvalid = true;
                }
            }
            if (blueIndex !== -1) {
                const blueValue = parseInt(
                    config.substring(blueIndex - 3, blueIndex - 1).trim()
                );
                if (blueValue > maxB && !isInvalid) {
                    invalidSum += i + 1;
                    isInvalid = true;
                }
            }
        }
    }

    const validSum = (lines.length * (lines.length + 1)) / 2 - invalidSum;

    return validSum;
}

export function part2(input: string) {
    const lines = input.split("\n");

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        let maxR = 0;
        let maxG = 0;
        let maxB = 0;

        let line = lines[i];
        line = line.substring(line.indexOf(":") + 1);

        for (const config of line.split(";")) {
            const redIndex = config.indexOf("red");
            const greenIndex = config.indexOf("green");
            const blueIndex = config.indexOf("blue");

            if (redIndex !== -1) {
                const redValue = parseInt(
                    config.substring(redIndex - 3, redIndex - 1).trim()
                );
                if (redValue > maxR) {
                    maxR = redValue;
                }
            }
            if (greenIndex !== -1) {
                const greenValue = parseInt(
                    config.substring(greenIndex - 3, greenIndex - 1).trim()
                );
                if (greenValue > maxG) {
                    maxG = greenValue;
                }
            }
            if (blueIndex !== -1) {
                const blueValue = parseInt(
                    config.substring(blueIndex - 3, blueIndex - 1).trim()
                );
                if (blueValue > maxB) {
                    maxB = blueValue;
                }
            }
        }

        const gamePower = maxR * maxG * maxB;
        sum += gamePower;
    }

    return sum;
}

const input = await Bun.file("./2/input.txt").text();

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
