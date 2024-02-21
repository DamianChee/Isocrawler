/**
 *
 * https://stackoverflow.com/questions/10506502/what-is-the-connection-between-an-isometric-angle-and-scale
 * 45 * (Math.PI / 180) converts 45° into radians (π/4)
 * cos(π/4) = sin(π/4) = 0.7071067811865476
 * 1/cos(π/4) = 1/sin(π/4) = 1.414213562373095 and there's your magic number.
 * I'm using X rotate 60 degrees, Y rotate 45 degrees
 * as such, the magic number only works CLOSE enough to look like it works
 */

function moveNorth() {
  // See above for the magic number I'm using
  let newX = ((world.tile + 6) * 1.414213562373095) / 2;
  let newY = (world.tile + 3) / 1.414213562373095 / 2;

  camera.position.x -= newX;
  camera.position.y += newY;
  camera.position.z += newX;
  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  const p = document.querySelector(".player");
  player.position.x += 0;
  player.position.y -= 100 + 6;
  player.position.z += 0;
  p.style.transform = `
  perspective(2000px) 
  translateX(${player.position.x}px)
  translateY(${player.position.y}px)
  translateZ(${player.position.z}px)
  `;
}

function moveSouth() {
  // See above for the magic number I'm using
  let newX = ((world.tile + 6) * 1.414213562373095) / 2;
  let newY = (world.tile + 3) / 1.414213562373095 / 2;

  camera.position.x += newX;
  camera.position.y -= newY;
  camera.position.z -= newX;
  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  const p = document.querySelector(".player");
  player.position.x += 0;
  player.position.y += 100 + 6;
  player.position.z += 0;
  p.style.transform = `
  perspective(2000px) 
  translateX(${player.position.x}px)
  translateY(${player.position.y}px)
  translateZ(${player.position.z}px)
  `;
}

function moveEast() {
  // See above for the magic number I'm using
  let newX = ((world.tile + 6) * 1.414213562373095) / 2;
  let newY = (world.tile + 3) / 1.414213562373095 / 2;

  camera.position.x -= newX;
  camera.position.y -= newY;
  camera.position.z -= newX;
  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  const p = document.querySelector(".player");
  player.position.x += 100 + 6;
  player.position.y -= 0;
  player.position.z += 0;
  p.style.transform = `
  perspective(2000px) 
  translateX(${player.position.x}px)
  translateY(${player.position.y}px)
  translateZ(${player.position.z}px)
  `;
}

function moveWest() {
  // See above for the magic number I'm using
  let newX = ((world.tile + 6) * 1.414213562373095) / 2;
  let newY = (world.tile + 3) / 1.414213562373095 / 2;

  camera.position.x += newX;
  camera.position.y += newY;
  camera.position.z += newX;
  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  const p = document.querySelector(".player");
  player.position.x -= 100 + 6;
  player.position.y -= 0;
  player.position.z += 0;
  p.style.transform = `
  perspective(2000px) 
  translateX(${player.position.x}px)
  translateY(${player.position.y}px)
  translateZ(${player.position.z}px)
  `;
}

function initializeWorldCoordinates() {
  // Center everything to middle
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  let adjustNorth = 0;
  let adjustWest = 0;
  // calculate move north how many times
  // check if row even or odd
  if (world.row % 2) {
    adjustNorth = world.row / 2 - 1;
  } else {
    adjustNorth = Math.ceil(world.row / 2 - 1);
  }

  // calculate move west how many times
  // check if column even or odd
  if (world.column % 2) {
    adjustWest = world.column / 2 - 1;
  } else {
    adjustWest = world.Math.ceil(column / 2 - 1);
  }

  for (let i = 0; i < adjustNorth; ++i) moveNorth();
  for (let i = 0; i < adjustWest; ++i) moveWest();

  initializePlayerPosition();
}

function initializePlayerPosition() {
  const playerX = (world.column * world.tile) / 2;
  const playerY = (world.row * world.tile) / 2;
  player.position.x = playerX;
  player.position.y = playerY;

  player.position.mapIndex =
    Math.ceil(playerX / world.tile) + Math.ceil(playerY / world.tile);

  containerElement.children[Math.ceil(playerX / world.tile) - 1].children[
    Math.ceil(playerY / world.tile) - 1
  ].classList.remove("square");

  containerElement.children[Math.ceil(playerX / world.tile) - 1].children[
    Math.ceil(playerY / world.tile) - 1
  ].classList.add("player");
}

function createGrid() {
  // Create/populate grid into the container
  for (let i = 0; i < world.column; ++i) {
    const col = document.createElement("div");
    col.className = "column";

    for (let j = 0; j < world.row; ++j) {
      const ro = document.createElement("div");
      ro.classList.add("square");

      ro.style.width = `${world.tile}px`;
      ro.style.height = `${world.tile}px`;

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
  // prettier-ignore
  containerElement.style.width = `
  ${ world.tile * world.column + 6 * world.column }px`;

  // prettier-ignore
  containerElement.style.height = `
  ${ world.tile * world.row + 6 * world.row }px`;

  // Create player also
  {
    const ro = document.createElement("div");
    ro.classList.add("player");

    ro.style.width = `${world.tile}px`;
    ro.style.height = `${world.tile}px`;

    containerElement.appendChild(ro);
  }

  console.log("Created Grid");
}

function deleteGrid() {
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }
  console.log("Deleted Grid");
}

// fill the world map based on which room we are in
function initializeWorldMap(room) {
  // copy over the map
  world.map = [...room];

  const playerPosition = room.indexOf(9);
}

// check what's in the next space
function move() {}

//
// OLD STUFF
//
// function initializeWorld() {
//   world.size = world.column * world.row;

//   // fill world.map based on size with empty space (1)
//   for (let i = 0; i < world.size; ++i) world.map[i] = 1;
//   console.log(world.map);

//   // first row
//   for (let i = 0; i < world.column; ++i) world.map[i] = 2;

//   // left and right sides
//   for (let i = 0; i < world.size; i += world.column) {
//     console.log(`${i} ${i + world.column - 1}`);
//     world.map[i] = 2;
//     world.map[i + world.column - 1] = 2;
//   }

//   // last row
//   for (let i = 1; i <= world.column; ++i) world.map[world.size - i] = 2;

//   console.log(world.map);
// }

// function checkWall() {
// find out which grid it's in
// { positionX * width, positionY * height }
//
// check if current grid => next grid is wall
// { nextX * width, nextY * height } === wall
// return false
// else move into that new position
// return true
// }
