// Event Listeners
window.addEventListener("keydown", function (event) {
  // Key W (North)
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
  }
  // Key A (West)
  else if (event.code === "KeyA") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: -1, y: 0 });
    if (!nextGrid) {
      moveCameraWest(); // Move the camera
      moveEntityWest(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraWest(); // Move the camera
      moveEntityWest(player, playerElement, baseMovement); // Move the player
    }
  }
  // Key S (South)
  else if (event.code === "KeyS") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 0, y: 1 });
    if (!nextGrid) {
      moveCameraSouth(); // Move the camera
      moveEntitySouth(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraSouth(); // Move the camera
      moveEntitySouth(player, playerElement, baseMovement); // Move the player
    }
  }
  // Key D (East)
  else if (event.code === "KeyD") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 1, y: 0 });
    if (!nextGrid) {
      moveCameraEast(); // Move the camera
      moveEntityEast(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 4) {
      moveCameraEast(); // Move the camera
      moveEntityEast(player, playerElement, baseMovement); // Move the player
    }
  }
  // special dev key
  else if (event.code === "KeyP") {
    console.log("Clear localstorage");
    clearHighscore();
  }
  // Key Space (Interact)
  else if (event.code === "Space") {
    if (world.map[player.grid.x][player.grid.y] === 4) {
      deleteGrid(); // Delete grid for neatness
      printWinScreen(); // Print win screen
      clearInterval(interval); // Clear away timer interval

      // Update, print, save highscore (to localstorage)
      updateHighscore();
      printHighscore();
      saveHighscore();
    }
  }
});

const interval = setInterval(function () {
  if (gameTimer) {
    --gameTimer;
    printInstructions();
  } else {
    deleteGrid();
    printLoseScreen();
    clearInterval(interval);
  }
}, 1000);

loadGame(mazes[randomMaze]);
if (localStorage.getItem("maze1Highscores") === null) {
  console.log("Empty localstorage");
  printInstructions();
  printHighscore();
} else {
  loadHighscore();
  printInstructions();
  printHighscore();
}
