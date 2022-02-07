# Ray Tracing

## ¿Conoces lo que es Ray Tracing?


¡Bienvenid@s a una investigación sobre rendering y Ray Tracing!


A continuación vamos a presentar el rendering, para ello vamos primero a introducir el tema, luego ahondaremos en unos conceptos en el marco teórico, explicaremos el algoritmo de Ray Tracing, se explicara el pseudocódigo que le da vida, así como también usos del Ray Tracing en la actualidad.

¡Lo olvidaba! Por supuesto, al final encuentras las referencias y bibliografía.

¡Esperamos que la información presentada sea de tu agrado!

## Introducción

¿Qué es el rendering? 

![Imagen](http://biblus.accasoftware.com/es/wp-content/uploads/sites/3/2017/05/Rendering-vantaggio_header.jpg) [Tomado de: [aquí](http://biblus.accasoftware.com/es/wp-content/uploads/sites/3/2017/05/Rendering-vantaggio_header.jpg)]

¿Un algoritmo? ¿Una librería? ¿Una serie de imágenes que nos permiten visualizar un objeto en 3D?

Pues bueno, el proyecto open source de [scratchpixel](https://www.scratchapixel.com/), nos dice que el rendering es el proceso por el cual una imagen de una escena 3D es creada. Sin importar cuál técnica se use para crear dicho modelo 3D, por lo cual el proceso de renderizado es un paso necesario para crear y visualizar cualquier mundo virtual en 3 dimensiones. Es evidente que dicho proceso es realizado por un computador, por ello áreas como la geometría, la física, cálculo vectorial y la programación son fundamentales para la generación de estás imágenes.

![Imagen2](https://www.scratchapixel.com/images/design/logo_scratchapixel2015.png) 

[Tomado de: [aquí](https://www.scratchapixel.com/images/design/logo_scratchapixel2015.png)]

Cómo puede llegarse a intuir, el rendering es una tarea computacionalmente costosa, y dicho costo depende de la “cantidad” de geometría aplicada a las escenas que se quieran renderizar, así como de cuán real queremos que se vea nuestra imagen.

Otro aspecto importante es que existen diferentes tipos de render. En tiempo real y “fuera de línea”. Un ejemplo del primero son los videojuegos, en el cual se tienen que renderizar imágenes a un ritmo de 60 cuadros por segundo, generalmente. Para el caso contrario, encontramos las películas animadas por ejemplo, en donde se renderiza a 24, 30 o 60 cuadros por segundo.

Ahora bien, con el concepto inicial claro, procedemos a realizar un breve recorrido histórico del rendering y posteriormente profundizaremos en algunos conceptos clave. 

## Marco Teórico

Investigadores desde la década de los 70 han trabajado en técnicas para generar imágenes mediante computadores, aprovechando la gran capacidad de procesamiento que poseían las máquinas, inclusive en esa época. La manera que encontraron para solucionar este problema fue la rasterización. Básicamente lo que hicieron fue:


1. Generar una imagen en 2 dimensiones, por ejemplo un triángulo (a partir de 3 puntos).
2. Suponer que estamos en un espacio 3D y ubicar dicho triángulo en algún lugar del espacio.
3. Ubicar una cámara en algún punto del espacio, que será el punto de perspectiva.
4. Frente a la cámara, ubicar una grilla donde cada “cuadrado” equivale a un pixel de nuestra imagen a renderizar, es decir, el triángulo.
5. Trazar, desde el punto donde está la cámara, líneas hasta cada uno de los vértices del triángulo.
6. Los “cuadrados” donde esas líneas intersectan la grilla, serán los límites del triángulo.
7. Por último, se itera sobre todos los cuadros de la grilla verificando si cada pixel contiene alguna parte del triángulo proyectado, en caso de ser verdadero “coloree” dicho pixel basado en las propiedades de sombreado y material que aplican al triángulo. Si no, no haga nada.

De esta manera, se explica brevemente el algoritmo de rasterización, el cual, como se mencionaba anteriormente, fue el inicio de las imágenes generadas por computador.

Paralelamente, Arthur Appel (1968), quien era un investigador de IBM, presentó una alternativa para la rasterización. Él lo llamó, [Ray Casting](https://graphics.stanford.edu/courses/Appel.pdf). 

Para facilitar la comprensión es importante mencionar que la rasterización es un proceso que se basa en el objeto, porque se dibujan los rayos desde el objeto hasta la cámara; en cambio, Ray Casting se basa en la imagen, acá lo que se busca es lanzar tantos rayos desde la cámara como pixeles se tengan en la grilla.

Esta técnica soluciona problemas de visibilidad que se presentaban con la rasterización (aunque luego se desarrollaría una técnica llamada Z-Buffer, que genera un mapa de profundidad y compara todos los elementos contra este mapa). Sin embargo, existe un problema con el Ray Casting y es que es necesario comparar cada rayo contra cada objeto y esta fue la razón por la que esta técnica fue ignorada en los 70’s.

Sin embargo, con el paso de los años no era posible dar respuesta a estas 3 preguntas de manera eficiente con la rasterización:

* ¿Cómo se pueden simular sombras?
* ¿Cómo se pueden simular refracciones de la luz?
* ¿Cómo se pueden simular reflexiones de la luz?

Es así como en 1980, Turner Whitted, quien trabaja para Bell Labs, publica un paper titulado “An Improved Illumination Model for Shaded Display”, el cual solucionaría las 3 problemáticas que se tenían con la rasterización.

A continuación se observa la imagen de 512x512 pixeles, que renderizo Whitted con su algoritmo, el cual tardó tan solo... ¡72 minutos!

![Imagen4](https://digitalartarchive.siggraph.org/wp-content/uploads/2018/08/1981-Turner_Whitted-Untitles-Ray-Traced-Spheres1979.jpg) [Tomado de: [aquí](https://digitalartarchive.siggraph.org/wp-content/uploads/2018/08/1981-Turner_Whitted-Untitles-Ray-Traced-Spheres1979.jpg)]

Este paper fue el inicio de “cambio de paradigma” debido a que solucionaba problemas fundamentales que se tenían para la representación del mundo real mediante imágenes generadas por computador.

Sin embargo, esta no sería la solución a todos los problemas. ¡Qué lástima!

Ahora, se tenían problemas como el desenfoque de movimiento o motion blur, así como la profundidad de campo o depth of field, que aunque serían relativamente sencillos de resolver, serían una piedra del zapato…

Aunque eran diminutas, comparadas con la iluminación indirecta, el cual es un fenómeno real que sucede porque la luz rebota no solo en los objetivos que buscamos representar en 3D, si no en los demás elementos del ambiente, por ejemplo una pared.

Es por eso que James Kajiya, en 1986, con su paper “The Rendering Equation”, usuaria las matemáticas, apoyado en las leyes de la conservación de la energía  y las ecuaciones de Maxwell para simular la luz que debería ser percibida en cada pixel de nuestra imagen. Sin embargo, su ecuación presenta una integral que tiene un costo computacional bastante alto de calcular.

Es por ello que trabajos futuros buscarían alternativas para simplificar este proceso, soluciones como la radiosidad fueron primeras aproximaciones, pero el desarrollo de la integración de Monte Carlo, la cual es un método probabilístico de aproximación donde se soluciona la integral para una gran cantidad de valores aleatorios y luego se calcula el promedio.

Si bien en las últimas décadas se han generado avances significativos, se tiene la ley de Blinn para tampoco emocionarse tanto, la cual afirma que: “Mientras la tecnología avance, el tiempo de renderizado permanece constante”

Como hemos observado, los retos surgen constantemente, pero de la misma manera se han producido soluciones que han ayudado a avanzar y llegar a tener imágenes más fieles en cuanto a representación de la realidad se refiere, todo esto, a un precio accesible para los consumidores promedio como tú y como yo.

Ahora se explica el algoritmo de Ray Tracing de manera más detallada.

**Nota**: Para la sección del marco teórico nos basamos en el guión del video “The Science of Rendering Photorealistic CGI“, el cual se encuentra listado en las referencias.

## Algoritmo de Ray Tracing

Es una técnica que consiste en simular de forma simplificada el comportamiento de los rayos de luz
que inciden sobre un objeto y que son vistos por un observador. El algoritmo traza los rayos desde el
observador procesando las posibles intersecciones de ese rayo con los objetos y trazándose nuevamente otro rayo si es necesario para los fectos de reflexión o refracción.


El componente mas importante de esta técnica es el observador, porque es de donde salen los rayos y dicta cómo será la imagen final, basado en:

1. El tipo de proyección: Puede ser central o paralela. El primero consiste en tener un punto fijo y desde él trazar los rayos hacia la escena, mientras que el segundo traza los rayos de forma paralela al osbservador que va cambiando su posición.

![Imagen5](https://www.ecured.cu/images/7/77/Proyeccin_tipos.png)  [Tomado de: [ecured](https://www.ecured.cu/images/7/77/Proyeccin_tipos.png)]

2. El vector que indica cuál es el arriba para el observador

3. La distancia mínima y máxima

Este algoritmo lo que hace es ir pixel por pixel de la imagen y le va pasando el rayo que sale desde el observador, cuando se intersecta con un elemento se le aplica un modelo de color para diferenciarlo del fondo de la imagen y un modelo de iluminación para determinar el proceso de reflexión de la luz que se refleja hacia el observador.

![Imagen6](https://www.scratchapixel.com/images/upload/ray-tracing-refresher/rt-setup2.png)  [Tomado de: [scratchapixel](https://www.scratchapixel.com/images/upload/ray-tracing-refresher/rt-setup2.png)]

A continuación se muestra el pseudo código de este algoritmo

```
// loop over all pixels
Vec3f *framebuffer = new Vec3f[imageWidth * imageHeight]; 
for (int j = 0; j < imageHeight; ++j) { 
    for (int i = 0; i < imageWidth; ++i) { 
        for (int k = 0; k < numObjectsInScene; ++k) { 
            Ray ray = buildCameraRay(i, j); 
            if (intersect(ray, objects[k]) { 
                // do complex shading here but for now basic (just constant color)
                framebuffer[j * imageWidth + i] = objects[k].color; 
            } 
            else { 
                // or don't do anything and leave it black
                framebuffer[j * imageWidth + i] = backgroundColor; 
            } 
        } 
    } 
} 
```

## Algoritmo de rasterización: Algoritmo de Bresenham

El algoritmo de Bresenham determina los puntos requeridos para rasterizar una aproximación línea recta. El algoritmo parte de restringir la línea a un solo píxel por columna o fila. Si la restricción se aplica horizontal o verticalmente, depende de la pendiente de la línea trazada. A partir de esta restricción, y teniendo en cuenta los puntos de comienzo y final de la línea, se calculan las coordenadas irrestrictas de los puntos, aproximándose al entero más cercano.

En la práctica, la verificación del predicado de inclusión se da transformando la ecuación canónica lineal, en una función de dos entradas (las coordenadas), sobre la cual se verifica si el resultado es cero.

{{< p5-iframe sketch="/vc/sketches/bresenham.js" width="600" height="500" >}}


## Referencias:

* https://visualcomputing.github.io/Rendering/#/5 
* https://graphics.stanford.edu/courses/Appel.pdf 
* https://www.scratchapixel.com/ 
* https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing 
* https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview 
* https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle 
* https://www.scratchapixel.com/lessons/3d-basic-rendering/intro-rendering-whats-next 
* https://www.youtube.com/watch?v=Qx_AmlZxzVk&ab_channel=FilmmakerIQ 
* https://www.nvidia.com/es-la/geforce/rtx/ 
* https://developer.nvidia.com/rtx/raytracing 
* https://www.cgw.com/Press-Center/Web-Exclusives/2013/Blinn-s-Law-and-the-Paradox-of-Increasing-Perfor.aspx
* https://repositorio.utp.edu.co/dspace/bitstream/handle/11059/5385/0066M779%20_Anexo.pdf
