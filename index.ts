import minimist from "minimist";
import { mkdir, exists } from "node:fs/promises";

const args = minimist(process.argv.slice(2));

const year = args.year ?? new Date().getFullYear();
const day = args.day ?? new Date().getDate();

const doCreate = args.new ?? false;
const doRun = args.run ?? false;

if (doCreate) {
    await create(year, day);
} else if (doRun) {
    await run(day);
} else {
    console.log("No command specified. Use --new or --run");
}

async function create(year: any, day: any) {
    // create a new directory for the day
    await mkdir(`${day}`, { recursive: true });

    // read the AOC_SESSION environment variable
    const session = process.env.AOC_SESSION;

    // create the input file if it doesn't exist
    const inputPath = `${day}/input.txt`;

    const fetchInput = async (year: any, day: any, session?: string) => {
        const url = `https://adventofcode.com/${year}/day/${day}/input`;
        const response = await fetch(url, {
            headers: {
                cookie: `session=${session}`,
            },
        });

        return await response.text();
    };

    if (!(await exists(inputPath))) {
        const input = await fetchInput(year, day, session);
        Bun.write(inputPath, input);
    }

    // create the solution file if it doesn't exist
    const solutionPath = `${day}/solution.ts`;

    if (!(await exists(solutionPath))) {
        let template = await Bun.file("./template.ts").text();
        template = template.replaceAll("{day}", `${day}`);
        Bun.write(solutionPath, template);
    }

    // log a message to the console
    console.log(`Created ${solutionPath} and ${inputPath}`);
}

async function run(day: string | number) {
    const solutionPath = `./${day}/solution.ts`;

    const proc = Bun.spawn(["bun", "run", solutionPath]);

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();

    if (output) {
        console.log(output);
    } else if (error) {
        console.error(error);
    }
}
