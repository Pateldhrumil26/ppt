import { useFormData } from '../../context/FormContext';
import { PREDEFINED_CATEGORIES } from '../../pages/StepperApp';
import { getSafeImageUrl, SlideShell } from './shared';

export default function Slide1Preview() {
  const { data: { slide1: s } } = useFormData();
  const theme = s.themeColor || '#3d1a6e';
  const fc = s.fontColor || '#FFFFFF';
  const bgSrc = s.backgroundImage
    ? getSafeImageUrl(s.backgroundImage)
    : 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop';
  const logoSrc = s.logo ? getSafeImageUrl(s.logo) : null;

  // Get selected category items
  const selectedCategories = (s.selectedCategories || []).map(id => PREDEFINED_CATEGORIES.find(c => c.id === id) || PREDEFINED_CATEGORIES[0]);

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: theme }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: theme }}>
        <img src={bgSrc} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(270deg,transparent 60%,${theme} 100%)` }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4%', color: fc }}>
        {/* Top */}
        <div style={{ maxWidth: '50%', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div>
            <div style={{ display: 'inline-block', background: theme, border: `2px solid ${fc}44`, borderRadius: 5, padding: '3px 10px', fontWeight: 800, fontSize: 'clamp(9px,1.4vw,16px)', marginBottom: '3%' }}>
              {s.slideNumber || '01'}
            </div>
            <h1 style={{ fontSize: 'clamp(16px,4vw,46px)', fontWeight: 900, lineHeight: 1, marginBottom: '2%', letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
              {s.title || 'MADHAV\nHIGHSTREET'}
            </h1>
            <p style={{ fontSize: 'clamp(7px,1.2vw,14px)', fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2%', whiteSpace: 'pre-line' }}>
              {s.subtitle || 'THE NEXT PREMIUM RETAIL DESTINATION'}
            </p>
            <p style={{ fontSize: 'clamp(6px,1vw,12px)', opacity: 0.7, marginBottom: '3%', whiteSpace: 'pre-line' }}>
              {s.address || 'SINDHU BHAVAN ROAD,\nBODAKDEV, AHMEDABAD'}
            </p>
            <div style={{ width: '12%', height: 2, background: fc, opacity: 0.6, marginBottom: '3%' }} />
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ marginBottom: '3%' }}>
            <p style={{ fontSize: 'clamp(5px,0.8vw,10px)', opacity: 0.55, marginBottom: '1%' }}>Presented by</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {logoSrc
                ? <img src={logoSrc} alt="logo" style={{ width: 'clamp(24px,3.5vw,45px)', height: 'clamp(24px,3.5vw,45px)', objectFit: 'contain' }} />
                : <div style={{ width: 'clamp(24px,3.5vw,45px)', height: 'clamp(24px,3.5vw,45px)', borderRadius: 4, background: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 'clamp(7px,1vw,12px)', color: '#fff', flexShrink: 0 }}>A</div>
              }
              <div>
                <div style={{ fontWeight: 800, fontSize: 'clamp(7px,1.2vw,15px)' }}>{s.companyName || 'AESTHETIC ARC'}</div>
                <div style={{ fontSize: 'clamp(5px,0.75vw,9px)', opacity: 0.55 }}>{s.companyTagline || 'PROPERTY LEASING COMPANY'}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 'clamp(2px,0.5vw,6px)' }}>
          {selectedCategories.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} style={{ background: `${fc}18`, border: `1px solid ${fc}2f`, borderRadius: 5, padding: 'clamp(4px,1vw,10px) clamp(2px,0.5vw,5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px,0.4vw,4px)' }}>
                <Icon size={24} strokeWidth={1.5} style={{ color: fc, width: 'clamp(10px,2vw,24px)', height: 'clamp(10px,2vw,24px)' }} />
                <span style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: fc, fontWeight: 600, textAlign: 'center', lineHeight: 1.2, whiteSpace: 'pre-line' }}>{c.name.replace(/\\n/g, '\n')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}