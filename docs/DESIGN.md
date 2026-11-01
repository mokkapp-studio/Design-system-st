---
version: alpha
name: Design Contracts
description: >-
  Sistema editorial monocromo de ejemplo para el workshop "Del prompt a la
  especificación", de Xavier Pascual · Mokkapp.com. Tinta oscura sobre
  lienzo crema, sin sombras ni acentos.
colors:
  surface-canvas: "#faf9f5"
  surface-raised: "#f0eee6"
  surface-warm: "#e3dacc"
  surface-inverse: "#000000"
  text-primary: "#141413"
  text-secondary: "#5e5d59"
  text-inverse: "#faf9f5"
  action-primary-bg: "#141413"
  action-primary-bg-hover: "#3d3d3a"
  action-primary-text: "#faf9f5"
  action-secondary-bg: "#faf9f5"
  action-secondary-bg-hover: "#f0eee6"
  action-secondary-border: "#141413"
  action-secondary-text: "#141413"
  action-tertiary-bg-hover: "#f0eee6"
  action-tertiary-border: "#87867f"
  action-tertiary-text: "#141413"
  action-disabled-bg: "#e8e6dc"
  action-disabled-text: "#87867f"
  field-bg: "#faf9f5"
  field-border: "#87867f"
  field-border-hover: "#5e5d59"
  field-border-focus: "#141413"
  field-text: "#141413"
  field-placeholder: "#5e5d59"
  field-control: "#141413"
  feedback-error-text: "#a3402a"
  feedback-error-border: "#a3402a"
  border-subtle: "#e3dacc"
  border-strong: "#141413"
  focus-ring: "#141413"
typography:
  display:
    fontFamily: "Georgia, serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.15
  title:
    fontFamily: "Georgia, serif"
    fontSize: 24px
    lineHeight: 1.3
  body:
    fontFamily: "Georgia, serif"
    fontSize: 18px
    lineHeight: 1.5
  button:
    fontFamily: "Georgia, serif"
    fontSize: 18px
    fontWeight: 600
  eyebrow:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: 14px
    textTransform: uppercase
rounded:
  control: "8px"
  surface: "16px"
spacing:
  control-x: "24px"
  control-y: "12px"
  stack-sm: "8px"
  stack-md: "16px"
  stack-lg: "24px"
  surface: "32px"
  gutter: "32px"
  section: "96px"
  focus-offset: "2px"
  field-x: "16px"
  field-gap: "4px"
  badge-x: "8px"
  badge-y: "2px"
  alert: "24px"
components:
  button-primary:
    backgroundColor: "{colors.action-primary-bg}"
    textColor: "{colors.action-primary-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.action-secondary-bg}"
    textColor: "{colors.action-secondary-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
  card-cream:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.surface}"
    padding: "32px"
  card-warm:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.surface}"
    padding: "32px"
---

<!-- Archivo GENERADO desde tokens/ por scripts/build-tokens.ts. No lo edites a mano: ejecuta npm run tokens. La prosa sale de content/brand.md. -->

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
