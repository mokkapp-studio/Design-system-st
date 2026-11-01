/** Spec ejecutable del Checkbox: verifica registry/json/Checkbox.json */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Checkbox } from "./checkbox";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Checkbox, { label: "Quiero recibir novedades", ...props } as never));

describe("Checkbox cumple su contrato", () => {
  it("usa el checkbox nativo", () => {
    expect(render({})).toContain('type="checkbox"');
  });

  it("el input está dentro de su label (toda la etiqueta es clicable)", () => {
    expect(render({})).toMatch(/<label[^>]*>\s*<input[^>]*type="checkbox"[\s\S]*Quiero recibir novedades[\s\S]*<\/label>/);
  });

  it("refleja checked y disabled", () => {
    const html = render({ defaultChecked: true, disabled: true });
    expect(html).toMatch(/checked=""/);
    expect(html).toMatch(/disabled=""/);
  });

  it("enlaza la ayuda y el error con aria-describedby", () => {
    const html = render({ hint: "Una vez al mes", error: "Debes aceptar las condiciones" });
    const ids = html.match(/aria-describedby="([^"]*)"/)![1].split(" ");
    expect(ids).toHaveLength(2);
    for (const id of ids) expect(html).toContain(`id="${id}"`);
    expect(html).toContain('aria-invalid="true"');
  });

  it("no acepta estilos ni clases externas", () => {
    const html = render({ style: { outline: "none" }, className: "otra" });
    expect(html).not.toContain("style=");
    expect(html).not.toContain("otra");
  });
});
