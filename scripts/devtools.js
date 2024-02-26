const columnInput = document.createElement("input");
const rowInput = document.createElement("input");
const updateButton = document.createElement("button");

columnInput.type = "text";
columnInput.classList = "inputColumn";
columnInput.placeholder = "Column";

rowInput.type = "text";
rowInput.classList = "inputRow";
rowInput.placeholder = "Row";

updateButton.classList = "update";
updateButton.innerText = "Update";

body.prepend(updateButton);
body.prepend(rowInput);
body.prepend(columnInput);

updateButton.addEventListener("click", function (event) {
  const newColumn = document.querySelector(".inputColumn");
  const newRow = document.querySelector(".inputRow");

  world.column = parseInt(newColumn.value);
  world.row = parseInt(newRow.value);

  deleteGrid();
  createGrid();

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  player.position.x = 0;
  player.position.y = 0;
  player.position.z = 0;

  containerElement.style.transform = `
  perspective(2000px) 
  translateX(${camera.position.x}px)
  translateY(${camera.position.y}px)
  translateZ(${camera.position.z}px)
  rotateX(60deg)
  rotateZ(45deg)
  `;

  initializeGameCoordinates();
});

// window.addEventListener("keydown", function (event) {
//   if (event.code === "KeyE") {
//     // Rotate clockwise
//     rotationZ += 90;
//     posY += 100;
//     posZ += 200;
//     containerElement.style.transform = `
//       perspective(2000px)
//       translateX(${posX}px)
//       translateY(${posY}px)
//       translateZ(${posZ}px)
//       rotateX(${rotationX}deg)
//       rotateZ(${rotationZ}deg)
//     `;
//   } else if (event.code === "KeyQ") {
//     // Rotate counter-clockwise
//     rotationZ -= 90;
//     posY -= 100;
//     posZ -= 200;
//     containerElement.style.transform = `
//       perspective(2000px)
//       translateX(${posX}px)
//       translateY(${posY}px)
//       translateZ(${posZ}px)
//       rotateX(${rotationX}deg)
//       rotateZ(${rotationZ}deg)
//     `;
//   }
// });
