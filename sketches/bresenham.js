let rows = 260; // Numero de pixeles verticales
let cols = rows;// Numero de pixeles horizontales
let pxSize = 10; // Ancho por defecto del pixel
let scaleFactor = 0.25; // Factor de escala del zoom
let mx, my; // Coordenadas del mouse

let screen=[];
let strokeSize = 2;
let canDraw = false;
let slider;
let span;
function setup() {
    createCanvas(700, 700); 
    mx = 25;
    my = 25;
    for (var i = 0; i<rows; i++){
        screen[i] = []; // Crear un arreglo anidado
        for (var j = 0; j<cols; j++){
          screen[i][j] = 255;
        }
      }

      button = createButton('Borrar todo');
      button.position(30, 680);
      button.mousePressed(resetDrawing);

      slider = createSlider(0, 20, 1, 1);
      slider.position(200, 680);
      slider.style('width', '80px');

}

function draw() { 

    strokeSize = slider.value();
    background(245);
    //translate(mx, my);
    scale(scaleFactor); 

    for(var y = 0, i=0; y < rows*pxSize; y += pxSize){
        for(var x = 0,j=0 ; x < cols*pxSize; x += pxSize){  
            noStroke();
            fill(screen[x/10][y/10]);
            square(x,y,10);
        } 
    }
    stroke(0,200,0);
    //line(pmouseX/scaleFactor, pmouseY/scaleFactor, mouseX/scaleFactor, mouseY/scaleFactor);
    var px1 = 800;
    var px2 = 100;
    var py1 = 200;
    var py2 = 220;
    //line(px1, py1, px2, py2);
    //bresenham(px1, py1, px2, py2);
    if (canDraw){
        strokeWeight(10);
        line(pmouseX/scaleFactor, pmouseY/scaleFactor, mouseX/scaleFactor, mouseY/scaleFactor);
        bresenham(pmouseX/scaleFactor, pmouseY/scaleFactor, mouseX/scaleFactor, mouseY/scaleFactor);
        canDraw = false;
    }
    stroke(0);
    fill(0);
    strokeWeight(2);
    textSize(60);
    text('Grosor', 500, 2700);
}

// Funcion de Bresenham, tomada de https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
// Cambiar el orden de rasterizacion dependiendo del gradiente de la linea
function bresenham(x1, y1, x2, y2){

    //console.log(x1 +" "+ y1+ " "+ x2 +" "+ y2);
    //x1 = floor(x1); 
    //y1 = floor(y1); 
    //x2 = floor(x2); 
    //y2 = floor(y2);
    if (abs(y2 - y1) < abs(x2 - x1 )){
        if (x1 > x2){
            drawLineLow(x2, y2, x1, y1);
        }else{
            drawLineLow(x1, y1, x2, y2);
        }
    }else{
        if (y1 > y2){
            drawLineHigh(x2, y2, x1, y1);
        }else{
            drawLineHigh(x1, y1, x2, y2);
        }
    }
}

// Dibujar los aumentos de pixel a traves del eje x haciendo aumentos en y
function drawLineLow(x0, y0, x1, y1){

    var dx = x1 - x0;
    var dy = y1 - y0;
    var yi = 10;

    if (dy < 0 ){
        yi = -10;
        dy = -dy;
    }

    var D = 2*dy - dx;
    var y = y0;
    for (var x = x0; x < x1; x+=10){
        //screen[floor(x/10)][floor(y/10)] = 0;
        applyStroke(floor(x/10),floor(y/10));
        if (D>0){
            y = y + yi;
            D = D + 2*(dy-dx);
        }else{
            D = D + 2*dy;
        } 
    }
}

// Dibujar los aumentos de pixel a traves del eje y haciendo aumentos en x
function drawLineHigh(x0, y0, x1, y1){
    var dx = x1 - x0;
    var dy = y1 - y0;
    var xi = 10;

    if (dx < 0 ){
        xi = -10;
        dx = -dx;
    }

    var D = 2*dx - dx;
    var x = x0;
    for (var y = y0; y < y1; y+=10){
        //screen[floor(x/10)][floor(y/10)] = 0;
        applyStroke(floor(x/10),floor(y/10));
        if (D>0){
            x = x + xi;
            D = D + 2*(dx-dy);
        }else{
            D = D + 2*dx;
        }
    }
}


function mouseDragged(event){
    canDraw = true;
}

function applyStroke(x, y){

    if (x<cols && y<rows){

        if (strokeSize == 0){
            screen[x][y] = 10;
        }
        else{

            for (let nx = x-strokeSize; nx < x+strokeSize; nx+=1){

                for (let ny = y-strokeSize; ny < y+strokeSize; ny+=1){
                    if (nx > -1 && ny > -1 && nx < cols && ny < rows){
                        screen[nx][ny] = 10;
                    } 
                }
            }
        }
    }
}

function resetDrawing() {

    for (var i = 0; i<rows; i++){
        for (var j = 0; j<cols; j++){
            screen[i][j] = 255;
        }
    }
}


window.addEventListener("wheel", function(e){
    if(e.deltaY < 0){
        scaleFactor *= 1.05;
    }else{
        scaleFactor *= 0.95; 
    }
});