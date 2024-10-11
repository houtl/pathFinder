# Astraveus Technical Test Subject

## Objective

The objective of this technical test is to assess the candidate's proficiency in JavaScript programming, particularly in implementing pathfinding algorithms.
The task involves reading a grid from a JSON file and finding the path from a starting point to a destination.

## Task Description

You are required to write a JavaScript program that reads a grid from an input JSON file.
The grid consists of cells, each of which can either be open (you can walk through) or blocked (you cannot walk through).
The program should find the path from the start position to the end position, if such a path exists.

## Requirements

- Implement the pathfinding algorithm using JavaScript (Node Framework allowed).
- The program should read the input grid from a JSON file.
- The program should output the path as a list of coordinates (if a path exists) or indicate that no path exists.

### Input

The input is a json file containing a grid, a start point and a end point.
The output is also a json file containing the output path in coordinate array.

Input example:
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

Output example:
```json
{
  "path": [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [3, 3]]
}
```

If not path is found, "path" must be null.

## Constraints

- You can move in 4 possible directions: up, down, left, and right.
- You cannot move diagonally.
- The grid is represented as a 2D array of cells, where 0 denotes an open cell and 1 denotes a blocked cell.
- The start and end positions are guaranteed to be open cells.
- You cannot change the input/output formatting.
- The output file must be written next to the application (current app directory).
- The app must be called 'path_finder'.
- The input file path will be given in parameter of the application by the option "--config".

## You can

- You can use tools or external libraries as you wish except for the algorithm implementation.
- You can deliver the technical test in any way you like (it's part of the evaluation).
- You can use the js/Node.js version/platform you like.

The subject is vague on some parts for a specific reason, we are waiting to see if the candidate has the expected reflexes.

## Bonus

- Json input and output is share using a RestAPI.
- The app is dockerized
- Whatever you have in mind.