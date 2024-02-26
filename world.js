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
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function initializeWorld(room) {
  world.map = room;
  world.column = room.length;
  world.row = room[0].length;
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
  containerElement.style.width = 0;
  containerElement.style.height = 0;
  if (!containerElement.firstChild) console.log("Deleted Grid");
  else console.log("Error emptying grid");
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function initializeGameCoordinates() {
  // center the camera to the world
  moveIsometricElement(true, containerElement, 0, 0, 0);

  // Center the player to the world
  moveIsometricElement(false, playerElement);

  for (let i = Math.ceil(world.column / 2); i > 0; --i) {
    moveCameraNorth();
    moveEntityNorth(player, playerElement, baseMovement);
  }
  for (let i = Math.ceil(world.row / 2); i > 0; --i) {
    moveCameraWest();
    moveEntityWest(player, playerElement, baseMovement);
  }
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

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
      if (world.map[i][j] === 8) createEnemy(i, j);
      // arrayOfSquares[j].classList.add("enemy");
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

function createEnemy(x, y) {
  const enemyElement = document.createElement("div");
  enemyElement.classList.add("enemy");
  enemyElement.style.width = `${world.tile}px`;
  enemyElement.style.height = `${world.tile}px`;
  containerElement.appendChild(enemyElement);

  const enemy = {
    position: { x: 0, y: 0, z: 0 },
    grid: { x: x, y: y },
    element: enemyElement,
  };

  for (let i = enemy.grid.y; i > 0; --i)
    moveEntityNorth(enemy, enemyElement, baseMovement);
  for (let i = enemy.grid.x; i > 0; --i)
    moveEntityWest(enemy, enemyElement, baseMovement);

  moveEntityTo(enemy, enemyElement, x, y);

  // put reference to enemy in enemies array for use later
  enemies.push(enemy);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function removeEnemy(x, y) {
  // Put all divs in container into an array
  // const arrayOfContainerDivs = [...containerElement.children];
  // const arrayOfSquares = [...arrayOfContainerDivs[x].children];

  // arrayOfSquares[y].classList.remove("enemy");
  const newEnemies = [];
  for (let i = 0; i < enemies.length; ++i) {
    if (enemies[i].grid.x === x && enemies[i].grid.y === y) {
      containerElement.removeChild(enemies[i].element);
    } else {
      newEnemies.push(enemies[i]);
    }
  }

  enemies = newEnemies;
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function enemyPathing() {
  for (let i = 0; i < enemies.length; ++i) {
    // player is north of enemy
    if (
      enemies[i].grid.y - player.grid.y < 3 &&
      enemies[i].grid.y - player.grid.y > 0
    ) {
      const nextGrid = checkNextGrid(enemies[i].grid, { x: 0, y: -1 });
      if (!nextGrid) {
        moveEntityNorth(enemies[i], enemies[i].element, baseMovement);
      }
    }
    // player is west of enemy
    else if (
      enemies[i].grid.x - player.grid.x < 3 &&
      enemies[i].grid.x - player.grid.x > 0
    ) {
      const nextGrid = checkNextGrid(enemies[i].grid, { x: -1, y: 0 });
      if (!nextGrid) {
        moveEntityWest(enemies[i], enemies[i].element, baseMovement);
      }
    }
    // player is south of enemy
    else if (
      enemies[i].grid.y - player.grid.y > -3 &&
      enemies[i].grid.y - player.grid.y < 0
    ) {
      const nextGrid = checkNextGrid(enemies[i].grid, { x: 0, y: 1 });
      if (!nextGrid) {
        moveEntitySouth(enemies[i], enemies[i].element, baseMovement);
      }
    }
    // player is east of enemy
    else if (
      enemies[i].grid.x - player.grid.x > -3 &&
      enemies[i].grid.x - player.grid.x < 0
    ) {
      const nextGrid = checkNextGrid(enemies[i].grid, { x: 1, y: 0 });
      if (!nextGrid) {
        moveEntityEast(enemies[i], enemies[i].element, baseMovement);
      }
    }
  }
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function checkNextGrid(currentGrid, nextGrid) {
  // Floor and Spawn check
  try {
    // Enemy check
    for (let i = 0; i < enemies.length; ++i) {
      if (
        enemies[i].grid.x === currentGrid.x + nextGrid.x &&
        enemies[i].grid.y === currentGrid.y + nextGrid.y
      ) {
        return 8;
      }
    }

    if (
      world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 0 ||
      world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 9
    )
      return 0;

    // Wall check
    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 1)
      return 1;

    // Stairs check
    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 3)
      return 3;
    // Door check
    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 4)
      return 4;
    // if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 5)
    //   return 0;
    // if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 6)
    //   return 0;
    // if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 7)
    //   return 0;
  } catch (e) {
    return 1;
  }
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

  if (playerElement) console.log("Created Player");
  else console.log("Error creating Player");
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function loadGame(maze) {
  initializeWorld(maze);
  createGrid();
  initializeGameCoordinates();
  initializeEntities();
}

function loadNextRoom(room) {
  deleteGrid();
  initializeWorld(room);
  createGrid();
  initializeGameCoordinates();
  initializeEntities();
}
