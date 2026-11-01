/**
 * La spec ejecutable de la Card: verifica que el componente cumple
 * registry/json/Card.json.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import contract from "../../registry/json/Card.json";
import { Card, type CardVariant } from "./card";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Card, { title: "Una spec explica", ...props } as never));

describe("Card cumple su contrato", () => {
  it("usa el elemento definido en a11y.element", () => {
    expect(render({})).toMatch(new RegExp(`^<${contract.a11y.element}\\b`));
  });

  it("aplica por defecto la variante del contrato", () => {
    expect(render({})).toContain(`card--${contract.props.variant.default}`);
  });

  it.each(contract.props.variant.values as CardVariant[])("renderiza la variante %s", (variant) => {
    expect(render({ variant })).toContain(`card--${variant}`);
  });

  it("el título es un encabezado real del nivel por defecto", () => {
    expect(render({})).toContain(`<h${contract.props.headingLevel.default} class="card__title">`);
  });

  it.each(contract.props.headingLevel.values)("admite headingLevel %s", (level) => {
    expect(render({ headingLevel: level })).toContain(`<h${level} `);
  });

  it("el eyebrow es opcional", () => {
    expect(render({})).not.toContain("card__eyebrow");
    expect(render({ eyebrow: "Contrato" })).toContain("card__eyebrow");
  });
});
