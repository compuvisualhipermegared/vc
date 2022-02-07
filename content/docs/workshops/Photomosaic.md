# Photomosaic

## Objetivo

Realizar una práctica en [shaders](https://en.wikipedia.org/wiki/Shader) al implementar por hardware un [fotomosaico](https://en.wikipedia.org/wiki/Photographic_mosaic) para imágenes y video.

## Descripción

Un fotomosaico es una imagen, usualmente una fotografía, que ha sido dividida en secciones rectangulares, usualmente del mismo tamaño, tal como es compuesto un mosaico tradicional, con la característica de que cada elemento del mosaico es reemplazado por otra fotografía con colores promedios apropiados, obtenidos por diferentes métodos, al elemento de la imagen original. Cuando es vista en detalle, los píxeles individuales se ven como la imagen principal, sin embargo al verla como un todo, es posible apreciar que la imagen está compuesta por cientos de miles de imágenes.

{{< p5-iframe sketch="/vc/sketches/mosaicHardware.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.shaderbox/p5.shaderbox.min.js" width="530" height="600" >}}
