/** Spec ejecutable del Alert: verifica registry/json/Alert.json */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import contract from "../../registry/json/Alert.json";
import { Alert, type AlertVariant } from "./alert";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(createElement(Alert, { title: "El pago no se ha completado", ...props } as never));

describe("Alert cumple su contrato", () => {
  it("aplica por defecto la variante del contrato", () => {
    expect(render({})).toContain(`alert--${contract.props.variant.default}`);
  });

  it.each(contract.props.variant.values as AlertVariant[])("renderiza la variante %s", (variant) => {
    expect(render({ variant })).toContain(`alert--${variant}`);
  });

  it('el error se anuncia de inmediato (role="alert")', () => {
    expect(render({ variant: "error" })).toContain('role="alert"');
  });

  it('la información se anuncia sin interrumpir (role="status")', () => {
    expect(render({ variant: "info" })).toContain('role="status"');
  });

  it("el cuerpo es opcional", () => {
    expect(render({})).not.toContain("alert__body");
    expect(render({ children: "Revisa los datos de tu tarjeta." })).toContain("alert__body");
  });
});
