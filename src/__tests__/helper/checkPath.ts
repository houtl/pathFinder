import { Input } from "../../types/input";
import { Output } from "../../types/output";

const isReachable = (grid: number[][], start: [number, number], end: [number, number]): boolean => {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    const visited: boolean[][] = grid.map(row => row.map(() => false));
    const queue: [number, number][] = [start];

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        if (x === end[0] && y === end[1]) {
            return true;
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length && !visited[nx][ny] && grid[nx][ny] === 0) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    return false;
};

export const isOutputValid = (input: Input, output: Output): boolean => {
    const { grid, start, end } = input;
    const { path } = output;

    if (!path) {
        return !isReachable(grid, start, end);
    }

    if (path[0][0] !== start[0] || path[0][1] !== start[1]) {
        return false;
    }

    if (path[path.length - 1][0] !== end[0] || path[path.length - 1][1] !== end[1]) {
        return false;
    }

    for (let i = 1; i < path.length; i++) {
        const [prevX, prevY] = path[i - 1];
        const [currX, currY] = path[i];

        if (grid[currX][currY] === 1) {
            return false;
        }

        const distance = Math.abs(prevX - currX) + Math.abs(prevY - currY);
        if (distance !== 1) {
            return false;
        }
    }

    return true;
};