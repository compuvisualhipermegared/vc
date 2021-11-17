let x = 0
function setup() {
  createCanvas(720, 500);
}

function draw() {
  background(220);
  for(let i=0;i<1000; i+=10) {
    noFill()
    stroke ("#0000FF") 
    strokeWeight(3)
    ellipse(360,250,i,i)
      
    stroke("red")
    strokeWeight(3)
    ellipse(x,250,i-500,i-500)
  }
if (x>width) {
  x= 0
} else {x= x+3}
}

