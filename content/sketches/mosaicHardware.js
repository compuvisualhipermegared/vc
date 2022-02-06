let mosaicImages;
let indexImages;
let theShader;
let img;

function preload() {
  theShader = loadShader(
    '/vc/sketches/shader.vert',
    '/vc/sketches/mosaicShader.frag',
  );
  img = loadImage('/vc/sketches/lenna.png');
  mosaicImages = loadImage('/vc/sketches/mosaicImages.jpg');
  indexImages = loadImage('/vc/sketches/indexImage.jpg');
}

function setup() {
  createCanvas(512, 512, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(theShader);

  video_on = createCheckbox('Video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('source', video_src);
      video_src.loop();
    } else {
      mosaic.setUniform('source', random(p));
      video_src.pause();
    }
  });
  video_on.position(10, 550);

  theShader.setUniform('image', img);
  theShader.setUniform('mosaicImages', mosaicImages);
  theShader.setUniform('indexImages', indexImages);
  theShader.setUniform('resolution', 20);

  slider = createSlider(3, 512, 100, 2);
  slider.position(150, 555);
  slider.style('width', '40%');
  slider.input(() => {
    theShader.setUniform('resolution', slider.value());
    redraw();
  });
  let div = createDiv('Resolución');
  div.style('font-size', '18px');
  div.style('color', 'white');
  div.position(220, 535);
}

function draw() {
  background(0);
  beginShape();
  vertex(-width / 2, -height / 2, 0, 0, 0);
  vertex(width / 2, -height / 2, 0, 1, 0);
  vertex(width / 2, height / 2, 0, 1, 1);
  vertex(-width / 2, height / 2, 0, 0, 1);
  endShape(CLOSE);

  noLoop();
}
