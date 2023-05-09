const button = document.getElementById("draw");
const container = document.getElementById("container");

const gridSize = prompt("Enter size");

button.addEventListener("click", draw)

function draw(e) {
    for (let i = 1; i <= (gridSize * gridSize); i++) {
        const item = document.createElement("div");
        item.setAttribute("class", "container-items");
        item.style.width = `${(container.clientWidth) / gridSize}px`;
        item.style.height = `${(container.clientHeight) / gridSize}px`;
        container.appendChild(item);
    }
}
