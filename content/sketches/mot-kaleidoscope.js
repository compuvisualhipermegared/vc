let radius = 70;
let gap = 10;
let npoints = 13;

function setup() {
  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(400, 400);
}

function draw() {
  // Set the background to black and turn off the fill color
  background(255);
  noFill();

  // Rotate section
  for(let i = radius; i < radius + gap; i++ ){
    push();
    stroke(255, 0, 0);
    translate(width * 0.5, height * 0.5);
    rotate(frameCount / 200.0);
    star(0, 0, i , i + gap, npoints);
    pop();
  }

  // Inside section
  push();
  stroke(0, 62, 107);
  fill(0, 62, 107, 255);
  translate(width * 0.5, height * 0.5);
  star(0, 0, radius, radius + gap, npoints);
  pop();

  // Outside section
  for(let i = radius; i < radius + gap; i++ ){
    push();
    stroke(0, 62, 107);
    translate(width * 0.5, height * 0.5);
    star(0, 0, i + gap, i + (gap * 2), npoints);
    pop();
  }

}

function star(x, y, radius1, radius2,npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}