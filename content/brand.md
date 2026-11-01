## Overview

Sistema editorial y sobrio: **tinta oscura sobre lienzo crema** y nada más. La autoridad no se transmite con degradados ni colores saturados, sino con contención. La tinta (`color.text.primary`) lleva todas las acciones, enlaces y bordes fuertes; el crema (`color.surface.canvas`) es el lienzo de todas las secciones de texto.

El ritmo de página es la **alternancia de bandas**: secciones crema para leer y bandas negras a sangre para los mensajes importantes. Ese cambio de superficie es el único separador: no hay sombras, ni degradados, ni líneas decorativas.

La tipografía invierte la convención: **serif para leer**, también en botones, y **mono en mayúsculas** solo para metadatos breves (eyebrows).

## Do's and Don'ts

- Do: usa la tinta para todas las acciones primarias, enlaces y bordes fuertes.
- Don't: introducir colores de acento en la interfaz. La paleta incluye `clay`, pero no tiene ningún token semántico: es intencionado.
- Do: separa las superficies con un cambio de tono y un borde fino de 1px.
- Don't: añadir sombras (`box-shadow`) a ningún elemento.
- Do: texto de lectura en serif.
- Don't: poner en negrita los titulares serif grandes.
- Do: mono en mayúsculas solo para metadatos de una a tres palabras.
- Don't: escribir valores (hex, px) a mano en los componentes: todo sale de los tokens semánticos.
