/**
 * Card · contrato: registry/json/Card.json
 * Lee el contrato antes de modificar este archivo.
 */
import type { ReactNode } from "react";
import "./card.css";

export type CardVariant = "cream" | "warm";

export type CardProps = {
  variant?: CardVariant;
  eyebrow?: string;
  title: string;
  headingLevel?: 2 | 3 | 4;
  children?: ReactNode;
};

export function Card({ variant = "cream", eyebrow, title, headingLevel = 3, children }: CardProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <article className={`card card--${variant}`}>
      {eyebrow && <p className="card__eyebrow">{eyebrow}</p>}
      <Heading className="card__title">{title}</Heading>
      {children && <div className="card__body">{children}</div>}
    </article>
  );
}
