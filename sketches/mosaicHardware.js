// VARIABLES
// Imágenes y video
let images;
let video;

let mosaicShader;
let cols;
let cells;
let palette;

// User Interface
let resolution;
let select;
let div;
let video_on;
let random_image;

const SAMPLE_RES = 30;

function preload() {
  video = createVideo(['/vc/sketches/schlossbergbahn.webm']);
  video.hide();

  mosaicShader = readShader('/vc/sketches/mosaicShader.frag');

  images = [];
  for (let i = 1; i <= 30; i++) {
    images.push(loadImage(`/vc/sketches/images/img${i}.jpg`));
  }
}

function setup() {
  createCanvas(512, 512, WEBGL);
  colorMode(RGB, 1);
  textureMode(NORMAL);
  noStroke();
  shader(mosaicShader);

  cells = createQuadrille(images);

  // Video panel
  video_on = createCheckbox('Video', false);
  video_on.position(20, 550);
  video_on.style('color', 'white');
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaicShader.setUniform('source', video);
      video.loop();
    } else {
      mosaicShader.setUniform('source', random(images));
      video.pause();
    }
  });

  // Slider panel
  div = createDiv('Resolución');
  div.position(170, 535);
  div.style('font-size', '20px');
  div.style('color', 'white');

  resolution = createSlider(3, 100, 3, 1);
  resolution.position(100, 555);
  resolution.style('width', '40%');
  resolution.input(() => {
    mosaicShader.setUniform('resolution', resolution.value());
  });

  // Select panel
  select = createSelect();
  select.position(325, 555);
  select.option('AVG');
  select.option('Luma');
  select.option('Normal');
  select.selected('Luma');
  select.changed(() => {
    mosaicShader.setUniform('debug', select.value() === 'Normal');
    mosaicShader.setUniform('avg', select.value() === 'AVG');
    mosaicShader.setUniform('color_on', false);
  });

  // Button panel
  random_image = createButton('Cambiar imagen');
  random_image.position(400, 554);
  random_image.mousePressed(changeImg);

  mosaicShader.setUniform('source', random(images));
  mosaicShader.setUniform('resolution', resolution.value());
  mosaicShader.setUniform('cols', cells.width);
  palette = createGraphics(SAMPLE_RES * cells.width, SAMPLE_RES);
  sample();
}

function changeImg() {
  if (!video_on.checked()) {
    mosaicShader.setUniform('source', random(images));
  }
}

function sample() {
  if (palette.width !== SAMPLE_RES * cells.width) {
    palette = createGraphics(SAMPLE_RES * cells.width, SAMPLE_RES);
    mosaicShader.setUniform('cols', cells.width);
  }

  cells.sort({ ascending: true, cellLength: SAMPLE_RES });
  drawQuadrille(cells, {
    graphics: palette,
    cellLength: SAMPLE_RES,
    outlineWeight: 0,
  });
  mosaicShader.setUniform('palette', palette);
}

function draw() {
  cover({ texture: true });
}
