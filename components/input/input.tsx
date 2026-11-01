/**
 * Input · contrato: registry/json/Input.json
 * Lee el contrato antes de modificar este archivo.
 */
import { useId, type InputHTMLAttributes } from "react";
import "./input.css";

export type InputType = "text" | "email" | "password" | "search" | "tel" | "url" | "number";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "style" | "id"> & {
  label: string;
  type?: InputType;
  hint?: string;
  error?: string;
};

export function Input({ label, type = "text", hint, error, required = false, disabled = false, ...rest }: InputProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  // El contrato prohíbe estilos o clases externas.
  const { style: _s, className: _c, ...safe } = rest as typeof rest & { style?: unknown; className?: unknown };

  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      <input
        {...safe}
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="input__field"
      />
      {hint && (
        <p id={hintId} className="input__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="input__error">
          {error}
        </p>
      )}
    </div>
  );
}
