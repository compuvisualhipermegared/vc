function setup() {
    createCanvas(600, 400);
  }
  
  function draw() {
    background(220);
    //mapping of mouseX variable and putting in the local       variable'k'.
    let k = map(mouseX, 0, width, 200, 0)
  
    //Circle 1
    noStroke()
    fill('yellow')
    ellipse(160, 200, 50, 50)
  
    //Circle 1 petals colour
    fill(155, 0, 215, k)
  
    //upper petals
    ellipse(110, 120, 90, 90)
    ellipse(210, 120, 90, 90)
  
    //lower petals
    ellipse(110, 280, 90, 90)
    ellipse(210, 280, 90, 90)
  
    //sides petals
    ellipse(60, 200, 90, 90)
    ellipse(260, 200, 90, 90)
  
    //Circle 2
    fill('yellow')
    ellipse(450, 200, 50, 50)
  
    //Circle 2 petals color
    fill(155, 0, 215, k)
  
    //up and down petals
    ellipse(450, 154, 25, 25)
    ellipse(450, 246, 25, 25)
  
    // side petals
    ellipse(400, 200, 25, 25)
    ellipse(500, 200, 25, 25)
  
    //lower middle
    ellipse(415, 235, 25, 25)
    ellipse(485, 235, 25, 25)
  
    //upper middle
    ellipse(415, 164, 25, 25)
    ellipse(485, 164, 25, 25)
  
  }