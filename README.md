# A tu ritmo

Una pequeña experiencia interactiva inspirada en la imagen adjunta: una joven dentro de una esfera de espinas, alguien que se acerca con cariño y un pingüino. En cuatro gestos, la escena pasa de un ambiente oscuro a un jardín de flores suaves.

## Empezar

1. Extrae el ZIP completo.
2. Abre la carpeta `a-tu-ritmo`.
3. Abre `index.html` con un navegador de escritorio que tenga JavaScript activado.

**No requiere servidor, instalación, cuentas ni Internet.** Las hojas de estilo, los scripts, el icono y la imagen de referencia están incluidos. No se usan fuentes remotas, paquetes ni herramientas de compilación. En un teléfono, la vista se adapta al ancho de pantalla; algunos gestores de archivos móviles no permiten ejecutar HTML local con sus archivos asociados, por lo que puede ser necesario servir la carpeta desde un alojamiento estático.

## Qué incluye

- Ilustración editable en SVG: personajes, espinas, pingüino, flores y luciérnagas.
- Cuatro etapas que avanzan únicamente al pulsar el botón.
- Transiciones suaves, destellos y transformación de las espinas en flores.
- Carta final y descarga de su texto en formato TXT.
- Personalización de destinatario, mensaje y firma.
- Sonido ambiental original sintetizado con Web Audio, apagado inicialmente.
- Reinicio de la historia, sin borrar la dedicatoria.
- Ventana para consultar la imagen que inspiró la escena.
- Diseño adaptable, navegación por teclado y respeto a la preferencia de movimiento reducido del sistema.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Estructura de la página, personajes SVG y ventanas. Es el archivo que debes abrir. |
| `styles.css` | Colores, tipografías del sistema, diseño adaptable y animaciones. |
| `app.js` | Etapas, generación de espinas y flores, sonido, personalización y descarga. |
| `config.js` | Destinatario, texto y firma de la carta. El lugar más sencillo para personalizarla antes de compartir. |
| `assets/flor.svg` | Logo e icono de la pestaña. |
| `assets/inspiracion.png` | Imagen proporcionada como referencia. Se muestra al pulsar «La inspiración». |
| `LEEME.txt` | Instrucciones rápidas. |
| `VISTA-PREVIA.png` | Vista estática de la ilustración en su etapa final. |

## Cambiar la dedicatoria y compartirla

Abre `config.js` con un editor de texto y modifica estos campos:

```js
window.DEDICATORIA = {
  para: "Para alguien especial.",
  mensaje: `Aquí puedes escribir tu mensaje.

Puedes usar varias líneas y dejar un espacio entre párrafos.`,
  firma: "Con cariño, tu nombre."
};
```

Conserva las comillas y las comas. Dentro del mensaje, evita usar otra comilla invertida; si la necesitas, escríbela como `\``. Para textos que contengan comillas dobles en destinatario o firma, escríbelas como `\"`. Guarda los archivos en UTF-8 para conservar las tildes.

La opción de la página **Personalizar dedicatoria** es útil para probar el resultado; guarda el texto en `localStorage`, dentro de ese navegador. **No modifica `config.js` ni el ZIP** y no envía información a ningún servidor. Para entregar una versión personalizada a otra persona, edita `config.js` y envía la carpeta completa comprimida.

Si ya habías guardado una carta desde la interfaz, se mostrará esa copia local. Dentro del editor, pulsa **Restaurar el texto de config.js** para volver a la configuración del archivo. Si el navegador bloquea el almacenamiento local, la dedicatoria se mantiene durante la sesión y la interfaz lo indica.

## Cambiar la historia o el aspecto

- **Textos de los cuatro gestos:** edita el arreglo `chapters` en `app.js`.
- **Título principal:** edita el elemento `h1` en `index.html`.
- **Colores:** modifica las variables de `:root` al inicio de `styles.css`, especialmente `--bg`, `--panel` y `--pink`.
- **Personajes:** modifica los grupos `girl`, `boy` y el símbolo `penguin-symbol` dentro del SVG de `index.html`.
- **Cantidad y posición de espinas o flores:** revisa `drawVine()` y `drawScene()` en `app.js`.
- **Transiciones:** busca los selectores `body[data-step="..."]` en `styles.css`.
- **Sonido:** modifica las frecuencias de `notes` en `app.js`. Solo se reproduce después de una acción voluntaria; se suspende cuando la pestaña está oculta.

## Uso y alcance

La escena es una interpretación ilustrada de la referencia, con personajes dibujados en código; no es una reproducción exacta de la imagen. El cambio de espinas a flores es un recurso narrativo. El proyecto es una experiencia visual local, sin backend ni base de datos.

La referencia adjunta se incluye únicamente como material proporcionado para este proyecto; no se atribuye su autoría al código. El botón «Guardar mi carta» descarga texto, no un PDF ni una imagen.

Para cerrar cualquiera de las ventanas, usa la ×, pulsa Escape o haz clic fuera. Puedes recorrer los controles con Tab y activarlos con Enter o la barra espaciadora.

## Revisión de esta entrega

Se revisaron la sintaxis de JavaScript, las referencias locales y la estructura del proyecto, y se renderizaron las ilustraciones inicial y final. No se completó una prueba de interacción en un navegador en el entorno de preparación; el navegador de prueba no estaba disponible. La vista previa corresponde a la ilustración, no a una captura de la página completa.
