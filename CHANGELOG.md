# Changelog

Cada cambio en tokens o contratos se registra aquí, con su versión y su motivo.

## 1.1.0 · 2026-11-01
- Nuevos componentes: `Input`, `Checkbox`, `Badge` y `Alert`, cada uno con contrato, spec, código, estilos y test.
- Nuevo primitivo `color.rust.700` (#a3402a) para errores: cumple contraste AA sobre todas las superficies crema. `clay` sigue sin uso en la interfaz.
- Nuevos tokens semánticos: `color.field.*`, `color.feedback.error.*`, `font.label`, `font.helper`, `font.subtitle`, `size.control.check`, `size.border.accent` y espaciados de campo, badge y aviso.
- Nuevas reglas de contenido en `content/voice.md`: formularios, badges y avisos.

## 1.0.0 · 2026-11-01
- Primera versión del sistema: tokens primitivos y semánticos, contratos de `Button` y `Card`.
- `color.text.secondary` usa `slate.500` en lugar de `cloud.400` por contraste AA.
- Radio de controles fijado en 8px y de superficies en 16px.
