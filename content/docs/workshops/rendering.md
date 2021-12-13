## Algoritmo de rasterización: Algoritmo de Bresenham

El algoritmo de Bresenham determina los puntos requeridos para rasterizar una aproximación línea recta. El algoritmo parte de restringir la línea a un solo píxel por columna o fila. Si la restricción se aplica horizontal o verticalmente, depende de la pendiente de la línea trazada. A partir de esta restricción, y teniendo en cuenta los puntos de comienzo y final de la línea, se calculan las coordenadas irrestrictas de los puntos, aproximándose al entero más cercano.

En la práctica, la verificación del predicado de inclusión se da transformando la ecuación canónica lineal, en una función de dos entradas (las coordenadas), sobre la cual se verifica si el resultado es cero.

{{< p5-iframe sketch="/vc/sketches/bresenham.js" width="600" height="500" >}}
