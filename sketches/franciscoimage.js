let img; // Declare variable 'img'.

function setup() {
  createCanvas(200, 200);
  img = loadImage('https://pbs.twimg.com/profile_images/1455350332922400770/OXsbHNhN_200x200.jpg'); // Load the image
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  
}