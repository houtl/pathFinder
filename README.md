# Path Finder

## Overview

This project implements a pathfinding algorithm in JavaScript to solve the problem of navigating a grid from a starting point to an end point. The program reads the grid from a JSON input file and determines the path between two points if it exists. The output is either the path as a list of coordinates or a message indicating that no path exists.

## Task Description

The application, called `path_finder`, reads a grid from an input JSON file where:

- **0** represents open cells (walkable).
- **1** represents blocked cells (non-walkable).

The goal is to find the path from a specified start position to an end position, moving up, down, left, or right. If a path is found, the program outputs the coordinates of the path as an array; otherwise, it outputs `null`.

## Requirements

- **Algorithm**: Implement a pathfinding algorithm (e.g., BFS or DFS).
- **Input**: JSON file containing the grid, start, and end points.
- **Output**: JSON file with the path as an array of coordinates or `null` if no path exists.
- **Movement**: Only allowed to move in four directions (up, down, left, right).

### Example Input:

```json
{
  "grid": [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0]
  ],
  "start": [0, 0],
  "end": [3, 3]
}
```

### Example Output (if path exists):

```json
{
  "path": [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [3, 3]]
}
```

### Example Output (if no path exists):

```json
{
  "path": null
}
```

## How to Use

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/path_finder.git
   cd path_finder
   ```

2. Install dependencies and build the project:

   ```bash
   yarn install
   yarn build
   ```

### Running the App

To run the `path_finder` app, use the following command, specifying the input file path with the `--config` option:

```bash
yarn start --config [FilePath] --output (optional) [OutputFilePath]
```

This will output a JSON file with the path or `null` if no path exists, in the current application directory.

## More Features

- **REST API**: The app can be extended to accept JSON input/output via a REST API.

  ```bash
  yarn startApi
  ```

- **Dockerized**: The app can be containerized using Docker for easier deployment.

  ```bash
  docker build -t pathfinder-api .
  docker run -p 3000:3000 pathfinder-api
  ```

- **2D Map Showing Path Solution**: Open `graph/index.html` in a browser and load the JSON input file containing the grid, start, end, and path.
