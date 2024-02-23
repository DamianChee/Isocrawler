// let moveAmount = calculateMovementDistance();
// let moveAmount = squareSize;

// Movement
window.addEventListener("keydown", function (event) {
  if (event.code === "KeyW") {
    moveCameraNorth(); // Move the camera
    moveEntityNorth(player, playerElement, baseMovement); // Move the player

    // Move enemies
    // code here
  } else if (event.code === "KeyA") {
    moveCameraWest(); // Move the camera
    moveEntityWest(player, playerElement, baseMovement); // Move the player

    // Move enemies
    // code here
  } else if (event.code === "KeyS") {
    moveCameraSouth(); // Move the camera
    moveEntitySouth(player, playerElement, baseMovement); // Move the player

    // Move enemies
    // code here
  } else if (event.code === "KeyD") {
    moveCameraEast(); // Move the camera
    moveEntityEast(player, playerElement, baseMovement); // Move the player

    // Move enemies
    // code here
  } else if (event.code === "KeyR") {
    initializeGameCoordinates();
  }
});

initializeWorld(floor1Room1);
createGrid();
initializeGameCoordinates();
initializeEntities();
