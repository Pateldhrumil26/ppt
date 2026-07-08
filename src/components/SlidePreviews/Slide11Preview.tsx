import { useFormData } from '../../context/FormContext';
import { getSafeImageUrl, SlideShell } from './shared';
import { PREDEFINED_CATEGORIES } from '../../pages/StepperApp';

export default function Slide11Preview() {
  const { data: { slide11: s } } = useFormData();
  const tc = '#4B247A'; // theme purple

  // Get selected categories (up to 7) from form selection - only show selected ones
  const highlights = (s.selectedCategories || [])
    .slice(0, 7)
    .map(id => PREDEFINED_CATEGORIES.find(c => c.id === id) || PREDEFINED_CATEGORIES[0]);

  const iconSize = 'clamp(14px,2.2vw,28px)';
  const circleSize = 'clamp(38px,6vw,72px)';
  
  // Get building image from form upload
  const buildingSrc = s.buildingImage 
    ? getSafeImageUrl(s.buildingImage) 
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <SlideShell>
      {/* Dark purple background */}
      <div style={{ position: 'absolute', inset: 0, background: '#1a0a2e' }} />

      {/* Building image on right side - only show if uploaded */}
      {s.buildingImage && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%' }}>
          <img
            src={buildingSrc}
            alt="Building"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, #1a0a2e 0%, transparent 60%)' }} />
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '5% 5% 6% 5%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>

        {/* ── Title block ── */}
        <div>
          {/* Slide number badge */}
          <div style={{
            display: 'inline-block',
            background: tc, color: '#fff', fontWeight: 900,
            fontSize: 'clamp(9px,1.4vw,16px)',
            padding: '2px 10px', borderRadius: 4,
            marginBottom: 'clamp(6px,1vw,14px)',
          }}>
            {s.slideNumber || '14'}
          </div>

          <div style={{ fontWeight: 900, fontSize: 'clamp(16px,3.2vw,40px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            WHY INVEST IN
          </div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(16px,3.2vw,40px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 'clamp(6px,1vw,14px)' }}>
            {s.title || 'MADHAV HIGHSTREET?'}
          </div>

          {/* Purple accent underline */}
          <div style={{ width: 'clamp(28px,3.5vw,44px)', height: 3, background: tc, borderRadius: 2 }} />
        </div>

        {/* ── 7 Features in one row ── */}
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(8px,1.5vw,20px)', 
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          {highlights.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(5px,0.8vw,12px)',
                flex: '1 1 0',
                minWidth: 'clamp(50px,7vw,90px)',
              }}>
                {/* Purple-bordered circle */}
                <div style={{
                  width: circleSize, height: circleSize,
                  borderRadius: '50%',
                  border: `clamp(1.5px,0.25vw,3px) solid ${tc}`,
                  background: 'rgba(75,36,122,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  aspectRatio: '1/1',
                }}>
                  <Icon style={{ width: iconSize, height: iconSize, color: '#fff' }} strokeWidth={1.5} />
                </div>
                {/* Label below */}
                <div style={{
                  fontSize: 'clamp(5px,0.75vw,9px)', color: '#ffffffcc',
                  textAlign: 'center', lineHeight: 1.3,
                  whiteSpace: 'pre-line', fontWeight: 500,
                }}>
                  {cat.name.replace(/\\n/g, '\n')}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </SlideShell>
  );
}