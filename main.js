// let moveAmount = calculateMovementDistance();
// let moveAmount = squareSize;

// Movement
window.addEventListener("keydown", function (event) {
  if (event.code === "KeyW") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 0, y: -1 });
    if (!nextGrid) {
      moveCameraNorth(); // Move the camera
      moveEntityNorth(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraNorth(); // Move the camera
      moveEntityNorth(player, playerElement, baseMovement); // Move the player
    }
  } else if (event.code === "KeyA") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: -1, y: 0 });
    if (!nextGrid) {
      moveCameraWest(); // Move the camera
      moveEntityWest(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraWest(); // Move the camera
      moveEntityWest(player, playerElement, baseMovement); // Move the player
    }
  } else if (event.code === "KeyS") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 0, y: 1 });
    if (!nextGrid) {
      moveCameraSouth(); // Move the camera
      moveEntitySouth(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraSouth(); // Move the camera
      moveEntitySouth(player, playerElement, baseMovement); // Move the player
    }
  } else if (event.code === "KeyD") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 1, y: 0 });
    if (!nextGrid) {
      moveCameraEast(); // Move the camera
      moveEntityEast(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraEast(); // Move the camera
      moveEntityEast(player, playerElement, baseMovement); // Move the player
    }
  } else if (event.code === "KeyR") {
    initializeGameCoordinates();
  } else if (event.code === "Space") {
    if (world.map[player.grid.x][player.grid.y] === 4) {
      deleteGrid();
      const block = document.createElement("div");
      block.classList.add("rootBlock");
      root.prepend(block);

      const win = document.createElement("div");
      win.classList.add("winScreen");
      win.innerText = `You won!
                       Time taken: ${60 - gameTimer} seconds!
                       Refresh the page to try again!`;
      root.prepend(win);

      clearInterval(interval);
    }

    // Move enemies
    // enemyPathing();
  }
});

const instructions = document.createElement("div");
instructions.classList = "instructions";
instructions.innerText = `Movement - 'W A S D' keys
                              
                          End the game with 'Spacebar' when you're standing on the goal!

                          Time remaining: ${gameTimer}

                          White Tiles - Floor
                          Black Tiles - Wall
                          Brown Tile - Goal!`;

body.prepend(instructions);

const interval = setInterval(function () {
  if (gameTimer) {
    --gameTimer;
    instructions.innerText = `Movement - 'W A S D' keys

                              End the game with 'Spacebar' when you're standing on the goal!

                              Time remaining: ${gameTimer}
                              
                              White Tiles - Floor
                              Black Tiles - Wall
                              Brown Tile - Goal!`;
  } else {
    deleteGrid();
    const block = document.createElement("div");
    block.classList.add("rootBlock");
    root.prepend(block);

    const lose = document.createElement("div");
    lose.classList.add("loseScreen");
    lose.innerText = `You lost!
                      Refresh the page to try again!`;
    root.prepend(lose);

    clearInterval(interval);
  }
}, 1000);

const randomMaze = Math.floor(Math.random() * mazes.length);
loadGame(mazes[randomMaze]);
