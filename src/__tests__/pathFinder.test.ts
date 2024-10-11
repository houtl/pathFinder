import { readFile, outputFile } from '../readWriteFile';
import { pathFinder } from '../pathFinder';
import { getBestRoad } from '../getBestRoad';
import { validate } from '../validate';
import { parseArgs } from 'node:util';

jest.mock('../readWriteFile');
jest.mock('../getBestRoad');
jest.mock('../validate');
jest.mock('node:util', () => ({
    ...jest.requireActual('node:util'),
    parseArgs: jest.fn()
}));

describe('pathFinder', () => {
    let mockArgs: { config: string, output: string };
    const logSpy = jest.spyOn(global.console, 'info');

    beforeEach(() => {
        jest.clearAllMocks();

        // Simulez les arguments de ligne de commande avec des valeurs valides
        mockArgs = { config: './test.json', output: './output.json' };
        (parseArgs as jest.Mock).mockReturnValue({ values: mockArgs });

        // Mock input data
        (readFile as jest.Mock).mockReturnValue({
            grid: [
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1],
                [1, 0, 0, 0]
            ],
            start: [0, 0],
            end: [3, 3]
        });

        // Mock validation success
        const mockedValidate = validate as any as jest.Mock;
        mockedValidate.mockReturnValue(true);

        // Mock the best path
        (getBestRoad as jest.Mock).mockReturnValue([
            [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [3, 3]
        ]);
    });

    it('should call readFile, validate input, find the path, and write to output file', () => {
        pathFinder();

        // Check if readFile was called with the correct config file
        expect(readFile).toHaveBeenCalledWith(mockArgs.config);

        // Check if validate was called with the input from readFile
        expect(validate).toHaveBeenCalledWith({
            grid: [
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1],
                [1, 0, 0, 0]
            ],
            start: [0, 0],
            end: [3, 3]
        });

        // Check if getBestRoad was called with the correct input
        expect(getBestRoad).toHaveBeenCalledWith({
            grid: [
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1],
                [1, 0, 0, 0]
            ],
            start: [0, 0],
            end: [3, 3]
        });

        // Check if outputFile was called with the correct output path and the found path
        expect(outputFile).toHaveBeenCalledWith(mockArgs.output, [
            [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [3, 3]
        ]);
    });

    it('should throw an error if config is not provided', () => {
        // Simulate missing config
        (parseArgs as jest.Mock).mockReturnValue({ values: { config: '', output: './output.json' } });

        expect(() => pathFinder()).toThrow('Not a valid config');
    });

    it('should throw an error if config is not provided', () => {
        // Simulate missing config
        (parseArgs as jest.Mock).mockImplementation(() => {
            throw new Error('get args failed');
        });

        expect(() => pathFinder()).toThrow('Not a valid config');
    });

    it('should handle input validation errors', () => {
        // Simulate validation failure
        (validate as any as jest.Mock).mockReturnValue(false);

        pathFinder();

        // Check if the validation errors are logged
        expect(logSpy).toHaveBeenCalledWith(
            'Input data error, file path: ./test.json',
            null // The actual validation errors will be logged
        );
    });

    it('should handle output file writing errors', () => {
        // Simulate error in writing the output file
        (outputFile as jest.Mock).mockImplementation(() => {
            throw new Error('File write error');
        });

        pathFinder();

        // Check if the error message is logged
        expect(logSpy).toHaveBeenCalledWith('valid Option: \n--config, -c: path of a valid json file');
    });
});