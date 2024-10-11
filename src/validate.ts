import Ajv from 'ajv'

const ajv = new Ajv();

// Define custom keyword for grid length validation
ajv.addKeyword('sameRowLength', {
    validate: function (_schema: any, grid: [][]) {
        const rowLength = grid[0].length; // Get the length of the first row
        return grid.every(row => row.length === rowLength); // Check if all rows have the same length
    },
    errors: false,
    keyword: 'ensure that all rows in the grid array have the same length'
});

export const validate = ajv.compile({
    type: 'object',
    properties: {
        grid: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    type: 'integer',
                }
            },
            sameRowLength: true // Custom validation
        },
        start: {
            type: 'array',
            items: {
                type: "integer",
                minimum: 0,
            },
            minItems: 2,
            maxItems: 2
        },
        end: {
            type: 'array',
            items: {
                type: "integer",
                minimum: 0,
            },
            minItems: 2,
            maxItems: 2
        },
    },
    required: ['grid', 'start', 'end'],
    additionalProperties: false,
});