import fs from 'node:fs'
import filePath from 'node:path';

export const readFile = (path: string): Object => {
    try {
        const jsonString = fs.readFileSync(path, 'utf-8');

        return (JSON.parse(jsonString))
    } catch (error) {
        console.debug(error)
        throw new Error(`Failed to read the file ${path}`)
    }
}

export const outputFile = (outputPath: string, path: [number, number][] | null): void => {
    try {
        if (!outputPath || outputPath.length === 0)
            outputPath = './output.json'
        const dirname = filePath.dirname(outputPath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify({ path: JSON.stringify(path).replace(/,/g, ', ') }, null, 2).replace(/\"(?=(\[|\n))/g, ''))
        console.info('Output written to:', outputPath);
    } catch (err) {
        console.error('Failed writing output file:', err);
    }

}