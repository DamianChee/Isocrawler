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
      if (world.map[i][j] === 2) arrayOfSquares[j].classList.add("door");
      if (world.map[i][j] === 3) {
        arrayOfSquares[j].classList.add("teleporterPad");
        teleporterPads.push({ grid: { x: i, y: j } });
      }
      if (world.map[i][j] === 4) arrayOfSquares[j].classList.add("bounceWest");
      if (world.map[i][j] === 5) arrayOfSquares[j].classList.add("bounceSouth");
      if (world.map[i][j] === 6) arrayOfSquares[j].classList.add("bounceEast");
      if (world.map[i][j] === 8) arrayOfSquares[j].classList.add("bounceNorth");
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

function checkNextGrid(currentGrid, nextGrid) {
  // Floor and Spawn check
  try {
    if (
      world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 0 ||
      world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 9
    )
      return 0;

    // Wall check
    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 1)
      return 1;

    // Goal check
    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 2)
      return 2;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 3)
      return 3;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 4)
      return 4;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 5)
      return 5;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 6)
      return 6;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 7)
      return 7;

    if (world.map[currentGrid.x + nextGrid.x][currentGrid.y + nextGrid.y] === 8)
      return 8;
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

function saveHighscore() {
  localStorage.setItem("maze1Highscores", JSON.stringify(maze1Highscores));
  localStorage.setItem("maze2Highscores", JSON.stringify(maze2Highscores));
  localStorage.setItem("maze3Highscores", JSON.stringify(maze3Highscores));
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function loadHighscore() {
  maze1Highscores = JSON.parse(localStorage.getItem("maze1Highscores") || "[]");
  maze2Highscores = JSON.parse(localStorage.getItem("maze2Highscores") || "[]");
  maze3Highscores = JSON.parse(localStorage.getItem("maze3Highscores") || "[]");
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function clearHighscore() {
  localStorage.clear();
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function printHighscore() {
  if (randomMaze === 0) {
    highscores.innerText = `Maze 1
                              
                            1st Place 
                            Name: ${maze1Highscores[0].playerName} 
                            Time: ${maze1Highscores[0].time} 
                                      
                            2nd Place
                            Name: ${maze1Highscores[1].playerName} 
                            Time: ${maze1Highscores[1].time} 

                            3rd Place
                            Name: ${maze1Highscores[2].playerName} 
                            Time: ${maze1Highscores[2].time} `;
  } else if (randomMaze === 1)
    highscores.innerText = `Maze 2
                              
                            1st Place 
                            Name: ${maze2Highscores[0].playerName}
                            Time: ${maze2Highscores[0].time}
                                      
                            2nd Place
                            Name: ${maze2Highscores[1].playerName}
                            Time: ${maze2Highscores[1].time}

                            3rd Place
                            Name: ${maze2Highscores[2].playerName}
                            Time: ${maze2Highscores[2].time}`;
  else if (randomMaze === 2)
    highscores.innerText = `Maze 3
                            
                            1st Place 
                            Name: ${maze3Highscores[0].playerName}
                            Time: ${maze3Highscores[0].time}
                                      
                            2nd Place
                            Name: ${maze3Highscores[1].playerName}
                            Time: ${maze3Highscores[1].time}

                            3rd Place
                            Name: ${maze3Highscores[2].playerName}
                            Time: ${maze3Highscores[2].time}`;
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function updateHighscore() {
  const time = 60 - gameTimer;
  // Maze 1
  if (randomMaze === 0) {
    if (time < maze1Highscores[0].time) {
      const newHighscore = { playerName: "You", time: time };
      maze1Highscores.unshift(newHighscore);
      maze1Highscores.pop();
    } else if (time < maze1Highscores[1].time) {
      const newHighscore = { playerName: "You", time: time };
      maze1Highscores[2] = maze1Highscores[1];
      maze1Highscores[1] = newHighscore;
    } else if (time < maze1Highscores[2].time) {
      const newHighscore = { playerName: "You", time: time };
      maze1Highscores[2] = newHighscore;
    }
  }
  // Maze 2
  else if (randomMaze === 1) {
    if (time < maze2Highscores[0].time) {
      const newHighscore = { playerName: "You", time: time };
      maze2Highscores.unshift(newHighscore);
      maze2Highscores.pop();
    } else if (time < maze2Highscores[1].time) {
      const newHighscore = { playerName: "You", time: time };
      maze2Highscores[2] = maze2Highscores[1];
      maze2Highscores[1] = newHighscore;
    } else if (time < maze2Highscores[2].time) {
      const newHighscore = { playerName: "You", time: time };
      maze2Highscores[2] = newHighscore;
    }
  }
  // Maze 3
  else if (randomMaze === 2) {
    if (time < maze3Highscores[0].time) {
      const newHighscore = { playerName: "You", time: time };
      maze3Highscores.unshift(newHighscore);
      maze3Highscores.pop();
    } else if (time < maze3Highscores[1].time) {
      const newHighscore = { playerName: "You", time: time };
      maze3Highscores[2] = maze3Highscores[1];
      maze3Highscores[1] = newHighscore;
    } else if (time < maze3Highscores[2].time) {
      const newHighscore = { playerName: "You", time: time };
      maze3Highscores[2] = newHighscore;
    }
  }
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function printInstructions() {
  instructions.innerText = `Movement - 'W A S D' keys
                            Interact with the brown and blue tiles with 'Spacebar'
                            
                            White Tiles - Floor
                            Black Tiles - Wall
                            Grey Tiles - Bounce Pads (Directional block)
                            Blue Tiles - Teleporter Pads (Teleports you to another teleporter randomly)
                            Brown Tiles - Goal!
                            
                            
                            Time remaining: ${gameTimer}`;
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function printWinScreen() {
  const block = document.createElement("div");
  block.classList.add("rootBlock");
  root.prepend(block);

  const win = document.createElement("div");
  win.classList.add("winScreen");
  win.innerText = `You won!
                   Time taken: ${60 - gameTimer} seconds!
                   Refresh the page to try again!`;
  root.prepend(win);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function printLoseScreen() {
  const block = document.createElement("div");
  block.classList.add("rootBlock");
  root.prepend(block);

  const lose = document.createElement("div");
  lose.classList.add("loseScreen");
  lose.innerText = `You lost!
                    Refresh the page to try again!`;
  root.prepend(lose);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function findAnotherTeleporter(x, y) {
  let teleporterIndex = 0;
  do {
    teleporterIndex = Math.floor(Math.random() * teleporterPads.length);
  } while (
    teleporterPads[teleporterIndex].grid.x === x &&
    teleporterPads[teleporterIndex].grid.y === y
  );
  moveCameraTo(
    player,
    containerElement,
    teleporterPads[teleporterIndex].grid.x,
    teleporterPads[teleporterIndex].grid.y
  );
  moveEntityTo(
    player,
    playerElement,
    teleporterPads[teleporterIndex].grid.x,
    teleporterPads[teleporterIndex].grid.y
  );
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

// function loadNextRoom(room) {
//   deleteGrid();
//   initializeWorld(room);
//   createGrid();
//   initializeGameCoordinates();
//   initializeEntities();
// }

// /*******************************************************************************
//  *
//  *
//  *
//  ******************************************************************************/

// function createEnemy(x, y) {
//   const enemyElement = document.createElement("div");
//   enemyElement.classList.add("enemy");
//   enemyElement.style.width = `${world.tile}px`;
//   enemyElement.style.height = `${world.tile}px`;
//   containerElement.appendChild(enemyElement);

//   const enemy = {
//     position: { x: 0, y: 0, z: 0 },
//     grid: { x: x, y: y },
//     element: enemyElement,
//   };

//   for (let i = enemy.grid.y; i > 0; --i)
//     moveEntityNorth(enemy, enemyElement, baseMovement);
//   for (let i = enemy.grid.x; i > 0; --i)
//     moveEntityWest(enemy, enemyElement, baseMovement);

//   moveEntityTo(enemy, enemyElement, x, y);

//   // put reference to enemy in enemies array for use later
//   enemies.push(enemy);
// }

// /*******************************************************************************
//  *
//  *
//  *
//  ******************************************************************************/

// function removeEnemy(x, y) {
//   // Put all divs in container into an array
//   // const arrayOfContainerDivs = [...containerElement.children];
//   // const arrayOfSquares = [...arrayOfContainerDivs[x].children];

//   // arrayOfSquares[y].classList.remove("enemy");
//   const newEnemies = [];
//   for (let i = 0; i < enemies.length; ++i) {
//     if (enemies[i].grid.x === x && enemies[i].grid.y === y) {
//       containerElement.removeChild(enemies[i].element);
//     } else {
//       newEnemies.push(enemies[i]);
//     }
//   }

//   enemies = newEnemies;
// }

// /*******************************************************************************
//  *
//  *
//  *
//  ******************************************************************************/

// function enemyPathing() {
//   for (let i = 0; i < enemies.length; ++i) {
//     // player is north of enemy
//     if (
//       enemies[i].grid.y - player.grid.y < 3 &&
//       enemies[i].grid.y - player.grid.y > 0
//     ) {
//       const nextGrid = checkNextGrid(enemies[i].grid, { x: 0, y: -1 });
//       if (!nextGrid) {
//         moveEntityNorth(enemies[i], enemies[i].element, baseMovement);
//       }
//     }
//     // player is west of enemy
//     else if (
//       enemies[i].grid.x - player.grid.x < 3 &&
//       enemies[i].grid.x - player.grid.x > 0
//     ) {
//       const nextGrid = checkNextGrid(enemies[i].grid, { x: -1, y: 0 });
//       if (!nextGrid) {
//         moveEntityWest(enemies[i], enemies[i].element, baseMovement);
//       }
//     }
//     // player is south of enemy
//     else if (
//       enemies[i].grid.y - player.grid.y > -3 &&
//       enemies[i].grid.y - player.grid.y < 0
//     ) {
//       const nextGrid = checkNextGrid(enemies[i].grid, { x: 0, y: 1 });
//       if (!nextGrid) {
//         moveEntitySouth(enemies[i], enemies[i].element, baseMovement);
//       }
//     }
//     // player is east of enemy
//     else if (
//       enemies[i].grid.x - player.grid.x > -3 &&
//       enemies[i].grid.x - player.grid.x < 0
//     ) {
//       const nextGrid = checkNextGrid(enemies[i].grid, { x: 1, y: 0 });
//       if (!nextGrid) {
//         moveEntityEast(enemies[i], enemies[i].element, baseMovement);
//       }
//     }
//   }
// }
