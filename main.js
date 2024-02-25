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
    } else if (nextGrid === 8) {
      world.map[player.grid.x][player.grid.y - 1] = 0;
      removeEnemy(player.grid.x, player.grid.y - 1);
      ++world.score;
      console.log(`World score: ${world.score}`);
    } else if (
      nextGrid === 4 ||
      nextGrid === 5 ||
      nextGrid === 6 ||
      nextGrid === 7
    ) {
      loadNextRoom(world.map[world.map.length - 1]);
    }

    // Move enemies
    // code here
  } else if (event.code === "KeyA") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: -1, y: 0 });
    if (!nextGrid) {
      moveCameraWest(); // Move the camera
      moveEntityWest(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 8) {
      world.map[player.grid.x - 1][player.grid.y] = 0;
      removeEnemy(player.grid.x - 1, player.grid.y);
      ++world.score;
      console.log(`World score: ${world.score}`);
    } else if (
      nextGrid === 4 ||
      nextGrid === 5 ||
      nextGrid === 6 ||
      nextGrid === 7
    ) {
      loadNextRoom(world.map[world.map.length - 1]);
    }

    // Move enemies
    // code here
  } else if (event.code === "KeyS") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 0, y: 1 });
    if (!nextGrid) {
      moveCameraSouth(); // Move the camera
      moveEntitySouth(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 8) {
      world.map[player.grid.x][player.grid.y + 1] = 0;
      removeEnemy(player.grid.x, player.grid.y + 1);
      ++world.score;
      console.log(`World score: ${world.score}`);
    } else if (
      nextGrid === 4 ||
      nextGrid === 5 ||
      nextGrid === 6 ||
      nextGrid === 7
    ) {
      loadNextRoom(world.map[world.map.length - 1]);
    }

    // Move enemies
    // code here
  } else if (event.code === "KeyD") {
    // Perform next grid check
    const nextGrid = checkNextGrid(player.grid, { x: 1, y: 0 });
    if (!nextGrid) {
      moveCameraEast(); // Move the camera
      moveEntityEast(player, playerElement, baseMovement); // Move the player
    } else if (nextGrid === 8) {
      // hit enemy
      world.map[player.grid.x + 1][player.grid.y] = 0;
      removeEnemy(player.grid.x + 1, player.grid.y);
      ++world.score;
      console.log(`World score: ${world.score}`);
    } else if (
      nextGrid === 4 ||
      nextGrid === 5 ||
      nextGrid === 6 ||
      nextGrid === 7
    ) {
      loadNextRoom(world.map[world.map.length - 1]);
    }

    // Move enemies
    // code here
  } else if (event.code === "KeyR") {
    initializeGameCoordinates();
  } else if (event.code === "Space") {
    // Move enemies
    // code here
  }
});

loadGame();
