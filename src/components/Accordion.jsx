import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  const uid = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div className="accordion__item" key={it.q}>
          <h3 style={{ margin: 0 }}>
            <button type="button" className="accordion__btn" aria-expanded={open === i} aria-controls={`${uid}-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              {it.q}<ChevronDown size={20} aria-hidden="true" />
            </button>
          </h3>
          {open === i && <div className="accordion__panel" id={`${uid}-${i}`}>{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
