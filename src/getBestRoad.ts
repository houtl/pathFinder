import { Input } from "./types/input";

interface TheNode {
    x: number;
    y: number;
    g: number; // move distance
    h: number; // real distance
    f: number; // g + h
    parent?: TheNode; // last node
}

const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1]   // right
];

// manhattan distance
function distance(a: [number, number], b: [number, number]): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const getBestRoad = (input: Input): [number, number][] | null => {
    const { grid, start, end } = input;
    const openSet: TheNode[] = [];
    const closedSet: boolean[][] = Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(false));

    const startNode: TheNode = { x: start[0], y: start[1], g: 0, h: distance(start, end), f: distance(start, end) };
    openSet.push(startNode);

    while (openSet.length > 0) {
        // find the node of less f
        openSet.sort((a, b) => a.f - b.f);
        const currentNode = openSet.shift()!;

        // is end?
        if (currentNode.x === end[0] && currentNode.y === end[1]) {
            let path: [number, number][] = [];
            let tmp: TheNode | undefined = currentNode;

            while (tmp) {
                path.push([tmp.x, tmp.y]);
                tmp = tmp.parent;
            }

            return path.reverse(); // return the path from start to end
        }

        // check every neighbor
        for (const direction of directions) {
            const neighborX = currentNode.x + direction[0];
            const neighborY = currentNode.y + direction[1];

            // check the neighbor is visited or overboard
            if (neighborX < 0 || neighborX >= grid.length || neighborY < 0 || neighborY >= grid[0].length || grid[neighborX][neighborY] === 1 || closedSet[neighborX][neighborY]) {
                continue;
            }

            const gScore = currentNode.g + 1; // neighbor's g

            //neighbor in openSet ? update(g, f, parent) : add to openSet
            let neighbor = openSet.find(n => n.x === neighborX && n.y === neighborY);
            if (!neighbor) {
                neighbor = { x: neighborX, y: neighborY, g: gScore, h: distance([neighborX, neighborY], end), f: 0, parent: currentNode };
                neighbor.f = neighbor.g + neighbor.h;
                openSet.push(neighbor);
            }

            if (gScore < neighbor.g) {
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = currentNode;
            }
        }

        // mark as visited
        closedSet[currentNode.x][currentNode.y] = true;
    }

    return null; // If not path is found, "path" must be null.
}

export { getBestRoad }