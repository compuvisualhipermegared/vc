precision mediump float;

uniform sampler2D source;

uniform sampler2D palette;

uniform float cols;

uniform int options;

uniform bool debug;

uniform bool color_on;
uniform vec4 background;
uniform vec4 foreground;

uniform float resolution;

varying vec4 xVertexColor;

varying vec2 vTexCoord;

float luma(vec3 color){

    return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

}

float avg(vec3 color){
    return (color.r + color.g + color.b) / 3.0;
}

void main(){

    vec2 fontCoord = vTexCoord * resolution;
    vec2 srcCoord = floor(fontCoord);
    fontCoord = fontCoord - srcCoord;
    srcCoord = srcCoord / vec2(resolution);
    vec4 key = texture2D(source, srcCoord);

    if(debug){
        gl_FragColor = key;

    }else{

    vec2 tile = vec2((floor(avg(key.rgb) * cols) + fontCoord.s) / cols, fontCoord.t);
    vec4 paletteTexel = texture2D(palette, tile);
    gl_FragColor = color_on ? all(equal(paletteTexel, foreground)) ? key : background : paletteTexel;

  }
}