const buildGrid = (
    grid: number[][],
    start: [number, number],
    end: [number, number]
) => {
    const gridContainer = document.getElementById("grid")!;
    gridContainer.style.gridTemplateColumns = `repeat(${grid[0].length}, 40px)`;
    gridContainer.innerHTML = "";

    grid.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell");

            if (cell === 1) {
                div.classList.add("obstacle");
            } else if (x === start[0] && y === start[1]) {
                div.classList.add("start");
                div.innerText = "S";
            } else if (x === end[0] && y === end[1]) {
                div.classList.add("end");
                div.innerText = "E";
            } else {
                div.classList.add("walkable");
            }

            div.id = `cell-${x}-${y}`;
            gridContainer.appendChild(div);
        });
    });
};

const roadAnimation = (
    grid: number[][],
    start: [number, number],
    end: [number, number],
    path: [number, number][]
) => {
    buildGrid(grid, start, end);
    let currentStep = 0;

    const interval = setInterval(() => {
        const [x, y] = path[currentStep];
        const cell = document.getElementById(`cell-${x}-${y}`)!;

        if (x !== start[0] || y !== start[1]) {
            if (x === end[0] && y === end[1]) {
                cell.classList.add("end");
            } else {
                cell.classList.add("path");
            }
        }

        currentStep++;

        if (currentStep >= path.length) {
            clearInterval(interval);
            console.log("Finished!");
        }
    }, 500);
};

document
    .getElementById("fileInput")!
    .addEventListener("change", function (event) {
        const file = (event.target as HTMLInputElement).files![0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target!.result as string;
            const input = JSON.parse(content);
            roadAnimation(input.grid, input.start, input.end, input.path);
        };

        reader.readAsText(file);
    });
