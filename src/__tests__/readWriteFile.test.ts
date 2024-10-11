import fs from 'node:fs';
import path from 'node:path';
import { readFile, outputFile } from '../readWriteFile'
// Mocking the fs module
jest.mock('node:fs');

describe('File Operations', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock specific fs functions with jest.fn()
        fs.readFileSync = jest.fn();
        fs.existsSync = jest.fn();
        fs.mkdirSync = jest.fn();
        fs.writeFileSync = jest.fn();
    });

    const filePath = './map/easy.json'
    const fileContent = {
        "grid": [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        "start": [0, 0],
        "end": [3, 2]
    }


    describe('readFile', () => {
        it('should read and parse a valid JSON file', () => {

            // Simulate readFileSync behavior
            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(fileContent));

            const result = readFile(filePath);

            expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
            expect(result).toEqual(fileContent);
        });

        it('should throw an error if file reading fails', () => {
            const filePath = './invalid.json';

            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('File not found');
            });

            expect(() => readFile(filePath)).toThrow(`Failed to read the file ${filePath}`);
        });

        it('should throw an error for invalid JSON content', () => {
            const invalidContent = '{"key": value}'; // Invalid JSON

            (fs.readFileSync as jest.Mock).mockReturnValue(invalidContent);

            expect(() => readFile(filePath)).toThrow("");
        });
    });

    describe('outputFile', () => {
        it('should write the output file correctly when path exists', () => {
            const outputPath = './output/result.json';
            const mockPath: [number, number][] = [[0, 0], [1, 0], [2, 0]];

            // Mock that the directory already exists
            (fs.existsSync as jest.Mock).mockReturnValue(true);

            outputFile(outputPath, mockPath);

            expect(fs.existsSync).toHaveBeenCalledWith(path.dirname(outputPath));
            expect(fs.writeFileSync).toHaveBeenCalledWith(
                outputPath,
                expect.any(String) // We'll test the content format next
            );
        });

        it('should create the directory if it does not exist and write the output file', () => {
            const outputPath = './output/result.json';
            const mockPath: [number, number][] = [[0, 0], [1, 0], [2, 0]];

            // Mock that the directory does not exist
            (fs.existsSync as jest.Mock).mockReturnValue(false);

            outputFile(outputPath, mockPath);

            expect(fs.mkdirSync).toHaveBeenCalledWith(path.dirname(outputPath), { recursive: true });
            expect(fs.writeFileSync).toHaveBeenCalled();
        });

        it('should replace commas with ", " in the output JSON', () => {
            const outputPath = './output/result.json';
            const mockPath: [number, number][] = [[0, 0], [1, 0], [2, 0]];

            outputFile(outputPath, mockPath);

            const expectedContent = '{\n  \"path\": [[0, 0], [1, 0], [2, 0]]\n}'

            expect(fs.writeFileSync).toHaveBeenCalledWith(outputPath, expectedContent);
        });

        it('should handle null path in output file', () => {
            const outputPath = './output/result.json';
            const mockPath = null;

            outputFile(outputPath, mockPath);

            const expectedContent = JSON.stringify({ path: 'null' }, null, 2).replace(/\"(?=(\[|\n))/g, '');

            expect(fs.writeFileSync).toHaveBeenCalledWith(outputPath, expectedContent);
        });

        it('should handle null path in output file', () => {
            const outputPath = '';
            const mockPath = null;

            outputFile(outputPath, mockPath);

            const expectedContent = JSON.stringify({ path: 'null' }, null, 2).replace(/\"(?=(\[|\n))/g, '');

            expect(fs.writeFileSync).toHaveBeenCalledWith('./output.json', expectedContent);
        });

        it('should log an error if writing the output file fails', () => {
            const outputPath = './output/result.json';
            const mockPath: [number, number][] = [[0, 0], [1, 0], [2, 0]];

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            (fs.writeFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('Write failed');
            });

            outputFile(outputPath, mockPath);

            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed writing output file:', expect.any(Error));
        });
    });
});
