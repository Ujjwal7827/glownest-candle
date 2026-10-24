import { Check } from 'lucide-react';

export default function CheckoutStepper({ steps, current }) {
  return (
    <ol className="stepper" aria-label="Checkout progress">
      {steps.map((s, i) => (
        <li key={s} className={i < current ? 'is-done' : i === current ? 'is-current' : ''} aria-current={i === current ? 'step' : undefined}>
          {i < current && <Check size={12} aria-hidden="true" style={{ marginRight: 4 }} />}{s}
        </li>
      ))}
    </ol>
  );
}
