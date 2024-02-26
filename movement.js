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

function moveCameraNorth() {
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
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function moveEntityNorth(object, element, speed) {
  object.position.y -= speed;
  object.grid.y -= 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  // findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move southwards (bottom-left direction / positive Y / next row, same column)
 *
 ******************************************************************************/

function moveCameraSouth() {
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
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function moveEntitySouth(object, element, speed) {
  object.position.y += speed;
  object.grid.y += 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  // findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move eastwards (bottom-right direction / positive X / next column, same row)
 *
 ******************************************************************************/

function moveCameraEast() {
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
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function moveEntityEast(object, element, speed) {
  object.position.x += speed;
  object.grid.x += 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  // findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Move westwards (top-left direction / negative X / next column, same row)
 *
 ******************************************************************************/

function moveCameraWest() {
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
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function moveEntityWest(object, element, speed) {
  object.position.x -= speed;
  object.grid.x -= 1;

  moveIsometricElement(
    false,
    element,
    object.position.x,
    object.position.y,
    object.position.z
  );

  // findGridCoordinates(object);
}

/*******************************************************************************
 *
 * Given X and Y coordinates, moves to that grid
 *
 ******************************************************************************/

function moveEntityTo(object, element, x, y) {
  const distanceX = x - object.grid.x;
  const distanceY = y - object.grid.y;

  if (distanceX > 0)
    for (let i = 0; i < distanceX; ++i)
      moveEntityEast(object, element, baseMovement);
  if (distanceX < 0)
    for (let i = 0; i < -distanceX; ++i)
      moveEntityWest(object, element, baseMovement);
  if (distanceY > 0)
    for (let i = 0; i < distanceY; ++i)
      moveEntitySouth(object, element, baseMovement);
  if (distanceY < 0)
    for (let i = 0; i < -distanceY; ++i)
      moveEntityNorth(object, element, baseMovement);
}

/*******************************************************************************
 *
 *
 *
 ******************************************************************************/

function moveCameraTo(object, element, x, y) {
  const distanceX = x - object.grid.x;
  const distanceY = y - object.grid.y;

  if (distanceX > 0)
    for (let i = 0; i < distanceX; ++i)
      moveCameraEast(object, element, baseMovement);
  if (distanceX < 0)
    for (let i = 0; i < -distanceX; ++i)
      moveCameraWest(object, element, baseMovement);
  if (distanceY > 0)
    for (let i = 0; i < distanceY; ++i)
      moveCameraSouth(object, element, baseMovement);
  if (distanceY < 0)
    for (let i = 0; i < -distanceY; ++i)
      moveCameraNorth(object, element, baseMovement);
}
