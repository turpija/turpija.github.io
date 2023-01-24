function createGridContainer() {
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gridContainer.style.height = "500px";
    gridContainer.style.width = "500px";
    document.body.appendChild(gridContainer);
    return gridContainer;
}

function layoutGrid (container,width) {
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`
    // container.style.gridTemplateRows = `repeat(${height}, 1fr)`
}

function createDivs(num) {
    gridContainer.replaceChildren();
    for (let i = 0; i < num * num; i++) {
        const cell = document.createElement("div");
        // cell.style.backgroundColor = "rgb(225, 225, 225)";
        // cell.style.height = "100%";
        // cell.style.width = "100%";
        cell.classList.add("clear");
        gridContainer.append(cell);
        cell.addEventListener("mouseover", onHover)
    }
}

function onHover(e) {
    // console.log(e.target.classList);
    // e.target.style.backgroundColor = "rgb(70, 70, 70)";
    e.target.classList.remove("clear");
    e.target.classList.add("hoverOver");
}

function changeGrid(e) {
    // console.log(e.target.value);
    const sliderLabel = document.querySelector("#sliderLabel");
    sliderLabel.textContent = `${e.target.value}x${e.target.value}`;
    createDivs(e.target.value);
    layoutGrid(gridContainer,e.target.value);
}

function clearGrid (){
    gridContainer.childNodes.forEach(function (node) {
        node.classList.remove("hoverOver");
        node.classList.add("clear");
    });
}

const gridContainer = createGridContainer();

document.querySelector("#slider").addEventListener("change", changeGrid);
document.querySelector("#clearBtn").addEventListener("click", clearGrid);

layoutGrid(gridContainer,slider.value);
createDivs(slider.value);