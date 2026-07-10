import { useState, useRef, useCallback } from 'react';
import { useFormData } from '../context/FormContext';
import { useSlideFinalization } from '../context/SlideFinalizationContext';
import { generateSnapshotPDF } from '../utils/pdf/snapshotPdfGenerator';
import html2canvas from 'html2canvas';
import JsonPreviewPanel from '../components/JsonPreviewPanel';
import {
  Shirt, ShoppingBag, Leaf, Utensils, MonitorSmartphone, ShoppingCart,
  Building2, HeartPulse, Ticket, Gamepad2, Users, DollarSign, TrendingUp,
  Landmark, Train, Bus, Plane, ShoppingBasket, MapPin, Route,
  CheckCircle2, Loader2, Clock, Calendar, Diamond, ChevronRight,
  ChevronLeft, Download, Eye, Ruler, Expand, Car, Map, Briefcase, Sun, Building, Gem, ArrowUpDown, ScanLine, BarChart3,
  Phone, Mail, Globe, Code,
  Pill, Coffee, ChefHat, CreditCard, Dumbbell, Scissors, Sparkles,
  Footprints, Baby, Home, Tv, BookOpen, Glasses, Stethoscope
} from 'lucide-react';



// Helper to avoid dark line rendering artifacts in linear-gradients by creating a transparent version of a hex color
function getTransparentColor(hex: string): string {
  if (!hex || typeof hex !== 'string') return 'rgba(255,255,255,0)';
  const cleaned = hex.trim();
  if (cleaned.startsWith('#')) {
    const r = parseInt(cleaned.slice(1, 3), 16) || 0;
    const g = parseInt(cleaned.slice(3, 5), 16) || 0;
    const b = parseInt(cleaned.slice(5, 7), 16) || 0;
    return `rgba(${r},${g},${b},0)`;
  }
  return 'rgba(255,255,255,0)';
}

// Helper to safely get an image URL whether it's a File object or a string URL
const getSafeImageUrl = (source: any): string | undefined => {
  if (!source) return undefined;
  if (typeof source === 'string') return source;
  if (source instanceof File || source instanceof Blob) {
    try {
      return URL.createObjectURL(source);
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
};

// Helper to get safe file name for display (handles string URLs and File objects)
const getFileName = (source: any): string => {
  if (!source) return '';
  if (typeof source === 'string') {
    try {
      const url = new URL(source);
      const pathname = url.pathname;
      return pathname.substring(pathname.lastIndexOf('/') + 1) || 'Sample Image';
    } catch {
      return 'Sample Image';
    }
  }
  return source.name || 'Uploaded File';
};


// ─────────────────────── SLIDE PREVIEW COMPONENTS ───────────────────────────

// Import slide preview components (only existing ones)
// import Slide1Preview from '../components/SlidePreviews/Slide1Preview';
// import Slide2Preview from '../components/SlidePreviews/Slide2Preview';

// Export PREDEFINED_CATEGORIES for use in other components (15 investment-based categories)
export const PREDEFINED_CATEGORIES = [
  { id: 'cat_1', name: 'Prime Location', icon: MapPin, emoji: '📍' },
  { id: 'cat_2', name: 'Premium Brands', icon: Gem, emoji: '💎' },
  { id: 'cat_3', name: 'High Footfall', icon: Users, emoji: '👥' },
  { id: 'cat_4', name: 'Modern Architecture', icon: Building2, emoji: '🏢' },
  { id: 'cat_5', name: 'Excellent Connectivity', icon: Route, emoji: '🛣️' },
  { id: 'cat_6', name: 'Strong Investment Returns', icon: TrendingUp, emoji: '📈' },
  { id: 'cat_7', name: 'Future Growth', icon: ArrowUpDown, emoji: '↗️' },
  { id: 'cat_8', name: 'Retail Opportunity', icon: ShoppingBag, emoji: '🛍️' },
  { id: 'cat_9', name: 'F&B Potential', icon: Utensils, emoji: '🍽️' },
  { id: 'cat_10', name: 'Corporate Hub', icon: Briefcase, emoji: '💼' },
  { id: 'cat_11', name: 'Lifestyle Destination', icon: Leaf, emoji: '🌿' },
  { id: 'cat_12', name: 'Entertainment Zone', icon: Ticket, emoji: '🎬' },
  { id: 'cat_13', name: 'Health & Wellness', icon: HeartPulse, emoji: '❤️' },
  { id: 'cat_14', name: 'Smart Design', icon: Diamond, emoji: '💠' },
  { id: 'cat_15', name: 'High Visibility', icon: Eye, emoji: '👁️' },
];

const SlideShell = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    width: '100%',
    aspectRatio: '16/9',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    fontFamily: 'Inter, Arial, sans-serif',
  }}>
    {children}
  </div>
);

/**
 * Reusable global footer component for slide previews.
 * Renders a minimal branded footer bar at the bottom of the slide with:
 *   - Aesthetic Arc logo (from slide1 or slideContact)
 *   - Company name
 *   - City name (from slide2)
 *   - Website
 *   - Slide number
 * Automatically adapts to dark/light backgrounds via the `isDark` prop.
 */
function SlidePreviewFooter({ slideNum, isDark = false }: { slideNum: string; isDark?: boolean }) {
  const { data } = useFormData();
  const logoSrc = data.slideContact.companyLogo
    ? getSafeImageUrl(data.slideContact.companyLogo)
    : data.slide1.logo
      ? getSafeImageUrl(data.slide1.logo)
      : null;
  const companyName = data.slideContact.companyName || data.slide1.companyName || '';
  const cityName = (data.slide2.cityName || 'Ahmedabad').toUpperCase();
  const website = (data.slideContact.website || 'www.aestheticarc.com').toLowerCase();

  const dividerColor = isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0';
  const textColor = isDark ? 'rgba(255,255,255,0.6)' : '#324D7B';
  const nameColor = isDark ? '#ffffff' : '#7D3C70';

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'clamp(28px, 4.8%, 42px)',
      borderTop: '1px solid ' + dividerColor,
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%',
      gap: 'clamp(4px, 0.8vw, 10px)',
      zIndex: 10,
      background: isDark ? 'rgba(13, 4, 32, 0.45)' : 'rgba(255, 255, 255, 0.82)',
      backdropFilter: 'blur(8px)',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      {/* Logo */}
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="Logo"
          style={{
            width: 'clamp(16px, 2.2vw, 24px)',
            height: 'clamp(16px, 2.2vw, 24px)',
            objectFit: 'contain',
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          width: 'clamp(16px, 2.2vw, 24px)',
          height: 'clamp(16px, 2.2vw, 24px)',
          borderRadius: 4,
          background: '#7D3C70',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(8px, 1.1vw, 12px)',
          fontWeight: 800,
          color: '#fff',
          flexShrink: 0,
        }}>
          A
        </div>
      )}

      {/* Company Name */}
      {companyName && (
        <span style={{
          fontSize: 'clamp(6px, 0.85vw, 12px)',
          fontWeight: 800,
          color: nameColor,
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {companyName}
        </span>
      )}

      {/* Separator dot */}
      <span style={{ fontSize: 'clamp(4px, 0.6vw, 8px)', color: '#FF8435', fontWeight: 'bold' }}>•</span>

      {/* City Name */}
      <span style={{
        fontSize: 'clamp(6px, 0.8vw, 11px)',
        fontWeight: 600,
        color: textColor,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}>
        {cityName}
      </span>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Website */}
      <span style={{
        fontSize: 'clamp(6px, 0.8vw, 11px)',
        color: textColor,
        whiteSpace: 'nowrap',
        fontWeight: 500,
      }}>
        {website}
      </span>
    </div>
  );
}

