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

function moveNorth() {
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

  player.position.y -= 100 + 6;
  player.grid.y -= 1;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );

  findGridCoordinates();
}

/*******************************************************************************
 *
 * Move southwards (bottom-left direction / positive Y / next row, same column)
 *
 ******************************************************************************/

function moveSouth() {
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

  player.position.y += 100 + 6;
  player.grid.y += 1;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
  findGridCoordinates();
}

/*******************************************************************************
 *
 * Move eastwards (bottom-right direction / positive X / next column, same row)
 *
 ******************************************************************************/

function moveEast() {
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

  player.position.x += 100 + 6;
  player.grid.x += 1;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
  findGridCoordinates();
}

/*******************************************************************************
 *
 * Move westwards (top-left direction / negative X / next column, same row)
 *
 ******************************************************************************/

function moveWest() {
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

  player.position.x -= 100 + 6;
  player.grid.x -= 1;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );

  findGridCoordinates();
}

/*******************************************************************************
 *
 * Given X and Y coordinates, moves to that grid
 *
 ******************************************************************************/

function moveTo(object, element, x, y) {}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function findGridCoordinates() {
  const offsetX = Math.ceil(world.row / 2 - 1);
  const offsetY = Math.ceil(world.column / 2 - 1);

  let currPositionX = Math.round(player.position.x / 100) + offsetX;
  let currPositionY = Math.round(player.position.y / 100) + offsetY;

  console.log(`Calculated - X: ${currPositionX} | Y: ${currPositionY}`);
  console.log(`Player's - X: ${player.grid.x} | Y: ${player.grid.y}`);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function initializeWorldCoordinates() {
  if (player.grid.x === 0 && player.grid.y === 0) return;

  // Center everything to middle
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  moveIsometricElement(
    true,
    containerElement,
    camera.position.x,
    camera.position.y,
    camera.position.z
  );

  // Center the player to the world
  moveIsometricElement(false, playerElement);

  let adjustNorth = 0;
  let adjustWest = 0;

  adjustNorth = Math.ceil(world.row / 2 - 1);
  adjustWest = Math.ceil(world.column / 2 - 1);

  for (let i = 0; i < adjustNorth; ++i) moveNorth();
  for (let i = 0; i < adjustWest; ++i) moveWest();
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

  // North-South (Y-Axis - +) Columns
  let worldCenterY = Math.ceil(world.column / 2 - 1);
  // East-West (X-Axis + -) Rows
  let worldCenterX = Math.ceil(world.row / 2 - 1);

  player.grid.x = worldCenterX;
  player.grid.y = worldCenterY;
  console.log(`X: ${worldCenterX} | Y: ${worldCenterY}`);

  if (playerElement) console.log("Created Player");
  else console.log("Error creating Player");
}
