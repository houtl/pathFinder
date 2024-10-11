import { getBestRoad } from '../getBestRoad';
import { Input } from '../types/input';
import { isOutputValid } from './helper/checkPath';

describe('getBestRoad', () => {
    it('should find the best road for a simple grid', () => {
        const input: Input = {
            grid: [
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1],
                [1, 0, 0, 0]
            ],
            start: [0, 0],
            end: [3, 3]
        };

        const result = getBestRoad(input);
        expect(isOutputValid(input, { path: result })).toEqual(true);
    });

    it('should return null if there is no possible path', () => {
        const input: Input = {
            grid: [
                [0, 1, 1, 0],
                [1, 1, 1, 0],
                [0, 1, 1, 1],
                [1, 0, 0, 1]
            ],
            start: [0, 0],
            end: [3, 3]
        };

        const result = getBestRoad(input);
        expect(result).toBeNull();
    });

    it('should handle grid with only one valid path', () => {
        const input: Input = {
            grid: [
                [0, 1, 1, 1],
                [0, 0, 0, 1],
                [1, 1, 0, 1],
                [1, 0, 0, 0]
            ],
            start: [0, 0],
            end: [3, 3]
        };

        const result = getBestRoad(input);
        expect(isOutputValid(input, { path: result })).toEqual(true);
    });

    it('should handle a start and end point at the same position', () => {
        const input: Input = {
            grid: [
                [0, 1],
                [0, 0]
            ],
            start: [1, 1],
            end: [1, 1]
        };

        const expectedPath = [[1, 1]];

        const result = getBestRoad(input);
        expect(result).toEqual(expectedPath);
    });

    it('should handle large grids efficiently', () => {
        const input: Input = {
            grid: Array(50).fill(0).map(() => Array(50).fill(0)),
            start: [0, 0],
            end: [49, 49]
        };

        const result = getBestRoad(input);
        expect(result).not.toBeNull();
    });
});