function Slide1Preview() {
  const { data: { slide1: s } } = useFormData();
  const theme = s.themeColor || '#3d1a6e';
  const fc = s.fontColor || '#FFFFFF';
  const bgSrc = (s.backgroundImage ? getSafeImageUrl(s.backgroundImage) : null) || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';
  const logoSrc = s.logo ? getSafeImageUrl(s.logo) : null;

  // Get selected category items
  const selectedCategories = (s.selectedCategories || []).map(id => PREDEFINED_CATEGORIES.find(c => c.id === id) || PREDEFINED_CATEGORIES[0]);

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: theme }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%' }}>
        <img src={bgSrc} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(270deg,${getTransparentColor(theme)} 60%,${theme} 100%)` }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5%', color: fc }}>
        {/* Top */}
        <div style={{ maxWidth: '50%', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div>
            <div style={{ display: 'inline-block', background: theme, border: `2px solid ${fc}44`, borderRadius: 5, padding: '3px 10px', fontWeight: 800, fontSize: 'clamp(9px,1.4vw,16px)', marginBottom: '3%' }}>
              {s.slideNumber || ''}
            </div>
            <h1 style={{ fontSize: 'clamp(16px,4vw,46px)', fontWeight: 900, lineHeight: 1, marginBottom: '2%', letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
              {s.title || ''}
            </h1>
            <p style={{ fontSize: 'clamp(7px,1.2vw,14px)', fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2%', whiteSpace: 'pre-line' }}>
              {s.subtitle || ''}
            </p>
            <p style={{ fontSize: 'clamp(6px,1vw,12px)', opacity: 0.7, marginBottom: '3%', whiteSpace: 'pre-line' }}>
              {s.address || ''}
            </p>
            <div style={{ width: '12%', height: 2, background: fc, opacity: 0.6, marginBottom: '3%' }} />
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ marginBottom: '3%' }}>
            <p style={{ fontSize: 'clamp(5px,0.8vw,10px)', opacity: 0.55, marginBottom: '1%' }}>Presented by</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {logoSrc && (
                <img src={logoSrc} alt="logo" style={{ width: 'clamp(24px,3.5vw,45px)', height: 'clamp(24px,3.5vw,45px)', objectFit: 'contain' }} />
              )}
              <div>
                <div style={{ fontWeight: 800, fontSize: 'clamp(7px,1.2vw,15px)' }}>{s.companyName || ''}</div>
                <div style={{ fontSize: 'clamp(5px,0.75vw,9px)', opacity: 0.55 }}>{s.companyTagline || ''}</div>
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

function Slide2Preview() {
  const { data: { slide2: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.cityImage ? getSafeImageUrl(s.cityImage) : null) || 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop';

  const stats = [
    { icon: Users, v: s.population || '', l: 'Population' },
    { icon: DollarSign, v: s.gdp || '', l: 'GDP' },
    { icon: TrendingUp, v: s.gdpGrowth || '', l: 'GDP Growth' },
    { icon: Landmark, v: 'World\'s 1st', l: s.worldFirst || '', hi: true },
    { icon: Train, v: s.metroKm || '', l: 'Metro Network' },
    { icon: Bus, v: s.brtsKm || '', l: 'BRTS Network' },
    { icon: Plane, v: s.dailyFlights || '', l: 'Daily Flights' },
    { icon: ShoppingBasket, v: 'Top 3', l: s.retailRank || '', hi: true },
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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 40%,white 100%)' }} />
      </div>
      {/* Left content */}
      <div style={{ position: 'absolute', inset: 0, padding: '4% 4% 11% 4%', paddingRight: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '3%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>02</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1 }}>{s.cityName || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1 }}>AT A GLANCE</div>
            <div style={{ fontSize: 'clamp(5px,0.85vw,10px)', color: '#555', marginTop: 2 }}>A Thriving City. A Growing Opportunity.</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(6px,1vw,12px)', marginBottom: '4%' }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} style={{ 
                border: `1.5px solid ${(st as any).hi ? hc : '#e5e7eb'}`, 
                borderRadius: 8, 
                padding: 'clamp(6px,1.1vw,12px) clamp(4px,0.8vw,10px)', 
                background: (st as any).hi ? `${hc}08` : '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 'clamp(62px, 11vw, 110px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginTop: '2%' }}>
            {col1.map((t, i) => <div key={`a${i}`} style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: '#374151', display: 'flex', gap: 3, alignItems: 'center' }}><span style={{ color: hc, fontWeight: 700 }}>•</span>{t}</div>)}
            {col2.map((t, i) => <div key={`b${i}`} style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: '#374151', display: 'flex', gap: 3, alignItems: 'center' }}><span style={{ color: hc, fontWeight: 700 }}>•</span>{t}</div>)}
          </div>
        </div>
      </div>
      <SlidePreviewFooter slideNum="02" />
    </SlideShell>
  );
}

function Slide3Preview() {
  const { data: { slide3: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.mapImage ? getSafeImageUrl(s.mapImage) : null) || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop';

  const points = [
    { icon: MapPin, t: s.point1Title || '', d: s.point1Desc || '' },
    { icon: Route, t: s.point2Title || '', d: s.point2Desc || '' },
    { icon: Building2, t: s.point3Title || '', d: s.point3Desc || '' },
  ];

  const titleLines = (s.locationTitle || '').split('\n');

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 35%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '4%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>03</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(10px,2.2vw,26px)', color: hc, lineHeight: 1.1 }}>{titleLines[0] || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(10px,2.2vw,26px)', color: ac, lineHeight: 1.1 }}>{titleLines[1] || ''}</div>
          </div>
        </div>
        <div style={{ marginBottom: '4%', fontSize: 'clamp(6px,1vw,12px)', color: '#374151', fontWeight: 500, whiteSpace: 'pre-line' }}>
          {s.address || ''}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vw,12px)', marginBottom: '5%' }}>
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)' }}>{p.t}</div>
                  {p.d && <div style={{ fontSize: 'clamp(4px,0.8vw,9px)', color: '#6b7280' }}>{p.d}</div>}
                </div>
              </div>
            );
          })}
        </div>
        <button style={{ marginTop: 'auto', background: ac, color: '#fff', fontWeight: 700, fontSize: 'clamp(5px,0.9vw,11px)', padding: 'clamp(4px,0.8vw,9px) clamp(8px,1.5vw,18px)', borderRadius: 30, border: 'none', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', width: 'fit-content' }}>
          <MapPin size="clamp(7px,1vw,12px)" /> VIEW ON GOOGLE MAPS
        </button>
      </div>
      <SlidePreviewFooter slideNum="03" />
    </SlideShell>
  );
}

function Slide4Preview() {
  const { data: { slide4: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.projectImage ? getSafeImageUrl(s.projectImage) : null) || 'https://images.unsplash.com/photo-1570129476815-ba368ac77011?q=80&w=800&auto=format&fit=crop';

  const features = [
    { icon: Building2, t: s.feature1Title || '', d: s.feature1Desc || '' },
    { icon: Landmark, t: s.feature2Title || '', d: s.feature2Desc || '' },
    { icon: Diamond, t: s.feature3Title || '', d: s.feature3Desc || '' },
    { icon: Calendar, t: s.possessionLabel || '', d: s.possessionDate || '' },
  ].filter(f => f.t || f.d);

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 40%,white 100%)' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '6%', background: hc, color: '#fff', padding: 'clamp(6px,1vw,11px) clamp(10px,1.6vw,18px)', borderRadius: 8, textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}>
          <div style={{ fontSize: 'clamp(4px,0.6vw,7px)', letterSpacing: '0.12em', opacity: 0.65, marginBottom: 2 }}>EXPECTED POSSESSION</div>
          <div style={{ fontSize: 'clamp(8px,1.5vw,17px)', fontWeight: 900, letterSpacing: '0.05em' }}>{(s.possessionDate || '').toUpperCase()}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>04</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: hc, lineHeight: 1.1 }}>PROJECT</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: ac, lineHeight: 1.1 }}>SHOWCASE</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,18px)' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)' }}>{f.t}</div>
                  <div style={{ fontSize: 'clamp(4px,0.8vw,9px)', color: '#6b7280' }}>{f.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum="04" />
    </SlideShell>
  );
}

function Slide5Preview() {
  const { data: { slide5: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.constructionImage ? getSafeImageUrl(s.constructionImage) : null) || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';

  const items = [
    { icon: CheckCircle2, t: s.progress1Title || '', st: s.progress1Status || '' },
    { icon: Loader2, t: s.progress2Title || '', st: s.progress2Status || '' },
    { icon: Clock, t: s.progress3Title || '', st: s.progress3Status || '' },
    { icon: Calendar, t: s.progress4Title || '', st: s.progress4Status || '' },
  ].filter(it => it.t || it.st);

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="construction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 40%,white 100%)' }} />
        <div style={{ position: 'absolute', bottom: '6%', right: '4%', background: hc, color: '#fff', padding: 'clamp(5px,0.9vw,10px) clamp(8px,1.4vw,16px)', borderRadius: 7, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(4px,0.6vw,7px)', letterSpacing: '0.12em', opacity: 0.65, marginBottom: 2 }}>CURRENT STATUS</div>
          <div style={{ fontSize: 'clamp(8px,1.5vw,17px)', fontWeight: 900, letterSpacing: '0.05em' }}>{(s.currentStatus || '').toUpperCase()}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>05</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: hc, lineHeight: 1.1 }}>CONSTRUCTION</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: ac, lineHeight: 1.1 }}>PROGRESS</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(7px,1.3vw,16px)' }}>
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)' }}>{it.t}</div>
                  <div style={{ fontSize: 'clamp(4px,0.8vw,9px)', color: '#6b7280' }}>{it.st}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum="05" />
    </SlideShell>
  );
}

function Slide6Preview() {
  const { data: { slide6: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.planImage ? getSafeImageUrl(s.planImage) : null) || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop';

  const features = [
    { icon: Ruler, label: s.floorHeightLabel || '', val: s.floorHeightValue || '12\'5"' },
    { icon: Expand, label: s.frontageLabel || '', val: s.frontageValue || '20\' to 35\'' },
    { icon: Car, label: s.parkingLabel || '', val: s.parkingValue || '' },
    { icon: Map, label: s.roadAccessLabel || '', val: s.roadAccessValue || '' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%' }}>
        <img src={imgSrc} alt="floor plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 40%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
            {s.slideNumber || ''}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vw,12px)' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 'clamp(5px,0.85vw,10px)', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</span>
                  <span style={{ display: 'block', fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)', whiteSpace: 'pre-line' }}>{f.val}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum="07" />
    </SlideShell>
  );
}

function Slide7Preview() {
  const { data: { slide7: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = s.planImage
    ? getSafeImageUrl(s.planImage)
    : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop';

  const features = [
    { icon: Ruler, label: s.floorHeightLabel || '', val: s.floorHeightValue || '9\'5"' },
    { icon: Briefcase, label: s.bestForLabel || '', val: s.bestForValue || '' },
    { icon: Sun, label: s.terraceLabel || '', val: s.terraceValue || '' },
    { icon: Building, label: s.liftStaircaseLabel || '', val: s.liftStaircaseValue || '' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="floor plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,rgba(255,255,255,0) 40%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '4% 4% 11% 4%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
            {s.slideNumber || ''}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vw,12px)' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 'clamp(5px,0.85vw,10px)', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</span>
                  <span style={{ display: 'block', fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)', whiteSpace: 'pre-line' }}>{f.val}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum="09" />
    </SlideShell>
  );
}

function Slide8Preview() {
  const { data: { slide8: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const imgSrc = (s.mapImage ? getSafeImageUrl(s.mapImage) : null) || 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800&auto=format&fit=crop';

  const brandLines = (s.brandList || '').split('\n').filter(Boolean);
  const legendColors = ['#ec4899', '#eab308', '#ef4444', '#22c55e', '#3b82f6', '#a855f7'];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="brand location map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '4%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
            {s.slideNumber || ''}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px, 1.2vw, 14px)', marginTop: '2%' }}>
          {brandLines.map((line, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 30,
              padding: '4px 12px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: 'clamp(6px, 1vw, 10px)',
                height: 'clamp(6px, 1vw, 10px)',
                borderRadius: '50%',
                background: legendColors[i % legendColors.length],
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 'clamp(6px, 0.9vw, 11px)', fontWeight: 700, color: '#324D7B', letterSpacing: '0.02em' }}>
                {line.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
      <SlidePreviewFooter slideNum="11" />
    </SlideShell>
  );
}

function Slide9Preview() {
  const { data: { slide9: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';

  const cards = [
    {
      img: s.img1 ? getSafeImageUrl(s.img1) : '',
      label: s.label1 || ''
    },
    {
      img: s.img2 ? getSafeImageUrl(s.img2) : '',
      label: s.label2 || ''
    },
    {
      img: s.img3 ? getSafeImageUrl(s.img3) : '',
      label: s.label3 || ''
    },
    {
      img: s.img4 ? getSafeImageUrl(s.img4) : '',
      label: s.label4 || ''
    },
    {
      img: s.img5 ? getSafeImageUrl(s.img5) : '',
      label: s.label5 || ''
    }
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} />
      {/* Header */}
      <div style={{ position: 'absolute', left: '4%', top: '4%', right: '4%', display: 'flex', alignItems: 'flex-start', gap: 8, zIndex: 10 }}>
        <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {s.slideNumber || ''}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '12%', top: '24%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(4px, 1.2vw, 12px)' }}>
        {cards.map((c, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ background: hc, padding: '8px 4px', textAlign: 'center' }}>
              <span style={{ fontSize: 'clamp(5px, 0.8vw, 10px)', color: '#fff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <SlidePreviewFooter slideNum="12" />
    </SlideShell>
  );
}

function Slide10Preview() {
  const { data: { slide10: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';

  const col1 = [
    { icon: Building2, label: s.spec1Label || '', val: s.spec1Value || '' },
    { icon: MapPin, label: s.spec2Label || '', val: s.spec2Value || '' },
    { icon: Gem, label: s.spec3Label || '', val: s.spec3Value || '' },
    { icon: Shirt, label: s.spec4Label || '', val: s.spec4Value || '' },
    { icon: Utensils, label: s.spec5Label || '', val: s.spec5Value || "" },
  ].filter(item => item.label || item.val);

  const col2 = [
    { icon: ArrowUpDown, label: s.spec6Label || '', val: s.spec6Value || "" },
    { icon: ArrowUpDown, label: s.spec7Label || '', val: s.spec7Value || "" },
    { icon: ArrowUpDown, label: s.spec8Label || '', val: s.spec8Value || "" },
    { icon: Calendar, label: s.spec9Label || '', val: s.spec9Value || '' },
    { icon: ScanLine, label: s.spec10Label || '', val: s.spec10Value || '' },
  ].filter(item => item.label || item.val);

  const qrSrc = s.qrImage
    ? getSafeImageUrl(s.qrImage)
    : `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(s.qrUrl || 'https://maps.google.com')}`;

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} />
      {/* Header */}
      <div style={{ position: 'absolute', left: '4%', top: '4%', right: '4%', display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {s.slideNumber || ''}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>PROPERTY</div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>SPECIFICATIONS</div>
        </div>
      </div>

      {/* Columns Grid */}
      <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '12%', top: '24%', display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr', gap: 'clamp(8px, 2vw, 20px)' }}>
        {/* Col 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.8vw, 20px)' }}>
          {col1.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <div style={{ width: 'clamp(12px, 2vw, 22px)', height: 'clamp(12px, 2vw, 22px)', borderRadius: 4, border: `1px solid ${ac}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon size="clamp(6px, 1.1vw, 12px)" style={{ color: ac }} />
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(5px, 0.75vw, 8px)', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 'clamp(6px, 0.9vw, 11px)', color: hc, fontWeight: 700, whiteSpace: 'pre-line' }}>{item.val}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Col 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 10px)' }}>
          {col2.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <div style={{ width: 'clamp(12px, 2vw, 22px)', height: 'clamp(12px, 2vw, 22px)', borderRadius: 4, border: `1px solid ${ac}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon size="clamp(6px, 1.1vw, 12px)" style={{ color: ac }} />
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(5px, 0.75vw, 8px)', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 'clamp(6px, 0.9vw, 11px)', color: hc, fontWeight: 700, whiteSpace: 'pre-line' }}>{item.val}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Col 3: QR Code */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed #d1d5db', borderRadius: 8, padding: '10%', background: '#f9fafb', alignSelf: 'center' }}>
          <img src={qrSrc} alt="QR Code" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
        </div>
      </div>
      <SlidePreviewFooter slideNum="13" />
    </SlideShell>
  );
}

function Slide11Preview() {
  const { data: { slide11: s } } = useFormData();
  const tc = '#7D3C70'; // theme purple
  const buildingSrc = (s.buildingImage ? getSafeImageUrl(s.buildingImage) : null) || 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop';

  // Get selected categories (up to 7) from form selection
  const selectedCategories = (s.selectedCategories || []).slice(0, 7).map(id =>
    PREDEFINED_CATEGORIES.find(c => c.id === id) || PREDEFINED_CATEGORIES[0]
  );

  // Ensure we have 7 items (fill with defaults if needed)
  const highlights = [
    ...selectedCategories.slice(0, 7),
    ...Array(Math.max(0, 7 - selectedCategories.length)).fill(PREDEFINED_CATEGORIES[0])
  ].slice(0, 7);

  const iconSize = 'clamp(14px,2.2vw,28px)';
  const circleSize = 'clamp(38px,6vw,72px)';

  return (
    <SlideShell>
      {/* Dark navy base */}
      <div style={{ position: 'absolute', inset: 0, background: '#0d0420' }} />

      {/* Building photo — right 55% */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%' }}>
        <img
          src={buildingSrc}
          alt="Building"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Fade from dark bg → transparent so it blends */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #0d0420 0%, rgba(13,4,32,0.55) 35%, rgba(13,4,32,0) 80%)',
        }} />
      </div>

      {/* All content sits above the image */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '5% 5% 12% 5%',
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
            {s.slideNumber || ''}
          </div>

          <div style={{ fontWeight: 900, fontSize: 'clamp(16px,3.2vw,40px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            WHY INVEST IN
          </div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(16px,3.2vw,40px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 'clamp(6px,1vw,14px)' }}>
            {s.title || ''}
          </div>

          {/* Purple accent underline */}
          <div style={{ width: 'clamp(28px,3.5vw,44px)', height: 3, background: tc, borderRadius: 2 }} />
        </div>

        {/* ── 7 Features in one row ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 'clamp(4px,0.8vw,12px)', 
          alignItems: 'start'
        }}>
          {highlights.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(5px,0.8vw,12px)'
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
      <SlidePreviewFooter slideNum={s.slideNumber || "14"} isDark={true} />
    </SlideShell>
  );
}

function SlideSiteVisibilityPreview() {
  const { data: { slideSiteVisibility: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';

  const viewImages = [
    { label: 'LEFT VIEW', image: s.leftViewImage },
    { label: 'FRONT VIEW', image: s.frontViewImage },
    { label: 'RIGHT VIEW', image: s.rightViewImage },
  ];

  const defaultImages = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '4%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '3%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>{s.slideNumber || ''}</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1 }}>{s.title || 'SITE VISIBILITY'}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(10px,2vw,22px)', color: ac, lineHeight: 1 }}>{s.subtitle || 'EXCELLENT FRONTAGE & ACCESS'}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(8px,1.5vw,20px)', marginTop: '2%' }}>
          {viewImages.map((view, i) => {
            const imgSrc = view.image ? getSafeImageUrl(view.image) : defaultImages[i];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px,0.8vw,10px)' }}>
                <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <img src={imgSrc} alt={view.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 'clamp(8px,1.2vw,14px)', color: hc, textAlign: 'center' }}>{view.label}</div>
                <div style={{ width: '60%', height: 2, background: hc }} />
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum={s.slideNumber || "06"} />
    </SlideShell>
  );
}

function SlideFirstFloorPlanPreview() {
  const { data: { slideFirstFloorPlan: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const floorPlanSrc = s.floorPlanImage ? getSafeImageUrl(s.floorPlanImage) : null;

  const features = [
    { icon: '📏', title: s.feature1Title || '', desc: s.feature1Desc || '10\'5"' },
    { icon: '📐', title: s.feature2Title || '', desc: s.feature2Desc || '18\' to 28\'' },
    { icon: '🅿️', title: s.feature3Title || '', desc: s.feature3Desc || '' },
    { icon: '🛗', title: s.feature4Title || '', desc: s.feature4Desc || '' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      {/* Right: Floor plan image */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%' }}>
        {floorPlanSrc ? (
          <img src={floorPlanSrc} alt="Floor Plan" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', background: '#f9fafb' }}>
            <div style={{ textAlign: 'center', color: '#9ca3af', margin: 'auto' }}>
              <div style={{ fontSize: 'clamp(20px,3vw,40px)', marginBottom: 8 }}>📐</div>
              <div style={{ fontSize: 'clamp(6px,1vw,12px)' }}>First Floor Plan Diagram</div>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>

      {/* Left content */}
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>{s.slideNumber || ''}</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.6vw,30px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
          </div>
        </div>

        {/* Features list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vw,12px)' }}>
          {features.map((f, i) => {
            const Icon = f.icon === '📏' ? Ruler : f.icon === '📐' ? Expand : f.icon === '🅿️' ? Car : ArrowUpDown;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 'clamp(12px,2vw,24px)', height: 'clamp(12px,2vw,24px)', border: `1.5px solid ${ac}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color: ac }} strokeWidth={2} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 'clamp(5px,0.85vw,10px)', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.title}</span>
                  <span style={{ display: 'block', fontWeight: 700, color: hc, fontSize: 'clamp(6px,1.1vw,13px)', whiteSpace: 'pre-line' }}>{f.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum={s.slideNumber || "08"} />
    </SlideShell>
  );
}

