const world = {
  size: 9,
  column: 3,
  row: 3,
  tile: 100,
  map: [[]],
};

const player = {
  HP: 100,
  STR: 1,
  DEX: 1,
  AGI: 1,
  SPD: 1,
  position: { x: 0, y: 0, z: 0 },
};

const camera = {
  position: { x: 0, y: 0, z: 0 },
};

const body = document.querySelector("body");
const containerElement = document.querySelector(".container");
