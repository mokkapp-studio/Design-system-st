/**
 * Button · contrato: registry/json/Button.json
 * Lee el contrato antes de modificar este archivo.
 */
import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> & {
  variant?: ButtonVariant;
  children: string;
};

export function Button({ variant = "primary", type = "button", disabled = false, children, ...rest }: ButtonProps) {
  // El contrato prohíbe estilos o clases externas: se descartan aunque lleguen en tiempo de ejecución.
  const { style: _style, className: _className, ...safe } = rest as typeof rest & { style?: unknown; className?: unknown };
  return (
    <button {...safe} type={type} disabled={disabled} className={`button button--${variant}`}>
      {children}
    </button>
  );
}
