var buildGrid = function (grid, start, end) {
    var gridContainer = document.getElementById("grid");
    gridContainer.style.gridTemplateColumns = "repeat(".concat(grid[0].length, ", 40px)");
    gridContainer.innerHTML = "";
    grid.forEach(function (row, x) {
        row.forEach(function (cell, y) {
            var div = document.createElement("div");
            div.classList.add("cell");
            if (cell === 1) {
                div.classList.add("obstacle");
            }
            else if (x === start[0] && y === start[1]) {
                div.classList.add("start");
                div.innerText = "S";
            }
            else if (x === end[0] && y === end[1]) {
                div.classList.add("end");
                div.innerText = "E";
            }
            else {
                div.classList.add("walkable");
            }
            div.id = "cell-".concat(x, "-").concat(y);
            gridContainer.appendChild(div);
        });
    });
};
var roadAnimation = function (grid, start, end, path) {
    buildGrid(grid, start, end);
    var currentStep = 0;
    var interval = setInterval(function () {
        var _a = path[currentStep], x = _a[0], y = _a[1];
        var cell = document.getElementById("cell-".concat(x, "-").concat(y));
        if (x !== start[0] || y !== start[1]) {
            if (x === end[0] && y === end[1]) {
                cell.classList.add("end");
            }
            else {
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
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var content = e.target.result;
        var input = JSON.parse(content);
        roadAnimation(input.grid, input.start, input.end, input.path);
    };
    reader.readAsText(file);
});
