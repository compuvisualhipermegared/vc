let img;

function preload() {
  img = loadImage('/vc/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  image(img, 0, 0);
  noLoop();
}