function SlideNearbyCommercialPreview() {
  const { data: { slideNearbyCommercial: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const ecosystemSrc = s.ecosystemImage ? getSafeImageUrl(s.ecosystemImage) : null;

  const buildings = [
    { name: s.building1Name || '', distance: s.building1Distance || '', image: s.building1Image },
    { name: s.building2Name || '', distance: s.building2Distance || '', image: s.building2Image },
    { name: s.building3Name || '', distance: s.building3Distance || '', image: s.building3Image },
    { name: s.building4Name || '', distance: s.building4Distance || '', image: s.building4Image },
    { name: s.building5Name || '', distance: s.building5Distance || '', image: s.building5Image },
    { name: s.building6Name || '', distance: s.building6Distance || '', image: s.building6Image },
    { name: s.building7Name || '', distance: s.building7Distance || '', image: s.building7Image },
    { name: s.building8Name || '', distance: s.building8Distance || '', image: s.building8Image },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#f8f9fa' }} />
      {ecosystemSrc && (
        <img src={ecosystemSrc} alt="Ecosystem" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
      )}

      {/* Content */}
      <div style={{ position: 'absolute', inset: 0, padding: '5% 5% 12% 5%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '4%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(10px,1.5vw,18px)', padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>{s.slideNumber || '12'}</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(14px,3vw,36px)', color: hc, lineHeight: 1.1 }}>{s.title || ''}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(14px,3vw,36px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || ''}</div>
            <div style={{ fontSize: 'clamp(7px,1.1vw,13px)', color: '#6b7280', marginTop: 4, fontStyle: 'italic' }}>Surrounded by Successful Businesses</div>
          </div>
        </div>

        {/* Buildings grid - dynamically centered */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${buildings.filter(b => b.name).length > 4 ? 4 : Math.max(1, buildings.filter(b => b.name).length)}, 1fr)`, 
          gap: 'clamp(8px,1.5vw,16px)', 
          marginTop: 'auto', 
          marginBottom: 'auto' 
        }}>
          {buildings.filter(b => b.name || b.distance).map((building, i) => {
            const imageSrc = (building.image ? getSafeImageUrl(building.image) : null) || [
                  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=300&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1570129476815-ba368ac77011?q=80&w=300&auto=format&fit=crop'
                ][i % 8];
            return (
              <div key={i} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {/* Building image */}
                <div style={{ width: '100%', aspectRatio: '2/1', position: 'relative', overflow: 'hidden' }}>
                  <img src={imageSrc} alt={building.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: hc, color: '#fff', padding: 'clamp(4px,0.8vw,10px)', textAlign: 'center', fontSize: 'clamp(6px,1vw,11px)', fontWeight: 700, letterSpacing: '0.05em', zIndex: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {building.name}
                  </div>
                </div>
                {/* Distance */}
                <div style={{ background: '#fff', padding: '4px 6px', textAlign: 'center', fontSize: 'clamp(7px,1.1vw,12px)', fontWeight: 700, color: hc, borderTop: `2px solid ${ac}` }}>
                  {building.distance}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SlidePreviewFooter slideNum={s.slideNumber || "10"} />
    </SlideShell>
  );
}

function SlideContactPreview() {
  const { data: { slideContact: s } } = useFormData();
  const hc = '#7D3C70', ac = '#FF8435';
  const logoSrc = s.companyLogo ? getSafeImageUrl(s.companyLogo) : null;

  return (
    <SlideShell>
      {/* Dark purple background */}
      <div style={{ position: 'absolute', inset: 0, background: '#1a0a2e' }} />

      {/* Large background logo/icon watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.05 }}>
        <Building2 size="300" strokeWidth={1} style={{ color: '#fff' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', inset: 0, color: '#fff' }}>

        {/* Top Left: Slide number badge */}
        <div style={{
          position: 'absolute', top: '12%', left: '8%',
          background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(9px,1.2vw,14px)',
          padding: '4px 10px', borderRadius: 4
        }}>
          {s.slideNumber || ''}
        </div>

        {/* Main heading */}
        <h1 style={{
          position: 'absolute', top: '25%', left: '8%', width: '48%',
          fontSize: 'clamp(20px,4.2vw,48px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1,
          whiteSpace: 'pre-line'
        }}>
          {s.heading || ""}
        </h1>

        {/* Bottom Left: Company logo and name */}
        <div style={{ position: 'absolute', bottom: '12%', left: '8%', display: 'flex', alignItems: 'center', gap: 12 }}>
          {logoSrc && (
            <img src={logoSrc} alt="Logo" style={{ width: 'clamp(36px,4.5vw,56px)', height: 'clamp(36px,4.5vw,56px)', borderRadius: 8, objectFit: 'contain', background: '#fff', padding: 4 }} />
          )}
          <div>
            <div style={{ fontWeight: 800, fontSize: 'clamp(14px,1.8vw,22px)', lineHeight: 1.2 }}>{s.companyName || ''}</div>
            <div style={{ fontSize: 'clamp(7px,0.9vw,11px)', opacity: 0.7, lineHeight: 1.2, marginTop: 2 }}>{s.companyTagline || ''}</div>
          </div>
        </div>

        {/* Right: Contact details */}
        <div style={{ position: 'absolute', top: '25%', right: '8%', width: '38%', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.2vw,26px)' }}>
          <div style={{ fontSize: 'clamp(8px,1.1vw,14px)', fontWeight: 700, letterSpacing: '0.15em', opacity: 0.9, marginBottom: 4 }}>GET IN TOUCH</div>

          {/* Phone with icon circles */}
          {(s.phone1 || s.phone2) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {s.phone1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 'clamp(22px,2.8vw,32px)', height: 'clamp(22px,2.8vw,32px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size="clamp(10px,1.3vw,16px)" style={{ color: ac }} strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 'clamp(9px,1.2vw,15px)' }}>{s.phone1}</span>
                </div>
              )}
              {s.phone2 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: s.phone1 ? 'clamp(22px,2.8vw,32px)' : 0 }}>
                  {!s.phone1 && (
                    <div style={{ width: 'clamp(22px,2.8vw,32px)', height: 'clamp(22px,2.8vw,32px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                      <Phone size="clamp(10px,1.3vw,16px)" style={{ color: ac }} strokeWidth={2} />
                    </div>
                  )}
                  <span style={{ fontSize: 'clamp(9px,1.2vw,15px)' }}>{s.phone2}</span>
                </div>
              )}
            </div>
          )}

          {/* Email */}
          {s.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 'clamp(22px,2.8vw,32px)', height: 'clamp(22px,2.8vw,32px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size="clamp(10px,1.3vw,16px)" style={{ color: ac }} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 'clamp(9px,1.2vw,15px)' }}>{s.email}</span>
            </div>
          )}

          {/* Website */}
          {s.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 'clamp(22px,2.8vw,32px)', height: 'clamp(22px,2.8vw,32px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size="clamp(10px,1.3vw,16px)" style={{ color: ac }} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 'clamp(9px,1.2vw,15px)' }}>{s.website}</span>
            </div>
          )}

          {/* Address */}
          {s.address && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 'clamp(22px,2.8vw,32px)', height: 'clamp(22px,2.8vw,32px)', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size="clamp(10px,1.3vw,16px)" style={{ color: ac }} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 'clamp(8px,1.05vw,13px)', lineHeight: 1.6, opacity: 0.9, whiteSpace: 'pre-line' }}>
                {s.address}
              </span>
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

const SLIDE_PREVIEWS = [
  Slide1Preview,
  Slide2Preview,
  Slide3Preview,
  Slide4Preview,
  Slide5Preview,
  SlideSiteVisibilityPreview,
  Slide6Preview,
  SlideFirstFloorPlanPreview,
  Slide7Preview,
  SlideNearbyCommercialPreview,
  Slide8Preview,
  Slide9Preview,
  Slide10Preview,
  Slide11Preview,
  SlideContactPreview,
];

// ─────────────────────── FORM FIELD HELPERS ─────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: '#f8fafb',
  border: '1.5px solid #d1d5db', borderRadius: 8, color: '#1a2e1a',
  fontSize: 14, outline: 'none', transition: 'border 0.2s',
};
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: '#7D3C70', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' };
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical', minHeight: 70 };
const fileStyle: React.CSSProperties = { ...inputStyle, cursor: 'pointer', background: '#ffffff', borderColor: '#E2E8F0' };

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

// ─────────────────────── STEP FORMS ─────────────────────────────────────────

function Step1Form() {
  const { data: { slide1: s }, updateSlide1 } = useFormData();
  const u = (k: any, v: any) => updateSlide1({ [k]: v });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="01" />
        </Field>
        <Field label="Theme Color">
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={s.themeColor} onChange={e => u('themeColor', e.target.value)} style={{ width: 50, height: 42, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'transparent' }} />
            <input style={{ ...inputStyle, flex: 1 }} value={s.themeColor} onChange={e => u('themeColor', e.target.value)} />
          </div>
        </Field>
      </div>
      <Field label="Project Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="MADHAV HIGHSTREET" />
      </Field>
      <Field label="Subtitle / Tagline">
        <textarea style={textareaStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="THE NEXT PREMIUM RETAIL DESTINATION" />
      </Field>
      <Field label="Address">
        <textarea style={textareaStyle} value={s.address} onChange={e => u('address', e.target.value)} rows={2} placeholder="SINDHU BHAVAN ROAD, BODAKDEV, AHMEDABAD" />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Company Name">
          <input style={inputStyle} value={s.companyName} onChange={e => u('companyName', e.target.value)} placeholder="AESTHETIC ARC" />
        </Field>
        <Field label="Company Tagline">
          <input style={inputStyle} value={s.companyTagline} onChange={e => u('companyTagline', e.target.value)} placeholder="PROPERTY LEASING COMPANY" />
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Font Color">
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={s.fontColor} onChange={e => u('fontColor', e.target.value)} style={{ width: 50, height: 42, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'transparent' }} />
            <input style={{ ...inputStyle, flex: 1 }} value={s.fontColor} onChange={e => u('fontColor', e.target.value)} />
          </div>
        </Field>
        <Field label="Company Logo">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('logo', e.target.files[0])} />
        </Field>
      </div>
      <Field label="Background Image (Right side photo)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('backgroundImage', e.target.files[0])} />
        {s.backgroundImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.backgroundImage)}</span>}
      </Field>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories Selection ({(s.selectedCategories || []).length}/8 selected)</div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12 }}>Click to select or deselect categories. You can choose a maximum of 8 to display on the first slide.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PREDEFINED_CATEGORIES.map(cat => {
            const selectedCats = s.selectedCategories || [];
            const isSelected = selectedCats.includes(cat.id);
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    u('selectedCategories', selectedCats.filter((id: string) => id !== cat.id));
                  } else if (selectedCats.length < 8) {
                    u('selectedCategories', [...selectedCats, cat.id]);
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, userSelect: 'none',
                  padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
                  fontSize: 12, fontWeight: isSelected ? 600 : 500,
                  background: isSelected ? '#166534' : '#fff',
                  color: isSelected ? '#fff' : '#4b5563',
                  border: `1px solid ${isSelected ? '#166534' : '#d1d5db'}`,
                  transition: 'all 0.2s',
                  opacity: (!isSelected && selectedCats.length >= 8) ? 0.5 : 1,
                  pointerEvents: (!isSelected && selectedCats.length >= 8) ? 'none' : 'auto',
                }}
              >
                <Icon size={14} />
                {cat.name.replace(/\\n/g, ' ')}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step2Form() {
  const { data: { slide2: s }, updateSlide2 } = useFormData();
  const u = (k: any, v: any) => updateSlide2({ [k]: v });

  return (
    <div>
      <Field label="City Name (Large heading)">
        <input style={inputStyle} value={s.cityName} onChange={e => u('cityName', e.target.value)} placeholder="AHMEDABAD" />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Population"><input style={inputStyle} value={s.population} onChange={e => u('population', e.target.value)} placeholder="90.6 Lakh+" /></Field>
        <Field label="GDP"><input style={inputStyle} value={s.gdp} onChange={e => u('gdp', e.target.value)} placeholder="$135 Billion+" /></Field>
        <Field label="GDP Growth"><input style={inputStyle} value={s.gdpGrowth} onChange={e => u('gdpGrowth', e.target.value)} placeholder="6.7%+" /></Field>
        <Field label="World's 1st (achievement)"><input style={inputStyle} value={s.worldFirst} onChange={e => u('worldFirst', e.target.value)} placeholder="Heritage City With BRTS" /></Field>
        <Field label="Metro Network"><input style={inputStyle} value={s.metroKm} onChange={e => u('metroKm', e.target.value)} placeholder="40 KM+" /></Field>
        <Field label="BRTS Network"><input style={inputStyle} value={s.brtsKm} onChange={e => u('brtsKm', e.target.value)} placeholder="160 KM+" /></Field>
        <Field label="Daily Flights"><input style={inputStyle} value={s.dailyFlights} onChange={e => u('dailyFlights', e.target.value)} placeholder="130+" /></Field>
        <Field label="Retail Rank"><input style={inputStyle} value={s.retailRank} onChange={e => u('retailRank', e.target.value)} placeholder="Top 3 Fastest Growing..." /></Field>
      </div>
      <Field label="Upcoming Infrastructure (one per line)">
        <textarea style={{ ...textareaStyle, minHeight: 100 }} value={s.infrastructure} onChange={e => u('infrastructure', e.target.value)} placeholder={"Bullet Train Project\nDedicated Freight Corridor\n..."} />
      </Field>
      <Field label="City Photo (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('cityImage', e.target.files[0])} />
        {s.cityImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.cityImage)}</span>}
      </Field>
    </div>
  );
}

function Step3Form() {
  const { data: { slide3: s }, updateSlide3 } = useFormData();
  const u = (k: any, v: any) => updateSlide3({ [k]: v });

  return (
    <div>
      <Field label="Slide Title (two lines, press Enter for line 2)">
        <textarea style={{ ...textareaStyle, minHeight: 60 }} value={s.locationTitle} onChange={e => u('locationTitle', e.target.value)} placeholder={"PREMIUM LOCATION\nTHAT CONNECTS EVERYTHING"} />
      </Field>
      <Field label="Address">
        <textarea style={textareaStyle} value={s.address} onChange={e => u('address', e.target.value)} rows={2} placeholder={"Sindhu Bhavan Road,\nBodakdev, Ahmedabad"} />
      </Field>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 1</div>
        <Field label="Title"><input style={inputStyle} value={s.point1Title} onChange={e => u('point1Title', e.target.value)} placeholder="2 Mins from SG Highway" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point1Desc} onChange={e => u('point1Desc', e.target.value)} placeholder="Excellent Connectivity" /></Field>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 2</div>
        <Field label="Title"><input style={inputStyle} value={s.point2Title} onChange={e => u('point2Title', e.target.value)} placeholder="Easy Access to SP Ring Road" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point2Desc} onChange={e => u('point2Desc', e.target.value)} placeholder="Optional description" /></Field>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 3</div>
        <Field label="Title"><input style={inputStyle} value={s.point3Title} onChange={e => u('point3Title', e.target.value)} placeholder="Surrounded by Premium" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point3Desc} onChange={e => u('point3Desc', e.target.value)} placeholder="Residential & Commercial Developments" /></Field>
      </div>
      <Field label="Google Maps URL">
        <input style={inputStyle} value={s.mapsUrl} onChange={e => u('mapsUrl', e.target.value)} placeholder="https://maps.google.com/..." />
      </Field>
      <Field label="Map / Location Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('mapImage', e.target.files[0])} />
        {s.mapImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.mapImage)}</span>}
      </Field>
    </div>
  );
}

function Step4Form() {
  const { data: { slide4: s }, updateSlide4 } = useFormData();
  const u = (k: any, v: any) => updateSlide4({ [k]: v });
  const features = [
    { tK: 'feature1Title', dK: 'feature1Desc', label: 'Feature 1', pt: 'Premium Corner Plot', pd: 'with Wide Frontage' },
    { tK: 'feature2Title', dK: 'feature2Desc', label: 'Feature 2', pt: 'Modern Retail Architecture', pd: 'with Maximum Visibility' },
    { tK: 'feature3Title', dK: 'feature3Desc', label: 'Feature 3', pt: 'Designed for Premium Brands', pd: '& High Footfall' },
  ];

  return (
    <div>
      {features.map((f, i) => (
        <div key={i} style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
          <Field label="Feature Title"><input style={inputStyle} value={(s as any)[f.tK]} onChange={e => u(f.tK, e.target.value)} placeholder={f.pt} /></Field>
          <Field label="Feature Description"><input style={inputStyle} value={(s as any)[f.dK]} onChange={e => u(f.dK, e.target.value)} placeholder={f.pd} /></Field>
        </div>
      ))}
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4 (Possession)</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Label"><input style={inputStyle} value={s.possessionLabel} onChange={e => u('possessionLabel', e.target.value)} placeholder="Possession" /></Field>
          <Field label="Date (also shown in badge)"><input style={inputStyle} value={s.possessionDate} onChange={e => u('possessionDate', e.target.value)} placeholder="March 2027" /></Field>
        </div>
      </div>
      <Field label="Project Building Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('projectImage', e.target.files[0])} />
        {s.projectImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.projectImage)}</span>}
      </Field>
    </div>
  );
}

function Step5Form() {
  const { data: { slide5: s }, updateSlide5 } = useFormData();
  const u = (k: any, v: any) => updateSlide5({ [k]: v });
  const items = [
    { tK: 'progress1Title', sK: 'progress1Status', label: 'Progress Item 1', pt: 'Foundation', ps: 'Completed' },
    { tK: 'progress2Title', sK: 'progress2Status', label: 'Progress Item 2', pt: 'Structure', ps: 'In Progress' },
    { tK: 'progress3Title', sK: 'progress3Status', label: 'Progress Item 3', pt: 'Finishing', ps: 'Ahead' },
    { tK: 'progress4Title', sK: 'progress4Status', label: 'Progress Item 4 (Possession)', pt: 'Possession', ps: 'March 2027' },
  ];

  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{it.label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Title"><input style={inputStyle} value={(s as any)[it.tK]} onChange={e => u(it.tK, e.target.value)} placeholder={it.pt} /></Field>
            <Field label="Status"><input style={inputStyle} value={(s as any)[it.sK]} onChange={e => u(it.sK, e.target.value)} placeholder={it.ps} /></Field>
          </div>
        </div>
      ))}
      <Field label="Current Status (Badge on slide)">
        <input style={inputStyle} value={s.currentStatus} onChange={e => u('currentStatus', e.target.value)} placeholder="JUNE 2026" />
      </Field>
      <Field label="Construction Photo (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('constructionImage', e.target.files[0])} />
        {s.constructionImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.constructionImage)}</span>}
      </Field>
    </div>
  );
}

function Step6Form() {
  const { data: { slide6: s }, updateSlide6 } = useFormData();
  const u = (k: any, v: any) => updateSlide6({ [k]: v });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="06" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="GROUND FLOOR PLAN" />
      </Field>
      <Field label="Slide Subtitle">
        <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="RETAIL SPACES" />
      </Field>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 1</div>
        <Field label="Label"><input style={inputStyle} value={s.floorHeightLabel} onChange={e => u('floorHeightLabel', e.target.value)} placeholder="Floor Height" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.floorHeightValue} onChange={e => u('floorHeightValue', e.target.value)} placeholder={"12'5\""} /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 2</div>
        <Field label="Label"><input style={inputStyle} value={s.frontageLabel} onChange={e => u('frontageLabel', e.target.value)} placeholder="Frontage" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.frontageValue} onChange={e => u('frontageValue', e.target.value)} placeholder="20' to 35'" /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 3</div>
        <Field label="Label"><input style={inputStyle} value={s.parkingLabel} onChange={e => u('parkingLabel', e.target.value)} placeholder="Parking" /></Field>
        <Field label="Value"><textarea style={textareaStyle} value={s.parkingValue} onChange={e => u('parkingValue', e.target.value)} placeholder="Ample Two Wheeler & Four Wheeler" /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4</div>
        <Field label="Label"><input style={inputStyle} value={s.roadAccessLabel} onChange={e => u('roadAccessLabel', e.target.value)} placeholder="Road Access" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.roadAccessValue} onChange={e => u('roadAccessValue', e.target.value)} placeholder="30 MT Wide Road" /></Field>
      </div>

      <Field label="Floor Plan Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('planImage', e.target.files[0])} />
        {s.planImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.planImage)}</span>}
      </Field>
    </div>
  );
}

function Step7Form() {
  const { data: { slide7: s }, updateSlide7 } = useFormData();
  const u = (k: any, v: any) => updateSlide7({ [k]: v });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="07" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="SECOND FLOOR PLAN" />
      </Field>
      <Field label="Slide Subtitle">
        <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="RETAIL SPACES" />
      </Field>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 1</div>
        <Field label="Label"><input style={inputStyle} value={s.floorHeightLabel} onChange={e => u('floorHeightLabel', e.target.value)} placeholder="Floor Height" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.floorHeightValue} onChange={e => u('floorHeightValue', e.target.value)} placeholder={"9'5\""} /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 2</div>
        <Field label="Label"><input style={inputStyle} value={s.bestForLabel} onChange={e => u('bestForLabel', e.target.value)} placeholder="Best for" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.bestForValue} onChange={e => u('bestForValue', e.target.value)} placeholder="F&B / Lifestyle / Offices" /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 3</div>
        <Field label="Label"><input style={inputStyle} value={s.terraceLabel} onChange={e => u('terraceLabel', e.target.value)} placeholder="Open Terrace" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.terraceValue} onChange={e => u('terraceValue', e.target.value)} placeholder="Provision" /></Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4</div>
        <Field label="Label"><input style={inputStyle} value={s.liftStaircaseLabel} onChange={e => u('liftStaircaseLabel', e.target.value)} placeholder="Lift & Staircase" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.liftStaircaseValue} onChange={e => u('liftStaircaseValue', e.target.value)} placeholder="Access" /></Field>
      </div>

      <Field label="Floor Plan Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('planImage', e.target.files[0])} />
        {s.planImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.planImage)}</span>}
      </Field>
    </div>
  );
}

function Step8Form() {
  const { data: { slide8: s }, updateSlide8 } = useFormData();
  const u = (k: any, v: any) => updateSlide8({ [k]: v });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="08" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="BRAND LOCATION MAP" />
      </Field>
      <Field label="Slide Subtitle">
        <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="BE IN THE COMPANY OF THE BEST" />
      </Field>

      <Field label="Legend Items (One per line)">
        <textarea
          style={{ ...textareaStyle, minHeight: 120 }}
          value={s.brandList}
          onChange={e => u('brandList', e.target.value)}
          placeholder={"FASHION & APPAREL\nJEWELLERY\n..."}
        />
      </Field>

      <Field label="Map Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('mapImage', e.target.files[0])} />
        {s.mapImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.mapImage)}</span>}
      </Field>
    </div>
  );
}

function Step9Form() {
  const { data: { slide9: s }, updateSlide9 } = useFormData();
  const u = (k: any, v: any) => updateSlide9({ [k]: v });

  const cats = [
    { labelK: 'label1', imgK: 'img1', defaultLabel: 'FINE DINING', title: 'Category 1' },
    { labelK: 'label2', imgK: 'img2', defaultLabel: 'SHOPPING', title: 'Category 2' },
    { labelK: 'label3', imgK: 'img3', defaultLabel: 'FITNESS', title: 'Category 3' },
    { labelK: 'label4', imgK: 'img4', defaultLabel: 'ENTERTAINMENT', title: 'Category 4' },
    { labelK: 'label5', imgK: 'img5', defaultLabel: 'RESIDENTIAL CATCHMENT', title: 'Category 5' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="09" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="LIFESTYLE AROUND YOU" />
      </Field>
      <Field label="Slide Subtitle">
        <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="EVERYTHING NEARBY" />
      </Field>

      {cats.map((cat, i) => (
        <div key={i} style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.title}</div>
          <Field label="Label">
            <input style={inputStyle} value={(s as any)[cat.labelK]} onChange={e => u(cat.labelK, e.target.value)} placeholder={cat.defaultLabel} />
          </Field>
          <Field label="Image">
            <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u(cat.imgK, e.target.files[0])} />
            {(s as any)[cat.imgK] && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {(s as any)[cat.imgK].name}</span>}
          </Field>
        </div>
      ))}
    </div>
  );
}

function Step10Form() {
  const { data: { slide10: s }, updateSlide10 } = useFormData();
  const u = (k: any, v: any) => updateSlide10({ [k]: v });

  const specs = [
    { lK: 'spec1Label', vK: 'spec1Value', dL: 'Project Type', dV: 'Commercial', title: 'Spec 1' },
    { lK: 'spec2Label', vK: 'spec2Value', dL: 'Location', dV: 'Sindhu Bhavan Road, Bodakdev, Ahmedabad', title: 'Spec 2' },
    { lK: 'spec3Label', vK: 'spec3Value', dL: 'Jewellery Brands', dV: 'Tanishq, Malabar, PC Jeweller & More', title: 'Spec 3' },
    { lK: 'spec4Label', vK: 'spec4Value', dL: 'Apparel Brands', dV: 'Zara, H&M, Trends, Lifestyle & More', title: 'Spec 4' },
    { lK: 'spec5Label', vK: 'spec5Value', dL: 'F&B Outlets', dV: "McDonald's, Starbucks, The White Crow & More", title: 'Spec 5' },
    { lK: 'spec6Label', vK: 'spec6Value', dL: 'Ground Floor Height', dV: '12\'5"', title: 'Spec 6' },
    { lK: 'spec7Label', vK: 'spec7Value', dL: 'First Floor Height', dV: '10\'5"', title: 'Spec 7' },
    { lK: 'spec8Label', vK: 'spec8Value', dL: 'Second Floor Height', dV: '9\'5"', title: 'Spec 8' },
    { lK: 'spec9Label', vK: 'spec9Value', dL: 'Possession', dV: 'March 2027', title: 'Spec 9' },
    { lK: 'spec10Label', vK: 'spec10Value', dL: 'Google Maps', dV: 'Scan QR Code', title: 'Spec 10' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="10" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="PROPERTY SPECIFICATIONS" />
      </Field>

      {specs.map((spec, i) => (
        <div key={i} style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{spec.title}</div>
          <Field label="Label">
            <input style={inputStyle} value={(s as any)[spec.lK]} onChange={e => u(spec.lK, e.target.value)} placeholder={spec.dL} />
          </Field>
          <Field label="Value">
            <textarea style={textareaStyle} value={(s as any)[spec.vK]} onChange={e => u(spec.vK, e.target.value)} placeholder={spec.dV} />
          </Field>
        </div>
      ))}

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>QR Code Settings</div>
        <Field label="QR Target URL">
          <input style={inputStyle} value={s.qrUrl} onChange={e => u('qrUrl', e.target.value)} placeholder="https://maps.google.com" />
        </Field>
        <Field label="Or Upload Custom QR Image">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('qrImage', e.target.files[0])} />
          {s.qrImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.qrImage)}</span>}
        </Field>
      </div>
    </div>
  );
}

function Step11Form() {
  const { data: { slide11: s }, updateSlide11 } = useFormData();
  const u = (k: any, v: any) => updateSlide11({ [k]: v });

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="14" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="WHY INVEST IN MADHAV HIGHSTREET?" />
      </Field>

      {/* Building Image Upload */}
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Background Building Photo</div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 10 }}>Upload the building image shown on the right side of the slide (dark overlay applied automatically).</p>
        <Field label="Building Image">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('buildingImage', e.target.files[0])} />
          {s.buildingImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.buildingImage)}</span>}
        </Field>
      </div>

      {/* Category Selection for Icons */}
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Categories ({(s.selectedCategories || []).length}/7 selected)</div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12 }}>Click to select up to 7 categories. These icons will be displayed on the slide with Lucide icons.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PREDEFINED_CATEGORIES.map(cat => {
            const selectedCats = s.selectedCategories || [];
            const isSelected = selectedCats.includes(cat.id);
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    u('selectedCategories', selectedCats.filter((id: string) => id !== cat.id));
                  } else if (selectedCats.length < 7) {
                    u('selectedCategories', [...selectedCats, cat.id]);
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, userSelect: 'none',
                  padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
                  fontSize: 12, fontWeight: isSelected ? 600 : 500,
                  background: isSelected ? '#4B247A' : '#fff',
                  color: isSelected ? '#fff' : '#4b5563',
                  border: `1px solid ${isSelected ? '#4B247A' : '#d1d5db'}`,
                  transition: 'all 0.2s',
                  opacity: (!isSelected && selectedCats.length >= 7) ? 0.5 : 1,
                  pointerEvents: (!isSelected && selectedCats.length >= 7) ? 'none' : 'auto',
                }}
              >
                <Icon size={14} />
                {cat.name.replace(/\\n/g, ' ')}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepSiteVisibilityForm() {
  const { data: { slideSiteVisibility: s }, updateSlideSiteVisibility } = useFormData();
  const u = (k: any, v: any) => updateSlideSiteVisibility({ [k]: v });

  return (
    <div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slide Header Text</div>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="06" />
        </Field>
        <Field label="Title">
          <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="SITE VISIBILITY" />
        </Field>
        <Field label="Subtitle">
          <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="EXCELLENT FRONTAGE & ACCESS" />
        </Field>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Site Visibility Photos</div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12 }}>Upload 3 photos for Left View, Front View, and Right View (shown in that order)</p>
        <Field label="Left View Photo">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('leftViewImage', e.target.files[0])} />
          {s.leftViewImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.leftViewImage)}</span>}
        </Field>
        <Field label="Front View Photo">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('frontViewImage', e.target.files[0])} />
          {s.frontViewImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.frontViewImage)}</span>}
        </Field>
        <Field label="Right View Photo">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('rightViewImage', e.target.files[0])} />
          {s.rightViewImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.rightViewImage)}</span>}
        </Field>
      </div>
    </div>
  );
}

function StepFirstFloorPlanForm() {
  const { data: { slideFirstFloorPlan: s }, updateSlideFirstFloorPlan } = useFormData();
  const u = (k: any, v: any) => updateSlideFirstFloorPlan({ [k]: v });

  return (
    <div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slide Header</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Slide Number">
            <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="08" />
          </Field>
          <Field label="Title">
            <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="FIRST FLOOR PLAN" />
          </Field>
        </div>
        <Field label="Subtitle">
          <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="RETAIL SPACES" />
        </Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Floor Plan Features</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Feature 1 Title">
            <input style={inputStyle} value={s.feature1Title} onChange={e => u('feature1Title', e.target.value)} placeholder="Floor Height" />
          </Field>
          <Field label="Feature 1 Description">
            <input style={inputStyle} value={s.feature1Desc} onChange={e => u('feature1Desc', e.target.value)} placeholder={'10\'5"'} />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <Field label="Feature 2 Title">
            <input style={inputStyle} value={s.feature2Title} onChange={e => u('feature2Title', e.target.value)} placeholder="Frontage" />
          </Field>
          <Field label="Feature 2 Description">
            <input style={inputStyle} value={s.feature2Desc} onChange={e => u('feature2Desc', e.target.value)} placeholder="18' to 28'" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <Field label="Feature 3 Title">
            <input style={inputStyle} value={s.feature3Title} onChange={e => u('feature3Title', e.target.value)} placeholder="Parking" />
          </Field>
          <Field label="Feature 3 Description">
            <input style={inputStyle} value={s.feature3Desc} onChange={e => u('feature3Desc', e.target.value)} placeholder="Ample" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <Field label="Feature 4 Title">
            <input style={inputStyle} value={s.feature4Title} onChange={e => u('feature4Title', e.target.value)} placeholder="Escalator & Lift" />
          </Field>
          <Field label="Feature 4 Description">
            <input style={inputStyle} value={s.feature4Desc} onChange={e => u('feature4Desc', e.target.value)} placeholder="For Easy Access" />
          </Field>
        </div>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Floor Plan Layout</div>
        <Field label="Upload Floor Plan Image">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('floorPlanImage', e.target.files[0])} />
          {s.floorPlanImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.floorPlanImage)}</span>}
        </Field>
      </div>
    </div>
  );
}

function StepNearbyCommercialForm() {
  const { data: { slideNearbyCommercial: s }, updateSlideNearbyCommercial } = useFormData();
  const u = (k: any, v: any) => updateSlideNearbyCommercial({ [k]: v });

  const bInputs = [
    { num: 1, nameK: 'building1Name', distK: 'building1Distance', imgK: 'building1Image', defName: 'THE WHITE CROW', defDist: '150 M' },
    { num: 2, nameK: 'building2Name', distK: 'building2Distance', imgK: 'building2Image', defName: 'STELLAR', defDist: '200 M' },
    { num: 3, nameK: 'building3Name', distK: 'building3Distance', imgK: 'building3Image', defName: 'TWIN LILAC', defDist: '500 M' },
    { num: 4, nameK: 'building4Name', distK: 'building4Distance', imgK: 'building4Image', defName: 'NOVA', defDist: '450 M' },
    { num: 5, nameK: 'building5Name', distK: 'building5Distance', imgK: 'building5Image', defName: 'ARISTA', defDist: '500 M' },
    { num: 6, nameK: 'building6Name', distK: 'building6Distance', imgK: 'building6Image', defName: 'DOM ETERNUS', defDist: '700 M' },
    { num: 7, nameK: 'building7Name', distK: 'building7Distance', imgK: 'building7Image', defName: 'PALLADIUM', defDist: '900 M' },
    { num: 8, nameK: 'building8Name', distK: 'building8Distance', imgK: 'building8Image', defName: 'PENTAGON', defDist: '1.2 KM' },
  ];

  return (
    <div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slide Header</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Slide Number">
            <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="12" />
          </Field>
          <Field label="Title">
            <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="NEARBY COMMERCIAL" />
          </Field>
        </div>
        <Field label="Subtitle">
          <input style={inputStyle} value={s.subtitle} onChange={e => u('subtitle', e.target.value)} placeholder="ECOSYSTEM" />
        </Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nearby Buildings</div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12 }}>Enter building names, distances, and upload photos for each building</p>

        {bInputs.map((bi) => (
          <div key={bi.num} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 12, marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
              <Field label={`Building ${bi.num} Name`}>
                <input style={inputStyle} value={(s as any)[bi.nameK]} onChange={e => u(bi.nameK, e.target.value)} placeholder={bi.defName} />
              </Field>
              <Field label={`Building ${bi.num} Distance`}>
                <input style={inputStyle} value={(s as any)[bi.distK]} onChange={e => u(bi.distK, e.target.value)} placeholder={bi.defDist} />
              </Field>
            </div>
            <Field label={`Building ${bi.num} Photo`}>
              <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u(bi.imgK, e.target.files[0])} />
              {(s as any)[bi.imgK] && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {(s as any)[bi.imgK].name}</span>}
            </Field>
          </div>
        ))}
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ecosystem Background Photo</div>
        <Field label="Upload Background Photo (Optional)">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('ecosystemImage', e.target.files[0])} />
          {s.ecosystemImage && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.ecosystemImage)}</span>}
        </Field>
      </div>
    </div>
  );
}

function StepContactForm() {
  const { data: { slideContact: s }, updateSlideContact } = useFormData();
  const u = (k: any, v: any) => updateSlideContact({ [k]: v });

  return (
    <div>
      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Slide Header</div>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="15" />
        </Field>
        <Field label="Main Heading">
          <textarea style={{ ...textareaStyle, minHeight: 60 }} value={s.heading} onChange={e => u('heading', e.target.value)} placeholder="LET'S BUILD SOMETHING ICONIC TOGETHER" />
        </Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Company Name">
            <input style={inputStyle} value={s.companyName} onChange={e => u('companyName', e.target.value)} placeholder="AESTHETIC ARC" />
          </Field>
          <Field label="Company Tagline">
            <input style={inputStyle} value={s.companyTagline} onChange={e => u('companyTagline', e.target.value)} placeholder="PROPERTY LEASING COMPANY" />
          </Field>
        </div>
        <Field label="Company Logo">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('companyLogo', e.target.files[0])} />
          {s.companyLogo && <span style={{ fontSize: 11, color: '#FF8435', marginTop: 4, display: 'block' }}>✓ {getFileName(s.companyLogo)}</span>}
        </Field>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7D3C70', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Details</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Phone Number 1">
            <input style={inputStyle} value={s.phone1} onChange={e => u('phone1', e.target.value)} placeholder="+91 97129 06363" />
          </Field>
          <Field label="Phone Number 2">
            <input style={inputStyle} value={s.phone2} onChange={e => u('phone2', e.target.value)} placeholder="+91 97129 06364" />
          </Field>
        </div>
        <Field label="Email">
          <input style={inputStyle} value={s.email} onChange={e => u('email', e.target.value)} placeholder="info@aestheticarc.com" />
        </Field>
        <Field label="Website">
          <input style={inputStyle} value={s.website} onChange={e => u('website', e.target.value)} placeholder="www.aestheticarc.com" />
        </Field>
        <Field label="Address">
          <textarea style={{ ...textareaStyle, minHeight: 80 }} value={s.address} onChange={e => u('address', e.target.value)} placeholder="418, 4th Floor, Shivalik Highstreet, Near Rajpath Club, Bodakdev, Ahmedabad - 380054, Gujarat, India" />
        </Field>
      </div>
    </div>
  );
}

const STEPS = [
  { num: 1, title: 'Cover Slide', subtitle: 'Title, company & theme', form: Step1Form },
  { num: 2, title: 'City At A Glance', subtitle: 'Stats & infrastructure', form: Step2Form },
  { num: 3, title: 'Premium Location', subtitle: 'Map & location points', form: Step3Form },
  { num: 4, title: 'Project Showcase', subtitle: 'Features & possession', form: Step4Form },
  { num: 5, title: 'Construction', subtitle: 'Progress & status', form: Step5Form },
  { num: 6, title: 'Site Visibility', subtitle: 'Frontage photos & angles', form: StepSiteVisibilityForm },
  { num: 7, title: 'Floor Plan (Ground)', subtitle: 'Ground layout & features', form: Step6Form },
  { num: 8, title: 'Floor Plan (First)', subtitle: 'First layout & features', form: StepFirstFloorPlanForm },
  { num: 9, title: 'Floor Plan (Second)', subtitle: 'Second layout & features', form: Step7Form },
  { num: 10, title: 'Nearby Ecosystem', subtitle: 'Commercial surroundings', form: StepNearbyCommercialForm },
  { num: 11, title: 'Brand Map', subtitle: 'Company of the best', form: Step8Form },
  { num: 12, title: 'Lifestyle Grid', subtitle: 'Everything nearby', form: Step9Form },
  { num: 13, title: 'Specifications', subtitle: 'Property specs & details', form: Step10Form },
  { num: 14, title: 'Why Invest', subtitle: 'Key investment highlights', form: Step11Form },
  { num: 15, title: 'Contact Details', subtitle: "Let's build together", form: StepContactForm },
];

// ─────────────────────── MAIN STEPPER APP ────────────────────────────────────

export default function StepperApp() {
  const [step, setStep] = useState(0); // 0-indexed
  const [showAllSlides, setShowAllSlides] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isJsonPanelOpen, setIsJsonPanelOpen] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalizeSuccess, setFinalizeSuccess] = useState(false);
  const { data } = useFormData();
  const { slideStatuses, slideSnapshots, finalizeSlide, allFinalized, finalizedCount, totalSlides } = useSlideFinalization();
  const previewRef = useRef<HTMLDivElement>(null);

  const CurrentForm = STEPS[step].form;
  const CurrentPreview = SLIDE_PREVIEWS[step];
  const currentStatus = slideStatuses[step];

  // Snapshot-based PDF download — only works when all slides are finalized
  const handleDownloadPDF = async () => {
    if (!allFinalized) return;
    try {
      await generateSnapshotPDF(slideSnapshots, totalSlides, setIsGenerating);
      alert('Presentation downloaded successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      alert('Failed to generate presentation. Please check console logs.');
    }
  };

  // Finalize the current slide: wait for images, capture snapshot, advance
  const handleFinalizeSlide = useCallback(async () => {
    if (!previewRef.current || isFinalizing) return;
    setIsFinalizing(true);
    setFinalizeSuccess(false);

    try {
      // Wait for all images inside the preview to load
      const images = previewRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete && img.naturalHeight > 0) return Promise.resolve();
          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Don't block on broken images
            // Timeout safety net
            setTimeout(resolve, 5000);
          });
        })
      );

      // Small delay to ensure rendering is complete
      await new Promise(r => setTimeout(r, 300));

      // Capture at 3x resolution for high-quality output
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 10000,
      });

      const snapshotDataUrl = canvas.toDataURL('image/png', 1.0);

      // Save the snapshot and mark as finalized
      finalizeSlide(step, snapshotDataUrl);

      // Show success flash
      setFinalizeSuccess(true);
      setTimeout(() => setFinalizeSuccess(false), 2000);

      // Auto-advance to next unfinalized slide
      setTimeout(() => {
        if (step < STEPS.length - 1) {
          // Find the next unfinalized slide
          let nextStep = step + 1;
          for (let i = step + 1; i < STEPS.length; i++) {
            if (slideStatuses[i] !== 'finalized') {
              nextStep = i;
              break;
            }
          }
          setStep(nextStep);
        }
      }, 800);
    } catch (error) {
      console.error('Error capturing slide snapshot:', error);
      alert('Failed to capture slide. Please try again.');
    } finally {
      setIsFinalizing(false);
    }
  }, [step, isFinalizing, finalizeSlide, slideStatuses]);

  // Status badge helper
  const getStatusBadge = (index: number) => {
    const status = slideStatuses[index];
    if (status === 'finalized') return { icon: '✅', color: '#22c55e', label: 'Finalized' };
    if (status === 'editing') return { icon: '📝', color: '#f59e0b', label: 'Editing' };
    return { icon: '⏳', color: 'rgba(255,255,255,0.4)', label: 'Pending' };
  };

    return (
    <div style={{ minHeight: '100vh', background: '#FAFBFD' }}>
      {/* ── HEADER ── */}
      <div style={{ borderBottom: '2px solid #E2E8F0', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#7D3C70,#652D5A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff', boxShadow: '0 4px 12px rgba(125,60,112,0.4)' }}>P</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#7D3C70' }}>PPT Generator</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Real Estate Presentation Builder</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Progress indicator in header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: allFinalized ? '#dcfce7' : '#FAFBFD', borderRadius: 8, border: `1px solid ${allFinalized ? '#22c55e' : '#E2E8F0'}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: allFinalized ? '#16a34a' : '#324D7B' }}>
              {allFinalized ? '✅' : '📊'} {finalizedCount} / {totalSlides} Slides Finalized
            </span>
          </div>
          <button
            onClick={() => setShowAllSlides(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: showAllSlides ? '#7D3C70' : '#fff', border: '2px solid #7D3C70', borderRadius: 9, color: showAllSlides ? '#fff' : '#7D3C70', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <Eye size={15} /> {showAllSlides ? 'Back to Edit' : 'Preview All Slides'}
          </button>
        </div>
      </div>

      {showAllSlides ? (
        /* ── ALL SLIDES VIEW ── */
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#7D3C70', marginBottom: 32, textAlign: 'center' }}>All {SLIDE_PREVIEWS.length} Slides Preview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SLIDE_PREVIEWS.map((SlideComp, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#7D3C70', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>{i + 1}</div>
                  <span style={{ fontWeight: 700, color: '#7D3C70', fontSize: 15 }}>{STEPS[i].title}</span>
                  <span style={{ fontSize: 14, marginLeft: 4 }}>{getStatusBadge(i).icon}</span>
                </div>
                <SlideComp />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── STEPPER FORM ── */
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', minHeight: 'calc(100vh - 66px)' }}>
          {/* ── LEFT: Step Navigator (Dark Green Sidebar) ── */}
          <div style={{ padding: '28px 14px', background: '#7D3C70', borderRight: '3px solid #652D5A', overflowY: 'auto' }}>
            {/* Progress counter */}
            <div style={{ padding: '10px 12px', marginBottom: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#FF8435', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{finalizedCount} / {totalSlides}</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${(finalizedCount / totalSlides) * 100}%`, height: '100%', borderRadius: 3, background: allFinalized ? '#22c55e' : 'linear-gradient(90deg, #FF8435, #7D3C70)', transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                {allFinalized ? '✅ All slides finalized — Ready to export!' : 'Finalize all slides to enable PDF export'}
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF8435', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, paddingLeft: 8 }}>Slides</div>
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const badge = getStatusBadge(i);
              const isFinalized = slideStatuses[i] === 'finalized';
              const isEditing = slideStatuses[i] === 'editing';
              return (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                    background: isActive ? 'rgba(255,255,255,0.18)' : isFinalized ? 'rgba(255,132,53,0.12)' : isEditing ? 'rgba(245,158,11,0.08)' : 'transparent',
                    border: isActive ? '2px solid #FF8435' : isFinalized ? '2px solid rgba(255,132,53,0.3)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: isFinalized ? '#22c55e' : isActive ? '#fff' : isEditing ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                    border: `2px solid ${isFinalized ? '#22c55e' : isActive ? '#FF8435' : isEditing ? '#f59e0b' : 'rgba(255,255,255,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 12, color: isFinalized ? '#fff' : isActive ? '#7D3C70' : '#fff',
                  }}>
                    {isFinalized ? '✓' : s.num}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: isActive ? '#fff' : isFinalized ? '#FFF2E9' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</span>
                    </div>
                    <div style={{ fontSize: 10, color: isActive ? '#FF8435' : 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 10 }}>{badge.icon}</span>
                      <span>{badge.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '16px 8px' }} />

            {/* Download button */}
            <div style={{ padding: '0 4px' }}>
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating || !allFinalized}
                title={!allFinalized ? `Finalize all ${totalSlides} slides to enable PDF download` : 'Generate PDF from finalized slides'}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px',
                  background: allFinalized ? '#fff' : 'rgba(255,255,255,0.15)',
                  border: `2px solid ${allFinalized ? '#FF8435' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 10,
                  color: allFinalized ? '#7D3C70' : 'rgba(255,255,255,0.3)',
                  fontWeight: 800, fontSize: 14,
                  cursor: allFinalized ? 'pointer' : 'not-allowed',
                  boxShadow: allFinalized ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
                  transition: 'all 0.3s',
                  opacity: isGenerating ? 0.6 : 1,
                }}
              >
                <Download size={17} />
                {isGenerating ? 'Generating...' : !allFinalized ? `Finalize All (${finalizedCount}/${totalSlides})` : 'Download PDF'}
              </button>
            </div>
          </div>

          {/* ── RIGHT: Form + Preview (White) ── */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'auto', background: '#fff' }}>
            {/* Step header */}
            <div style={{ padding: '22px 32px', borderBottom: '2px solid #E2E8F0', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#7D3C70', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#fff', boxShadow: '0 4px 12px rgba(125,60,112,0.3)' }}>{step + 1}</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#7D3C70', lineHeight: 1 }}>{STEPS[step].title}</h2>
                  <p style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>{STEPS[step].subtitle}</p>
                </div>
                {/* Current slide status badge */}
                <div style={{
                  marginLeft: 12,
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  background: currentStatus === 'finalized' ? '#f0fdf4' : currentStatus === 'editing' ? '#fef3c7' : '#f3f4f6',
                  color: currentStatus === 'finalized' ? '#16a34a' : currentStatus === 'editing' ? '#d97706' : '#6b7280',
                  border: `1px solid ${currentStatus === 'finalized' ? '#bbf7d0' : currentStatus === 'editing' ? '#fcd34d' : '#d1d5db'}`,
                }}>
                  {getStatusBadge(step).icon} {getStatusBadge(step).label}
                </div>
                {/* Step progress dots */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 5, alignItems: 'center' }}>
                  {STEPS.map((_, i) => {
                    const sts = slideStatuses[i];
                    return (
                      <div
                        key={i}
                        onClick={() => setStep(i)}
                        title={`Slide ${i + 1}: ${getStatusBadge(i).label}`}
                        style={{
                          width: i === step ? 24 : 9,
                          height: 9,
                          borderRadius: 5,
                          background: sts === 'finalized' ? '#7D3C70' : sts === 'editing' ? '#f59e0b' : i === step ? '#FF8435' : '#FFD3B6',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          border: i === step ? '1px solid #FF8435' : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form + preview split */}
            <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', overflow: 'hidden' }}>
              {/* Form panel */}
              <div style={{ overflowY: 'auto', padding: '26px 30px', borderRight: '2px solid #E2E8F0', background: '#fff' }}>
                <CurrentForm />

                {/* Next / Prev */}
                <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '2px solid #d1fae5' }}>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#fff', border: '2px solid #7D3C70', borderRadius: 9, color: '#7D3C70', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                      <ChevronLeft size={16} /> Previous
                    </button>
                  )}
                  {step < STEPS.length - 1 && (
                    <button onClick={() => setStep(s => s + 1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#7D3C70', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(125,60,112,0.4)' }}>
                      Next <ChevronRight size={16} />
                    </button>
                  )}
                  {step === STEPS.length - 1 && (
                    <button onClick={() => setShowAllSlides(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#7D3C70', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(125,60,112,0.4)' }}>
                      <Eye size={16} /> Preview All
                    </button>
                  )}
                </div>
              </div>

              {/* Live preview panel */}
              <div style={{ overflowY: 'auto', padding: '26px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: 14, borderLeft: '2px solid #FFF2E9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentStatus === 'finalized' ? '#7D3C70' : '#FF8435', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#7D3C70', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Preview — Slide {step + 1}</span>
                    {currentStatus === 'finalized' && (
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#FAFBFD', color: '#7D3C70', fontWeight: 700 }}>✅ Finalized</span>
                    )}
                  </div>
                  <button onClick={() => setIsJsonPanelOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#fff', border: '1px solid #14532d', borderRadius: 6, color: '#7D3C70', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    <Code size={14} /> Preview JSON
                  </button>
                </div>

                {/* Preview container with ref for html2canvas capture */}
                <div ref={previewRef}>
                  <CurrentPreview />
                </div>

                {/* Finalize button */}
                <button
                  onClick={handleFinalizeSlide}
                  disabled={isFinalizing}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '14px 24px',
                    background: finalizeSuccess ? 'linear-gradient(135deg, #FF8435, #7D3C70)' : currentStatus === 'finalized' ? 'linear-gradient(135deg, #7D3C70, #652D5A)' : 'linear-gradient(135deg, #7D3C70, #FF8435)',
                    border: 'none',
                    borderRadius: 12,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: isFinalizing ? 'wait' : 'pointer',
                    boxShadow: finalizeSuccess ? '0 6px 24px rgba(255,132,53,0.5)' : '0 4px 20px rgba(125,60,112,0.4)',
                    transition: 'all 0.3s ease',
                    opacity: isFinalizing ? 0.7 : 1,
                    transform: finalizeSuccess ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  {isFinalizing ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Capturing Slide...
                    </>
                  ) : finalizeSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      Slide Finalized! ✓
                    </>
                  ) : currentStatus === 'finalized' ? (
                    <>
                      <CheckCircle2 size={18} />
                      Re-Finalize This Slide
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      ✅ Finalize This Slide
                    </>
                  )}
                </button>

                <p style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>
                  {currentStatus === 'finalized'
                    ? '✅ This slide has been captured. Editing will require re-finalization.'
                    : '✏️ Changes reflect instantly as you type. Finalize when ready.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <JsonPreviewPanel
        isOpen={isJsonPanelOpen}
        onClose={() => setIsJsonPanelOpen(false)}
        onDownloadPDF={handleDownloadPDF}
        isGeneratingPDF={isGenerating}
        onApply={() => {
          setIsJsonPanelOpen(false);
          setShowAllSlides(true);
        }}
      />
    </div>
  );
}
