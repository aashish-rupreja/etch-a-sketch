const button = document.getElementById("draw");
const container = document.getElementById("container");

let items;

const gridSize = 16;

for (let i = 1; i <= (gridSize * gridSize); i++) {
    const item = document.createElement("div");
    item.setAttribute("class", "container-items");
    item.style.width = `${(container.clientWidth) / gridSize}px`;
    item.style.height = `${(container.clientHeight) / gridSize}px`;
    container.appendChild(item);
}
container.addEventListener("mousedown", containerEvent => {
    items = Array.from(document.getElementsByClassName("container-items"));
    items.forEach(item => item.addEventListener("mouseover", color));
});
container.addEventListener("mouseup", containerEvent => {
    items.forEach(item => item.removeEventListener("mouseover", color));
});

function color(e) {
    this.classList.add("colored");
}



