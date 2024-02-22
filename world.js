//
// element = Element from querySelector
// tx, ty, tz = TranslateX, TranslateY, TranslateZ
// rx, ry, rz = RotateX, RotateY, RotateZ
// WARNING: Function does NOT check whether element is empty or not
//
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

  // Northwards movement = negative Y-axis
  player.position.y -= 100 + 6;
  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
}

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

  // Southwards movement = positive Y-axis
  player.position.y += 100 + 6;
  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
}

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

  // Eastward movement = positive X-axis
  player.position.x += 100 + 6;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
}

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

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );
}

function initializeWorldCoordinates() {
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

  player.position.x = 0;
  player.position.y = 0;
  player.position.z = 0;

  moveIsometricElement(
    false,
    playerElement,
    player.position.x,
    player.position.y,
    player.position.z
  );

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
}

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

function deleteGrid() {
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }
  if (!containerElement.firstChild) console.log("Deleted Grid");
  else console.log("Error emptying grid");
}

function createPlayer() {
  const newPlayer = document.createElement("div");
  newPlayer.classList.add("player");
  newPlayer.style.width = `${world.tile}px`;
  newPlayer.style.height = `${world.tile}px`;
  containerElement.appendChild(newPlayer);

  // assign to playerElement variable for use across the game
  playerElement = newPlayer;

  if (playerElement) console.log("Created Player");
  else console.log("Error creating Player");
}
