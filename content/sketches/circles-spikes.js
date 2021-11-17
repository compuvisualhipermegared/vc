let num_tri = 30, 
		sep = 10,
		d = 350,
		angle = 0;

function setup(){
	createCanvas(400, 400, WEBGL);
}

function draw(){
  background(255);
  for (let i=0; i<2; i++) {
		if(i == 0) fill(183,23,116);
		else fill(56,121,110,255);
    for (let j=0; j<num_tri; j++) {
			let angle2 = TWO_PI/num_tri*j;
			let x = width/2+i*5;
			let y = height/2;
      push();
			translate(x-200, y-200);
      
      rotate(angle2);
      rotateZ(radians(angle));
			arc(0, 0, d, d, 0, radians(5));
      pop();
      
      angle +=0.01;
    }
  }
}