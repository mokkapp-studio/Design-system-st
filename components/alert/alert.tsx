/**
 * Alert · contrato: registry/json/Alert.json
 * Lee el contrato antes de modificar este archivo.
 */
import type { ReactNode } from "react";
import "./alert.css";

export type AlertVariant = "info" | "error";

export type AlertProps = {
  variant?: AlertVariant;
  title: string;
  children?: ReactNode;
};

export function Alert({ variant = "info", title, children }: AlertProps) {
  return (
    <div className={`alert alert--${variant}`} role={variant === "error" ? "alert" : "status"}>
      <p className="alert__title">{title}</p>
      {children && <div className="alert__body">{children}</div>}
    </div>
  );
}
