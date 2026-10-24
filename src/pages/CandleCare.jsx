import { Flame, ShieldAlert, Wind } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { usePageMeta } from '../utils/usePageMeta';

const steps = [
  { icon: Wind, title: 'Before lighting', text: 'Place your candle on a stable, heat-resistant surface and keep the surrounding area clear.' },
  { icon: Flame, title: 'While burning', text: 'Never leave a burning candle unattended. Keep away from children, pets, curtains and other flammable materials.' },
  { icon: ShieldAlert, title: 'After burning', text: 'Allow the candle and melted wax to cool before moving or handling it.' },
];

export default function CandleCare() {
  usePageMeta('Candle Care', 'How to enjoy your GLOWNEST candle safely: before lighting, while burning and after burning.');
  return (
    <>
      <div className="page-head"><div className="container"><h1>Make your GLOWNEST glow last. ✨</h1></div></div>
      <section className="section">
        <div className="container split">
          <div>
            {steps.map(({ icon: Icon, title, text }) => (
              <div key={title} style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}><Icon size={26} color="var(--rose)" aria-hidden="true" />{title}</h2>
                <p className="prose" style={{ margin: 0 }}>{text}</p>
              </div>
            ))}
            <div className="notice"><strong>Remember:</strong> Decorative candles can be beautiful even when they’re simply displayed. Always follow safe candle-burning practices when using them.</div>
          </div>
          <div className="split__media"><ProductImage src="/images/candle-care.jpg" alt="A GLOWNEST candle placed safely on a heat-resistant surface" label="Candle care photo" /></div>
        </div>
      </section>
    </>
  );
}
