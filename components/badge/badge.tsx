/**
 * Badge · contrato: registry/json/Badge.json
 * Lee el contrato antes de modificar este archivo.
 */
import "./badge.css";

export type BadgeVariant = "neutral" | "strong" | "outline";

export type BadgeProps = {
  variant?: BadgeVariant;
  children: string;
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
