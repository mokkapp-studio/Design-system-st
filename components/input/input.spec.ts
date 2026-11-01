/** Spec ejecutable del Input: verifica registry/json/Input.json */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import contract from "../../registry/json/Input.json";
import { Input, type InputType } from "./input";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Input, { label: "Correo electrónico", ...props } as never));

const attr = (html: string, name: string) => html.match(new RegExp(`${name}="([^"]*)"`))?.[1];

describe("Input cumple su contrato", () => {
  it("renderiza un <input> con su etiqueta visible asociada", () => {
    const html = render({});
    expect(html).toContain("<input");
    const id = attr(html.slice(html.indexOf("<input")), "id");
    expect(html).toContain(`for="${id}"`);
    expect(html).toContain(">Correo electrónico</label>");
  });

  it("usa el tipo por defecto del contrato", () => {
    expect(render({})).toContain(`type="${contract.props.type.default}"`);
  });

  it.each(contract.props.type.values as InputType[])("admite type=%s", (type) => {
    expect(render({ type })).toContain(`type="${type}"`);
  });

  it("enlaza la ayuda con aria-describedby", () => {
    const html = render({ hint: "Te enviaremos la confirmación" });
    const describedBy = attr(html, "aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(html).toContain(`id="${describedBy}"`);
  });

  it("con error, marca el campo como inválido y muestra el mensaje", () => {
    const html = render({ error: "Escribe un correo con @" });
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain("Escribe un correo con @");
  });

  it("sin error, no marca el campo como inválido", () => {
    expect(render({})).not.toContain("aria-invalid");
  });

  it("no acepta estilos ni clases externas", () => {
    const html = render({ style: { boxShadow: "0 0 4px red" }, className: "otra" });
    expect(html).not.toContain("style=");
    expect(html).not.toContain("otra");
  });
});
