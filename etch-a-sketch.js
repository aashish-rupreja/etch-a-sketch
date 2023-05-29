const container = document.getElementById("container");

//--------------------------------------------------- Buttons ---------------------------------------------------//
const inputButton = document.getElementById("input-eval");
const clearButton = document.getElementById("clear");
const rainbowButton = document.getElementById("rainbow");
const classicButton = document.getElementById("classic");
const shadeButton = document.getElementById("shade");
const eraseButton = document.getElementById("erase");

const inputText = document.getElementById("size-input");
//--------------------------------------------------- Buttons ---------------------------------------------------//


//--------------------------------------------------- Some logic ---------------------------------------------------//
let rainbowMode = false;
let shadeMode = false;
let eraseMode = false;

let gridSize = 16;
drawGrid(16);

inputButton.addEventListener("click", e => {
    gridSize = Number(inputText.value);
    if (gridSize > 2 && gridSize <= 50) {
        container.innerHTML = "";
        drawGrid(gridSize);
        inputText.value = "";
    }
    else {
        const p = document.createElement("p");
        p.innerText = "SIZE NOT POSSIBLE!!!";
        p.style.color = "red";
        p.style.fontSize = "60px";
        container.innerHTML = "";
        container.appendChild(p);
    }
});
//--------------------------------------------------- Some logic ---------------------------------------------------//



//--------------------------------------------------- Events on Buttons ---------------------------------------------------//
clearButton.addEventListener("click", e => {
    const items = Array.from(document.getElementsByClassName("container-items"));
    items.forEach(item => item.style.backgroundColor = "rgb(255, 255, 255)");
    highlightActiveModeButton(clearButton);
});


rainbowButton.addEventListener("click", e => {
    rainbowMode = true;
    shadeMode = false;
    eraseMode = false;
    highlightActiveModeButton(rainbowButton);
});

classicButton.addEventListener("click", e => {
    rainbowMode = false;
    shadeMode = false;
    eraseMode = false;
    highlightActiveModeButton(classicButton);

});

shadeButton.addEventListener("click", e => {
    shadeMode = true;
    rainbowMode = false;
    eraseMode = false;
    highlightActiveModeButton(shadeButton);

});

eraseButton.addEventListener("click", e => {
    eraseMode = true
    shadeMode = false;
    rainbowMode = false;
    highlightActiveModeButton(eraseButton);

});
//--------------------------------------------------- Events on Buttons ---------------------------------------------------//



//--------------------------------------------------- Events on Container ---------------------------------------------------//
container.addEventListener("mousedown", containerEvent => {
    const items = Array.from(document.getElementsByClassName("container-items"));
    items.forEach(item => {
        item.addEventListener("mouseenter", color)
        item.addEventListener("click", color);
    });
});


container.addEventListener("mouseup", containerEvent => {
    const items = Array.from(document.getElementsByClassName("container-items"));
    items.forEach(item => item.removeEventListener("mouseenter", color));
});
//--------------------------------------------------- Events on Container ---------------------------------------------------//



//--------------------------------------------------- Main logic to draw on sketch pad ---------------------------------------------------//
function color(e) {
    if (rainbowMode) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        // this.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else if (shadeMode) {
        //get current background color
        let bgColor = this.style.backgroundColor;

        //strip it down to only rgb values
        let rgbRemoved = bgColor.split("rgb(");
        let lastBracketRemoved = rgbRemoved.toString().split(")");
        let onlyRgbColors = lastBracketRemoved.toString().split(",");
        //strip it down to only rgb values

        //typecast them to numbers
        let r, g, b;
        r = Number(onlyRgbColors[1]);
        g = Number(onlyRgbColors[2]);
        b = Number(onlyRgbColors[3]);

        //reduce value by 15 to darken it
        this.style.backgroundColor = `rgb(${r - 15}, ${g - 15}, ${b - 15})`;
    }
    else if (eraseMode) {
        this.style.backgroundColor = "rgb(255, 255, 255)";
    }
    else {
        this.style.backgroundColor = "rgb(0, 0, 0)";
    }
}
//--------------------------------------------------- Main logic to draw on sketch pad ---------------------------------------------------//



//--------------------------------------------------- Function to create grid ---------------------------------------------------//
function drawGrid(gridSize) {
    for (let i = 1; i <= (gridSize * gridSize); i++) {
        const item = document.createElement("div");
        item.setAttribute("class", "container-items");
        item.setAttribute("draggable", "false");
        item.style.width = `${(container.clientWidth) / gridSize}px`;
        item.style.height = `${(container.clientHeight) / gridSize}px`;
        item.style.backgroundColor = "rgb(255, 255, 255)";
        container.appendChild(item);
    }
}
//--------------------------------------------------- Function to create grid ---------------------------------------------------//
function highlightActiveModeButton(x) {
    x.classList.toggle("button-pressed");
    const controlButtons = Array.from(document.getElementsByClassName("control-button"));
    controlButtons.forEach(controlButton => {
        if (x !== controlButton) {
            controlButton.classList.remove("button-pressed");
        }
    })
}