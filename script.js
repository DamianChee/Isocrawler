// Declare Global Variables
var column = 3; // Change this to change number of columns in the grid
var row = 3; // Change this to change number of rows in the grid
var squareSize = 100; // Change this to change the size of grid squares

// Declare variables here
let rotationX = 60;
let rotationY = 0;
let rotationZ = 45;

let posX = 0;
let posY = 0;
let posZ = 0;
let moveAmount = calculateMovementDistance();
// let moveAmount = squareSize;

// Declare constant variables here
const containerElement = document.querySelector(".container");

// Event Listeners
window.addEventListener("keydown", function (event) {
  if (event.code === "KeyE") {
    // Rotate clockwise
    // rotationZ += 45;
    // containerElement.style.transform = `
    //   translateX(${posX}px)
    //   translateY(${posY}px)
    //   translateZ(${posZ}px)
    //   rotateX(${rotationX}deg)
    //   rotateZ(${rotationZ}deg)
    // `;
  } else if (event.code === "KeyQ") {
    // Rotate counter-clockwise
    // rotationZ -= 45;
    // containerElement.style.transform = `
    //   translateX(${posX}px)
    //   translateY(${posY}px)
    //   translateZ(${posZ}px)
    //   rotateX(${rotationX}deg)
    //   rotateZ(${rotationZ}deg)
    // `;
  } else if (event.code === "KeyW") {
    // Move northwards
    // posX += 0;
    // posY -= 0;
    // posZ -= 100;
    // containerElement.style.transform = `
    // translateX(${posX}px)
    // translateY(${posY}px)
    // translateZ(${posZ}px)
    // rotateX(${rotationX}deg)
    // rotateZ(${rotationZ}deg)
    // `;

    posX -= 100;
    posY += 50;
    posZ += 100;
    containerElement.style.transform = `
    translateX(${posX}px)
    translateY(${posY}px)
    translateZ(${posZ}px)
    rotateX(${rotationX}deg)
    rotateZ(${rotationZ}deg)
    `;
  } else if (event.code === "KeyA") {
    // Move eastwards
    // posX += 100;
    // posY -= 0;
    // posZ -= 0;
    // containerElement.style.transform = `
    // translateX(${posX}px)
    // translateY(${posY}px)
    // translateZ(${posZ}px)
    // rotateX(${rotationX}deg)
    // rotateZ(${rotationZ}deg)
    // `;

    posX += 100;
    posY += 50;
    posZ += 100;
    containerElement.style.transform = `
    translateX(${posX}px)
    translateY(${posY}px)
    translateZ(${posZ}px)
    rotateX(${rotationX}deg)
    rotateZ(${rotationZ}deg)
    `;
  } else if (event.code === "KeyS") {
    // Move soundwards
    // posX -= 0;
    // posY += 0;
    // posZ += 100;
    // containerElement.style.transform = `
    // translateX(${posX}px)
    // translateY(${posY}px)
    // translateZ(${posZ}px)
    // rotateX(${rotationX}deg)
    // rotateZ(${rotationZ}deg)
    // `;

    posX += 100;
    posY -= 50;
    posZ -= 100;
    containerElement.style.transform = `
    translateX(${posX}px)
    translateY(${posY}px)
    translateZ(${posZ}px)
    rotateX(${rotationX}deg)
    rotateZ(${rotationZ}deg)
    `;
  } else if (event.code === "KeyD") {
    // Move eastwards
    // posX -= 100;
    // posY -= 0;
    // posZ -= 0;
    // containerElement.style.transform = `
    // translateX(${posX}px)
    // translateY(${posY}px)
    // translateZ(${posZ}px)
    // rotateX(${rotationX}deg)
    // rotateZ(${rotationZ}deg)
    // `;

    posX -= 100;
    posY -= 50;
    posZ -= 100;
    containerElement.style.transform = `
    translateX(${posX}px)
    translateY(${posY}px)
    translateZ(${posZ}px)
    rotateX(${rotationX}deg)
    rotateZ(${rotationZ}deg)
    `;
  }
});

const button = document.querySelector(".update");
button.addEventListener("click", function (event) {
  const newColumn = document.querySelector(".inputColumn");
  const newRow = document.querySelector(".inputRow");

  column = parseInt(newColumn.value);
  row = parseInt(newRow.value);

  deleteGrid();
  createGrid();

  posX = 0;
  posY = 0;
  posZ = 0;

  containerElement.style.transform = `
  translateX(${posX}px)
  translateY(${posY}px)
  translateZ(${posZ}px)
  rotateX(${rotationX}deg)
  rotateZ(${rotationZ}deg)
  `;
});

function calculateMovementDistance() {
  return squareSize * Math.sqrt(2);
}

function createGrid() {
  // Create/populate grid into the container
  for (let i = 0; i < column; ++i) {
    const col = document.createElement("div");
    col.className = "column";

    for (let j = 0; j < row; ++j) {
      const ro = document.createElement("div");
      ro.classList.add("square");

      ro.style.width = `${squareSize}px`;
      ro.style.height = `${squareSize}px`;

      col.appendChild(ro);
      console.log(`Column: ${i} | Row: ${j}`);
    }

    containerElement.appendChild(col);
  }

  // gridSize is the size of each grid, multiplied by the number of columns
  // and rows dynamically. The 6 multiplied by column and row is to make space
  // for padding, margins and borders
  //
  // Set the width and height for container for border shenanigans
  containerElement.style.width = `${squareSize * column + 6 * column}px`;
  containerElement.style.height = `${squareSize * row + 6 * row}px`;

  console.log("Created Grid");
}

function deleteGrid() {
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }
  console.log("Deleted Grid");
}

createGrid();
