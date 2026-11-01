/**
 * Checkbox · contrato: registry/json/Checkbox.json
 * Lee el contrato antes de modificar este archivo.
 */
import { useId, type InputHTMLAttributes } from "react";
import "./checkbox.css";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "style" | "id"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Checkbox({ label, hint, error, required = false, disabled = false, ...rest }: CheckboxProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const { style: _s, className: _c, ...safe } = rest as typeof rest & { style?: unknown; className?: unknown };

  return (
    <div className="checkbox">
      <label className="checkbox__row">
        <input
          {...safe}
          id={id}
          type="checkbox"
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="checkbox__control"
        />
        <span className="checkbox__label">{label}</span>
      </label>
      {hint && (
        <p id={hintId} className="checkbox__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="checkbox__error">
          {error}
        </p>
      )}
    </div>
  );
}
