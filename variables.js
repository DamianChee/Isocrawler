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
let playerElement;

// isometric degrees
var isoX = 60;
var isoY = 0;
var isoZ = 45;

/**
 *
 * https://stackoverflow.com/questions/10506502/what-is-the-connection-between-an-isometric-angle-and-scale
 * 45 * (Math.PI / 180) converts 45° into radians (π/4)
 * cos(π/4) = sin(π/4) = 0.7071067811865476
 * 1/cos(π/4) = 1/sin(π/4) = 1.414213562373095 and there's your magic number.
 * I'm using X rotate 60 degrees, Z rotate 45 degrees
 * as such, the magic number only works CLOSE enough to look like it works
 */

// See above for the magic number I'm using
var isoXScale = ((world.tile + 6) * 1.414213562373095) / 2;
var isoYScale = (world.tile + 3) / 1.414213562373095 / 2;
