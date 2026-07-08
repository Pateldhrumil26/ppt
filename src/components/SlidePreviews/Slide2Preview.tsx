import { useFormData } from '../../context/FormContext';
import { Users, DollarSign, TrendingUp, Landmark, Train, Bus, Plane, ShoppingBasket } from 'lucide-react';
import { getSafeImageUrl, SlideShell } from './shared';

export default function Slide2Preview() {
  const { data: { slide2: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';
  const imgSrc = s.cityImage
    ? getSafeImageUrl(s.cityImage)
    : 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop';

  const stats = [
    { icon: Users, v: s.population || '90.6 Lakh+', l: 'Population' },
    { icon: DollarSign, v: s.gdp || '$135 Billion+', l: 'GDP' },
    { icon: TrendingUp, v: s.gdpGrowth || '6.7%+', l: 'GDP Growth' },
    { icon: Landmark, v: 'World\'s 1st', l: s.worldFirst || 'Heritage City With BRTS', hi: true },
    { icon: Train, v: s.metroKm || '40 KM+', l: 'Metro Network' },
    { icon: Bus, v: s.brtsKm || '160 KM+', l: 'BRTS Network' },
    { icon: Plane, v: s.dailyFlights || '130+', l: 'Daily Flights' },
    { icon: ShoppingBasket, v: 'Top 3', l: s.retailRank || 'Fastest Growing Retail Market', hi: true },
  ];

  const infraLines = (s.infrastructure || '').split('\n').filter(Boolean);
  const half = Math.ceil(infraLines.length / 2);
  const col1 = infraLines.slice(0, half);
  const col2 = infraLines.slice(half);

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      {/* Right image */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%' }}>
        <img src={imgSrc} alt="city" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>
      {/* Left content */}
      <div style={{ position: 'absolute', inset: 0, padding: '4%', paddingRight: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '3%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>02</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1 }}>{s.cityName || 'AHMEDABAD'}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1 }}>AT A GLANCE</div>
            <div style={{ fontSize: 'clamp(5px,0.85vw,10px)', color: '#555', marginTop: 2 }}>A Thriving City. A Growing Opportunity.</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(2px,0.5vw,6px)', marginBottom: '3%' }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} style={{ border: `1px solid ${(st as any).hi ? hc : '#e5e7eb'}`, borderRadius: 5, padding: 'clamp(3px,0.7vw,8px)', background: (st as any).hi ? `${hc}09` : '#fff' }}>
                <Icon size="clamp(7px,1.2vw,14px)" style={{ color: hc, opacity: 0.7 }} strokeWidth={1.5} />
                <div style={{ fontWeight: 800, fontSize: 'clamp(7px,1.2vw,14px)', color: hc, lineHeight: 1.2, marginTop: 2 }}>{st.v}</div>
                <div style={{ fontSize: 'clamp(4px,0.65vw,8px)', color: '#666', lineHeight: 1.3 }}>{st.l}</div>
              </div>
            );
          })}
        </div>
        {/* Infrastructure */}
        <div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: hc, fontSize: 'clamp(5px,0.8vw,10px)', marginBottom: '1%' }}>UPCOMING INFRASTRUCTURE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px 12px' }}>
            {col1.map((t, i) => <div key={`a${i}`} style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: '#374151', display: 'flex', gap: 3, alignItems: 'center' }}><span style={{ color: hc, fontWeight: 700 }}>•</span>{t}</div>)}
            {col2.map((t, i) => <div key={`b${i}`} style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: '#374151', display: 'flex', gap: 3, alignItems: 'center' }}><span style={{ color: hc, fontWeight: 700 }}>•</span>{t}</div>)}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}