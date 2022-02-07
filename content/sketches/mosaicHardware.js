let mosaicImages;
let indexImages;
let theShader;
let img;

function preload() {
  video_src = createVideo(['/vc/sketches/fingers.webm']);
  video_src.hide();
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

  theShader.setUniform('image', img);
  theShader.setUniform('mosaicImages', mosaicImages);
  theShader.setUniform('indexImages', indexImages);
  theShader.setUniform('resolution', 3);
  theShader.setUniform('symbols', true);

  slider = createSlider(3, 100, 3, 1);
  slider.position(150, 555);
  slider.style('width', '40%');
  slider.input(() => {
    theShader.setUniform('resolution', slider.value());
    redraw();
  });

  video_on = createCheckbox('Video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    if (video_on.checked()) {
      theShader.setUniform('image', video_src);
      theShader.setUniform('mosaicImages', mosaicImages);
      theShader.setUniform('indexImages', indexImages);
      theShader.setUniform('resolution', slider.value());
      video_src.loop();
    } else {
      theShader.setUniform('image', img);
      theShader.setUniform('mosaicImages', mosaicImages);
      theShader.setUniform('indexImages', indexImages);
      theShader.setUniform('resolution', slider.value());
      video_src.pause();
    }
  });
  video_on.position(10, 550);

  keys_on = createCheckbox('Keys', false);
  keys_on.style('color', 'white');
  keys_on.changed(() => {
    if (keys_on.checked()) {
      theShader.setUniform('symbols', false);
    } else {
      theShader.setUniform('symbols', true)
    }
  });
  keys_on.position(70, 550);

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
}
