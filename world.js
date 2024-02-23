/*******************************************************************************
 *
 * Moves an element, true for isometric while false for normal CSS translation
 *
 * element = Element from querySelector
 * tx, ty, tz = TranslateX, TranslateY, TranslateZ
 * rx, ry, rz = RotateX, RotateY, RotateZ
 * WARNING: Function does NOT check whether element is empty or not
 *
 ******************************************************************************/

function moveIsometricElement(
  isometric = false,
  element,
  tx = 0,
  ty = 0,
  tz = 0
) {
  if (isometric) {
    element.style.transform = `
      perspective(2000px) 
      translateX(${tx}px) 
      translateY(${ty}px) 
      translateZ(${tz}px) 
      rotateX(${isoX}deg) 
      rotateY(${isoY}deg) 
      rotateZ(${isoZ}deg)
    `;
  } else {
    element.style.transform = `
      perspective(2000px) 
      translateX(${tx}px) 
      translateY(${ty}px) 
      translateZ(${tz}px)
    `;
  }
}

/*******************************************************************************
 *
 * Move northwards (top-right direction / negative Y / next row, same column)
 *
 ******************************************************************************/

function moveCameraNorth() {
  camera.position.x -= isoXScale;
  camera.position.y += isoYScale;
  camera.position.z += isoXScale;
  moveIsometricElement(
    true,
    containerElement,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
}

function moveEntityNorth(object, element, speed) {
  object.position.y -= speed;
  object.grid.y -= 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move southwards (bottom-left direction / positive Y / next row, same column)
 *
 ******************************************************************************/

function moveCameraSouth() {
  camera.position.x += isoXScale;
  camera.position.y -= isoYScale;
  camera.position.z -= isoXScale;
  moveIsometricElement(
    true,
    containerElement,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
}

function moveEntitySouth(object, element, speed) {
  object.position.y += speed;
  object.grid.y += 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move eastwards (bottom-right direction / positive X / next column, same row)
 *
 ******************************************************************************/

function moveCameraEast() {
  camera.position.x -= isoXScale;
  camera.position.y -= isoYScale;
  camera.position.z -= isoXScale;

  moveIsometricElement(
    true,
    containerElement,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
}

function moveEntityEast(object, element, speed) {
  object.position.x += speed;
  object.grid.x += 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move westwards (top-left direction / negative X / next column, same row)
 *
 ******************************************************************************/

function moveCameraWest() {
  camera.position.x += isoXScale;
  camera.position.y += isoYScale;
  camera.position.z += isoXScale;

  moveIsometricElement(
    true,
    containerElement,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
}

function moveEntityWest(object, element, speed) {
  object.position.x -= speed;
  object.grid.x -= 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Given X and Y coordinates, moves to that grid
 *
 ******************************************************************************/

function moveEntityTo(object, element, x, y) {
  console.log(`${x} | ${y}`);
  const distanceX = x - object.grid.x;
  const distanceY = y - object.grid.y;

  console.log(`${distanceX} | ${distanceY}`);

  if (distanceX > 0)
    for (let i = 0; i < distanceX; ++i)
      moveEntityEast(object, element, baseMovement);
  if (distanceX < 0)
    for (let i = 0; i < -distanceX; ++i)
      moveEntityWest(object, element, baseMovement);
  if (distanceY > 0)
    for (let i = 0; i < distanceY; ++i)
      moveEntitySouth(object, element, baseMovement);
  if (distanceY < 0)
    for (let i = 0; i < -distanceY; ++i)
      moveEntityNorth(object, element, baseMovement);
}

function moveCameraTo(object, element, x, y) {
  console.log(`${x} | ${y}`);
  const distanceX = x - object.grid.x;
  const distanceY = y - object.grid.y;

  console.log(`${distanceX} | ${distanceY}`);

  if (distanceX > 0)
    for (let i = 0; i < distanceX; ++i)
      moveCameraEast(object, element, baseMovement);
  if (distanceX < 0)
    for (let i = 0; i < -distanceX; ++i)
      moveCameraWest(object, element, baseMovement);
  if (distanceY > 0)
    for (let i = 0; i < distanceY; ++i)
      moveCameraSouth(object, element, baseMovement);
  if (distanceY < 0)
    for (let i = 0; i < -distanceY; ++i)
      moveCameraNorth(object, element, baseMovement);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function findGridCoordinates(object) {
  const offsetX = Math.ceil(world.row / 2 - 1);
  const offsetY = Math.ceil(world.column / 2 - 1);

  let currPositionX = Math.round(object.position.x / 100) + offsetX;
  let currPositionY = Math.round(object.position.y / 100) + offsetY;

  console.log(`X: ${currPositionX} | Y: ${currPositionY}`);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function initializeGameCoordinates() {
  if (player.grid.x === 0 && player.grid.y === 0) return;
  if (player.grid.x < 0 || player.grid.y < 0) return;

  // center the camera to the world
  moveIsometricElement(true, containerElement, 0, 0, 0);

  // Center the player to the world
  moveIsometricElement(false, playerElement);

  for (let i = player.grid.y; i > 0; --i) {
    moveCameraNorth();
    moveEntityNorth(player, playerElement, baseMovement);
  }
  for (let i = player.grid.x; i > 0; --i) {
    moveCameraWest();
    moveEntityWest(player, playerElement, baseMovement);
  }
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function createGrid() {
  // Create/populate grid and player into the container
  for (let i = 0; i < world.column; ++i) {
    const col = document.createElement("div");
    col.className = "column";

    for (let j = 0; j < world.row; ++j) {
      const ro = document.createElement("div");
      ro.classList.add("square");

      ro.style.width = `${world.tile}px`;
      ro.style.height = `${world.tile}px`;

      col.appendChild(ro);
    }

    containerElement.appendChild(col);
  }

  containerElement.style.width = `
  ${world.tile * world.column + 6 * world.column}px`;
  containerElement.style.height = `
  ${world.tile * world.row + 6 * world.row}px`;

  // Create player, might be replaced later with "CreateEntity"
  createPlayer();

  console.log("Created Grid");
}

function initializeWorld(room) {
  world.map = room;
  world.column = room.length;
  world.row = room[0].length;
  world.size = room.length * room[0].length;

  console.log(world.column);
  console.log(world.row);
}

function initializeEntities() {
  // Put all divs in container into an array
  const arrayOfContainerDivs = [...containerElement.children];

  for (let i = 0; i < world.column; ++i) {
    // Create a variable to store the column div
    // const column = arrayOfContainerDivs[i];
    // Skip the above and directly use containerdiv[i].children
    const arrayOfSquares = [...arrayOfContainerDivs[i].children];

    // 2D array iteration to go through world.map[][] and add appropriate
    // classes to each squares where needed
    for (let j = 0; j < world.row; ++j) {
      if (world.map[i][j] === 1) arrayOfSquares[j].classList.add("wall");
      if (world.map[i][j] === 3) arrayOfSquares[j].classList.add("stairs");
      if (
        world.map[i][j] === 4 ||
        world.map[i][j] === 5 ||
        world.map[i][j] === 6 ||
        world.map[i][j] === 7
      )
        arrayOfSquares[j].classList.add("door");
      if (world.map[i][j] === 8) arrayOfSquares[j].classList.add("enemy");
      if (world.map[i][j] === 9) {
        moveCameraTo(player, containerElement, i, j);
        moveEntityTo(player, playerElement, i, j);
      }
    }
  }
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function deleteGrid() {
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }
  if (!containerElement.firstChild) console.log("Deleted Grid");
  else console.log("Error emptying grid");
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function createPlayer() {
  const newPlayer = document.createElement("div");
  newPlayer.classList.add("player");
  newPlayer.style.width = `${world.tile}px`;
  newPlayer.style.height = `${world.tile}px`;
  containerElement.appendChild(newPlayer);

  // assign to playerElement variable for use across the game
  playerElement = newPlayer;

  // North-South (Y-Axis - +)
  let worldCenterY = Math.ceil(world.row / 2 - 1);
  // East-West (X-Axis + -)
  let worldCenterX = Math.ceil(world.column / 2 - 1);

  player.grid.x = worldCenterX;
  player.grid.y = worldCenterY;
  console.log(`X: ${worldCenterX} | Y: ${worldCenterY}`);

  if (playerElement) console.log("Created Player");
  else console.log("Error creating Player");
}
