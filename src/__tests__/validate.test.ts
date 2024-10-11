import { validate } from '../validate';

describe('Grid Validation Schema', () => {

    test('valid grid with uniform row length', () => {
        const validData = {
            grid: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0]
            ],
            start: [0, 0],
            end: [2, 2]
        };

        const isValid = validate(validData);
        expect(isValid).toBe(true);
    });

    test('invalid grid with uneven row length', () => {
        const invalidData = {
            grid: [
                [0, 0, 1],
                [0, 1],
                [1, 0, 0]
            ],
            start: [0, 0],
            end: [2, 2]
        };

        const isValid = validate(invalidData);
        expect(isValid).toBe(false);
    });

    test('invalid grid with non-integer values', () => {
        const invalidData = {
            grid: [
                [0, 'a', 1],
                [0, 1, 0],
                [1, 0, 0]
            ],
            start: [0, 0],
            end: [2, 2]
        };

        const isValid = validate(invalidData);
        expect(isValid).toBe(false);
    });

    test('valid start and end positions within grid boundaries', () => {
        const validData = {
            grid: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0]
            ],
            start: [0, 0],
            end: [2, 2]
        };

        const isValid = validate(validData);
        expect(isValid).toBe(true);
    });

    test('invalid start and end positions outside grid boundaries', () => {
        const invalidData = {
            grid: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0]
            ],
            start: [-1, 0], // Invalid position
            end: [2, 3]    // Out of boundary
        };

        const isValid = validate(invalidData);
        expect(isValid).toBe(false);
    });

    test('invalid due to additional properties', () => {
        const invalidData = {
            grid: [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0]
            ],
            start: [0, 0],
            end: [2, 2],
            extra: "invalid"
        };

        const isValid = validate(invalidData);
        expect(isValid).toBe(false);
    });
});
