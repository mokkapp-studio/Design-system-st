/**
 * Documentación viva: esta página se genera desde tokens/ y registry/json.
 * Si cambias un token o un contrato, esta página cambia sola.
 */
import type { ReactNode } from "react";
import { Alert } from "../../components/alert/alert";
import { Badge, type BadgeVariant } from "../../components/badge/badge";
import { Button, type ButtonVariant } from "../../components/button/button";
import { Card, type CardVariant } from "../../components/card/card";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Input } from "../../components/input/input";
import { cssVar, loadTokens, semanticTokens } from "../../scripts/lib/tokens";
import { loadRegistry, type Contract } from "../../scripts/lib/registry";

export const metadata = { title: "Sistema · Design Contracts" };

const variants = <T,>(c: Contract) => (c.props.variant?.values ?? []) as T[];

/** Ejemplos de cada componente registrado. */
const examples: Record<string, (c: Contract) => ReactNode> = {
  Button: (c) => (
    <div className="actions">
      {variants<ButtonVariant>(c).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
      <Button disabled>disabled</Button>
    </div>
  ),
  Card: (c) => (
    <div className="grid">
      {variants<CardVariant>(c).map((v) => (
        <Card key={v} variant={v} eyebrow={`variant ${v}`} title={`Card ${v}`}>
          <p>Ejemplo generado desde el contrato.</p>
        </Card>
      ))}
    </div>
  ),
  Input: () => (
    <div className="grid">
      <Input label="Nombre" placeholder="Ada Lovelace" />
      <Input label="Correo electrónico" type="email" hint="Te enviaremos la confirmación" />
      <Input label="Correo electrónico" type="email" defaultValue="ada.lovelace" error="Escribe un correo con @" />
      <Input label="Código de invitación" disabled defaultValue="WORKSHOP-2026" />
    </div>
  ),
  Checkbox: () => (
    <div className="grid">
      <Checkbox label="Quiero recibir novedades" hint="Una vez al mes" />
      <Checkbox label="Acepto las condiciones" defaultChecked />
      <Checkbox label="Acepto las condiciones" error="Debes aceptar las condiciones para continuar" />
      <Checkbox label="Opción no disponible" disabled />
    </div>
  ),
  Badge: (c) => (
    <div className="actions">
      {variants<BadgeVariant>(c).map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
  Alert: () => (
    <div className="grid">
      <Alert title="Tu plaza está reservada">
        <p>Recibirás un correo con los detalles del workshop.</p>
      </Alert>
      <Alert variant="error" title="El pago no se ha completado">
        <p>Tu banco ha rechazado la operación. Tu carrito se mantiene.</p>
        <Button variant="secondary">Reintentar pago</Button>
      </Alert>
    </div>
  ),
};

export default function Sistema() {
  const tokens = loadTokens();
  const colors = semanticTokens(tokens).filter((t) => t.type === "color");
  const registry = loadRegistry();

  return (
    <main>
      <section className="band">
        <div className="container">
          <p className="eyebrow">Documentación viva</p>
          <h1 className="display">El sistema</h1>
          <p className="lead reading">
            Generada desde <code>tokens/</code> y <code>registry/json/</code>. {colors.length} colores semánticos y{" "}
            {registry.length} componentes registrados.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <h2 className="eyebrow">Colores semánticos</h2>
          <div className="grid">
            {colors.map((t) => (
              <div key={t.path} className="swatch">
                <div className="swatch__color" style={{ background: `var(${cssVar(t.path)})` }} />
                <span>{t.path}</span>
                <span>
                  {t.aliasOf} · {t.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {registry.map((c) => (
        <section key={c.name} className="band">
          <div className="container">
            <div className="actions">
              <h2 className="eyebrow">{c.name}</h2>
              <Badge variant="outline">{`v${c.version}`}</Badge>
              <Badge variant={c.status === "stable" ? "strong" : "neutral"}>{c.status}</Badge>
            </div>
            <p className="lead reading">{c.description}</p>
            {examples[c.name]?.(c) ?? <p className="lead">Sin ejemplo todavía.</p>}
          </div>
        </section>
      ))}
    </main>
  );
}
