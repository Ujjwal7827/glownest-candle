import { useId } from 'react';

// as: 'input' | 'select' | 'textarea'. Pass options for select.
export default function FormField({ label, name, value, onChange, error, hint, as = 'input', options = [], required = false, className = '', ...rest }) {
  const id = useId();
  const describedBy = [error ? `${id}-err` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;
  const common = { id, name, value, onChange, 'aria-invalid': error ? 'true' : 'false', 'aria-describedby': describedBy, 'aria-required': required || undefined, ...rest };
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {as === 'select' ? (
        <select {...common}>
          {options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
      ) : as === 'textarea' ? (
        <textarea {...common} />
      ) : (
        <input {...common} />
      )}
      {hint && <span className="field__hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="field__error" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  );
}
