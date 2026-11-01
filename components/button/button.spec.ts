/**
 * La spec ejecutable del Button: verifica que el componente cumple
 * registry/json/Button.json. Si el contrato cambia, este test lo nota.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import contract from "../../registry/json/Button.json";
import { Button, type ButtonVariant } from "./button";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Button, { children: "Leer la guía", ...props } as never));

describe("Button cumple su contrato", () => {
  it("usa el elemento definido en a11y.element", () => {
    expect(render({})).toMatch(new RegExp(`^<${contract.a11y.element}\\b`));
  });

  it("aplica por defecto la variante del contrato", () => {
    expect(render({})).toContain(`button--${contract.props.variant.default}`);
  });

  it.each(contract.props.variant.values as ButtonVariant[])("renderiza la variante %s", (variant) => {
    expect(render({ variant })).toContain(`button--${variant}`);
  });

  it('es type="button" por defecto (no envía formularios por accidente)', () => {
    expect(render({})).toContain(`type="${contract.props.type.default}"`);
  });

  it("refleja el estado disabled en el HTML", () => {
    expect(render({ disabled: true })).toMatch(/disabled=""/);
  });

  it("no acepta estilos ni clases externas que rompan el contrato", () => {
    const html = render({ style: { boxShadow: "0 0 4px red" }, className: "otra" });
    expect(html).not.toContain("style=");
    expect(html).not.toContain("otra");
  });
});
