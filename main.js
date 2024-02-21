// let moveAmount = calculateMovementDistance();
// let moveAmount = squareSize;

// Movement
window.addEventListener("keydown", function (event) {
  if (event.code === "KeyW") {
    // camera.position.x -= world.tile + 6;
    // camera.position.y += world.tile / 2 - 3;
    // camera.position.z += world.tile + 6;
    // containerElement.style.transform = `
    // perspective(2000px)
    // translateX(${camera.position.x}px)
    // translateY(${camera.position.y}px)
    // translateZ(${camera.position.z}px)
    // rotateX(60deg)
    // rotateZ(45deg)
    // `;

    moveNorth();
  } else if (event.code === "KeyA") {
    // camera.position.x += world.tile + 6;
    // camera.position.y += world.tile / 2 - 3;
    // camera.position.z += world.tile + 6;
    // containerElement.style.transform = `
    // perspective(2000px)
    // translateX(${camera.position.x}px)
    // translateY(${camera.position.y}px)
    // translateZ(${camera.position.z}px)
    // rotateX(60deg)
    // rotateZ(45deg)
    // `;

    moveWest();
  } else if (event.code === "KeyS") {
    // camera.position.x += world.tile + 6;
    // camera.position.y -= world.tile / 2 - 3;
    // camera.position.z -= world.tile + 6;
    // containerElement.style.transform = `
    // perspective(2000px)
    // translateX(${camera.position.x}px)
    // translateY(${camera.position.y}px)
    // translateZ(${camera.position.z}px)
    // rotateX(60deg)
    // rotateZ(45deg)
    // `;

    moveSouth();
  } else if (event.code === "KeyD") {
    // camera.position.x -= world.tile + 6;
    // camera.position.y -= world.tile / 2 - 3;
    // camera.position.z -= world.tile + 6;
    // containerElement.style.transform = `
    // perspective(2000px)
    // translateX(${camera.position.x}px)
    // translateY(${camera.position.y}px)
    // translateZ(${camera.position.z}px)
    // rotateX(60deg)
    // rotateZ(45deg)
    // `;

    moveEast();
  } else if (event.code === "KeyR") {
    initializeWorldCoordinates();
  }
});

createGrid();
