
import { parseArgs } from "node:util";
import { outputFile, readFile } from "./readWriteFile";
import { validate } from "./validate";
import { getBestRoad } from "./getBestRoad";
import { Input } from "./types/input";

export const pathFinder = () => {
    const options = {
        config: {
            type: 'string',
            short: 'c'
        },
        output: {
            type: 'string',
            short: 'o'
        }
    } as const

    const optionHelp = 'valid Option: \n  --config, -c: path of a valid json file.\n  --output, -o: path of the output file, "\./output.json" by default.'

    let values: { config: string, output: string } = { config: '', output: '' }

    try {
        values = (parseArgs({ args: process.argv.slice(2), options }).values) as { config: string, output: string }
    } catch (error) {
        console.debug(error)
        console.info(optionHelp)
    }

    const { config, output: outputPath } = values
    if (!config || config.length === 0) {
        throw new Error(`Not a valid config.\n ${optionHelp}`)
    }
    console.debug(config)

    const input = readFile(config)

    if (!validate(input)) {
        console.info(`Input data error, file path: ${config}`, validate.errors)
    }

    const path = getBestRoad(input as Input)

    try {
        outputFile(outputPath, path)
    } catch (error) {
        console.debug(error)
        console.info('valid Option: \n--config, -c: path of a valid json file')
    }
    return path
}

if (require.main === module) {
    pathFinder();
}
