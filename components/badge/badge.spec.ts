/** Spec ejecutable del Badge: verifica registry/json/Badge.json */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import contract from "../../registry/json/Badge.json";
import { Badge, type BadgeVariant } from "./badge";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Badge, { children: "nuevo", ...props } as never));

describe("Badge cumple su contrato", () => {
  it("es un <span> no interactivo", () => {
    const html = render({});
    expect(html).toMatch(/^<span\b/);
    expect(html).not.toMatch(/<(button|a)\b/);
  });

  it("aplica por defecto la variante del contrato", () => {
    expect(render({})).toContain(`badge--${contract.props.variant.default}`);
  });

  it.each(contract.props.variant.values as BadgeVariant[])("renderiza la variante %s", (variant) => {
    expect(render({ variant })).toContain(`badge--${variant}`);
  });
});
