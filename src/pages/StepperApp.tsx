import { useState } from 'react';
import { useFormData } from '../context/FormContext';
import {
  Shirt, ShoppingBag, Leaf, Utensils, MonitorSmartphone, ShoppingCart,
  Building2, HeartPulse, Ticket, Gamepad2, Users, DollarSign, TrendingUp,
  Landmark, Train, Bus, Plane, ShoppingBasket, MapPin, Route,
  CheckCircle2, Loader2, Clock, Calendar, Diamond, ChevronRight,
  ChevronLeft, Download, Eye, Ruler, Expand, Car, Map, Briefcase, Sun, Building, Gem, ArrowUpDown, ScanLine, BarChart3,
} from 'lucide-react';

// Import pptxgenjs dynamically
let PptxGenJS: any = null;
const loadPptxGenJS = async () => {
  if (!PptxGenJS) {
    const module = await import('pptxgenjs');
    PptxGenJS = module.default;
  }
  return PptxGenJS;
};

// ─────────────────────── SLIDE PREVIEW COMPONENTS ───────────────────────────

const CATEGORIES = [
  { name: 'Fashion', icon: Shirt },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Lifestyle', icon: Leaf },
  { name: 'F&B', icon: Utensils },
  { name: 'Electronics', icon: MonitorSmartphone },
  { name: 'Hypermarket', icon: ShoppingCart },
  { name: 'Corporate\nOffices', icon: Building2 },
  { name: 'Health &\nWellness', icon: HeartPulse },
  { name: 'Multiplex', icon: Ticket },
  { name: 'Game Zone', icon: Gamepad2 },
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

function Slide1Preview() {
  const { data: { slide1: s } } = useFormData();
  const theme = s.themeColor || '#3d1a6e';
  const fc = s.fontColor || '#FFFFFF';
  const bgSrc = s.backgroundImage
    ? URL.createObjectURL(s.backgroundImage)
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
  const logoSrc = s.logo ? URL.createObjectURL(s.logo) : null;

  return (
    <SlideShell>
      <img src={bgSrc} alt="bg" style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover' }} />
      <div style={{ position:'absolute',inset:0, background:`linear-gradient(90deg,${theme}f0 0%,${theme}cc 40%,${theme}66 65%,transparent 100%)` }} />
      <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'4%',color:fc }}>
        {/* Top */}
        <div style={{ maxWidth:'50%' }}>
          <div style={{ display:'inline-block',background:theme,border:`2px solid ${fc}44`,borderRadius:5,padding:'3px 10px',fontWeight:800,fontSize:'clamp(9px,1.4vw,16px)',marginBottom:'3%' }}>
            {s.slideNumber||'01'}
          </div>
          <h1 style={{ fontSize:'clamp(16px,4vw,46px)',fontWeight:900,lineHeight:1,marginBottom:'2%',letterSpacing:'-0.02em',whiteSpace:'pre-line' }}>
            {s.title||'MADHAV\nHIGHSTREET'}
          </h1>
          <p style={{ fontSize:'clamp(7px,1.2vw,14px)',fontWeight:600,opacity:0.85,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'2%',whiteSpace:'pre-line' }}>
            {s.subtitle||'THE NEXT PREMIUM RETAIL DESTINATION'}
          </p>
          <p style={{ fontSize:'clamp(6px,1vw,12px)',opacity:0.7,marginBottom:'3%',whiteSpace:'pre-line' }}>
            {s.address||'SINDHU BHAVAN ROAD,\nBODAKDEV, AHMEDABAD'}
          </p>
          <div style={{ width:'12%',height:2,background:fc,opacity:0.6,marginBottom:'3%' }} />
          <p style={{ fontSize:'clamp(5px,0.8vw,10px)',opacity:0.55,marginBottom:'1%' }}>Presented by</p>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            {logoSrc
              ? <img src={logoSrc} alt="logo" style={{ width:'clamp(18px,2.5vw,32px)',height:'clamp(18px,2.5vw,32px)',borderRadius:'50%',objectFit:'cover' }} />
              : <div style={{ width:'clamp(18px,2.5vw,30px)',height:'clamp(18px,2.5vw,30px)',borderRadius:4,background:'#ff6b00',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'clamp(7px,1vw,12px)',color:'#fff',flexShrink:0 }}>A</div>
            }
            <div>
              <div style={{ fontWeight:800,fontSize:'clamp(7px,1.2vw,15px)' }}>{s.companyName||'AESTHETIC ARC'}</div>
              <div style={{ fontSize:'clamp(5px,0.75vw,9px)',opacity:0.55 }}>{s.companyTagline||'PROPERTY LEASING COMPANY'}</div>
            </div>
          </div>
        </div>
        {/* Bottom categories */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(10,1fr)',gap:'clamp(2px,0.4vw,5px)' }}>
          {CATEGORIES.map((c,i)=>{
            const Icon=c.icon;
            return (
              <div key={i} style={{ background:`${fc}18`,border:`1px solid ${fc}2f`,borderRadius:5,padding:'clamp(3px,0.8vw,8px) clamp(1px,0.3vw,4px)',display:'flex',flexDirection:'column',alignItems:'center',gap:'clamp(1px,0.3vw,3px)' }}>
                <Icon size="clamp(8px,1.8vw,20px)" strokeWidth={1.5} style={{ color:fc }} />
                <span style={{ fontSize:'clamp(3px,0.6vw,7px)',color:fc,fontWeight:600,textAlign:'center',lineHeight:1.2,whiteSpace:'pre-line' }}>{c.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide2Preview() {
  const { data:{ slide2:s } } = useFormData();
  const hc='#3d1a6e', ac='#f97316';
  const imgSrc = s.cityImage
    ? URL.createObjectURL(s.cityImage)
    : 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop';

  const stats = [
    { icon:Users, v:s.population||'90.6 Lakh+', l:'Population' },
    { icon:DollarSign, v:s.gdp||'$135 Billion+', l:'GDP' },
    { icon:TrendingUp, v:s.gdpGrowth||'6.7%+', l:'GDP Growth' },
    { icon:Landmark, v:'World\'s 1st', l:s.worldFirst||'Heritage City With BRTS', hi:true },
    { icon:Train, v:s.metroKm||'40 KM+', l:'Metro Network' },
    { icon:Bus, v:s.brtsKm||'160 KM+', l:'BRTS Network' },
    { icon:Plane, v:s.dailyFlights||'130+', l:'Daily Flights' },
    { icon:ShoppingBasket, v:'Top 3', l:s.retailRank||'Fastest Growing Retail Market', hi:true },
  ];

  const infraLines = (s.infrastructure||'').split('\n').filter(Boolean);
  const half = Math.ceil(infraLines.length/2);
  const col1 = infraLines.slice(0,half);
  const col2 = infraLines.slice(half);

  return (
    <SlideShell>
      <div style={{ position:'absolute',inset:0,background:'#fff' }} />
      {/* Right image */}
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:'45%' }}>
        <img src={imgSrc} alt="city" style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>
      {/* Left content */}
      <div style={{ position:'absolute',inset:0,padding:'4%',paddingRight:'50%',display:'flex',flexDirection:'column',justifyContent:'flex-start' }}>
        {/* Header */}
        <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:'3%' }}>
          <div style={{ background:hc,color:'#fff',fontWeight:900,fontSize:'clamp(7px,1.2vw,14px)',padding:'3px 8px',borderRadius:4,flexShrink:0 }}>02</div>
          <div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.4vw,28px)',color:hc,lineHeight:1 }}>{s.cityName||'AHMEDABAD'}</div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.4vw,28px)',color:ac,lineHeight:1 }}>AT A GLANCE</div>
            <div style={{ fontSize:'clamp(5px,0.85vw,10px)',color:'#555',marginTop:2 }}>A Thriving City. A Growing Opportunity.</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'clamp(2px,0.5vw,6px)',marginBottom:'3%' }}>
          {stats.map((st,i)=>{
            const Icon=st.icon;
            return (
              <div key={i} style={{ border:`1px solid ${(st as any).hi?hc:'#e5e7eb'}`,borderRadius:5,padding:'clamp(3px,0.7vw,8px)',background:(st as any).hi?`${hc}09`:'#fff' }}>
                <Icon size="clamp(7px,1.2vw,14px)" style={{ color:hc,opacity:0.7 }} strokeWidth={1.5} />
                <div style={{ fontWeight:800,fontSize:'clamp(7px,1.2vw,14px)',color:hc,lineHeight:1.2,marginTop:2 }}>{st.v}</div>
                <div style={{ fontSize:'clamp(4px,0.65vw,8px)',color:'#666',lineHeight:1.3 }}>{st.l}</div>
              </div>
            );
          })}
        </div>
        {/* Infrastructure */}
        <div>
          <div style={{ fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:hc,fontSize:'clamp(5px,0.8vw,10px)',marginBottom:'1%' }}>UPCOMING INFRASTRUCTURE</div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px 12px' }}>
            {col1.map((t,i)=><div key={`a${i}`} style={{ fontSize:'clamp(4px,0.7vw,8px)',color:'#374151',display:'flex',gap:3,alignItems:'center' }}><span style={{ color:hc,fontWeight:700 }}>•</span>{t}</div>)}
            {col2.map((t,i)=><div key={`b${i}`} style={{ fontSize:'clamp(4px,0.7vw,8px)',color:'#374151',display:'flex',gap:3,alignItems:'center' }}><span style={{ color:hc,fontWeight:700 }}>•</span>{t}</div>)}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide3Preview() {
  const { data:{ slide3:s } } = useFormData();
  const hc='#3d1a6e', ac='#f97316';
  const imgSrc = s.mapImage
    ? URL.createObjectURL(s.mapImage)
    : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop';

  const points = [
    { icon:MapPin, t:s.point1Title||'2 Mins from SG Highway', d:s.point1Desc||'Excellent Connectivity' },
    { icon:Route, t:s.point2Title||'Easy Access to SP Ring Road', d:s.point2Desc||'' },
    { icon:Building2, t:s.point3Title||'Surrounded by Premium', d:s.point3Desc||'Residential & Commercial Developments' },
  ];

  const titleLines = (s.locationTitle||'PREMIUM LOCATION\nTHAT CONNECTS EVERYTHING').split('\n');

  return (
    <SlideShell>
      <div style={{ position:'absolute',inset:0,background:'#fff' }} />
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:'56%' }}>
        <img src={imgSrc} alt="map" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.75 }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(270deg,transparent 35%,white 100%)' }} />
      </div>
      <div style={{ position:'absolute',inset:0,padding:'5%',paddingRight:'52%',display:'flex',flexDirection:'column',justifyContent:'center' }}>
        <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:'4%' }}>
          <div style={{ background:hc,color:'#fff',fontWeight:900,fontSize:'clamp(7px,1.2vw,14px)',padding:'3px 8px',borderRadius:4,flexShrink:0 }}>03</div>
          <div>
            <div style={{ fontWeight:900,fontSize:'clamp(10px,2.2vw,26px)',color:hc,lineHeight:1.1 }}>{titleLines[0]||'PREMIUM LOCATION'}</div>
            <div style={{ fontWeight:900,fontSize:'clamp(10px,2.2vw,26px)',color:ac,lineHeight:1.1 }}>{titleLines[1]||'THAT CONNECTS EVERYTHING'}</div>
          </div>
        </div>
        <div style={{ marginBottom:'4%',fontSize:'clamp(6px,1vw,12px)',color:'#374151',fontWeight:500,whiteSpace:'pre-line' }}>
          {s.address||'Sindhu Bhavan Road,\nBodakdev, Ahmedabad'}
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'clamp(5px,1vw,12px)',marginBottom:'5%' }}>
          {points.map((p,i)=>{
            const Icon=p.icon;
            return (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:8 }}>
                <div style={{ width:'clamp(12px,2vw,24px)',height:'clamp(12px,2vw,24px)',border:`1.5px solid ${ac}`,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color:ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight:700,color:hc,fontSize:'clamp(6px,1.1vw,13px)' }}>{p.t}</div>
                  {p.d&&<div style={{ fontSize:'clamp(4px,0.8vw,9px)',color:'#6b7280' }}>{p.d}</div>}
                </div>
              </div>
            );
          })}
        </div>
        <button style={{ background:ac,color:'#fff',fontWeight:700,fontSize:'clamp(5px,0.9vw,11px)',padding:'clamp(4px,0.8vw,9px) clamp(8px,1.5vw,18px)',borderRadius:30,border:'none',display:'flex',alignItems:'center',gap:5,cursor:'pointer',width:'fit-content' }}>
          <MapPin size="clamp(7px,1vw,12px)" /> VIEW ON GOOGLE MAPS
        </button>
      </div>
    </SlideShell>
  );
}

function Slide4Preview() {
  const { data:{ slide4:s } } = useFormData();
  const hc='#3d1a6e', ac='#f97316';
  const imgSrc = s.projectImage
    ? URL.createObjectURL(s.projectImage)
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  const features = [
    { icon:Building2, t:s.feature1Title||'Premium Corner Plot', d:s.feature1Desc||'with Wide Frontage' },
    { icon:Landmark, t:s.feature2Title||'Modern Retail Architecture', d:s.feature2Desc||'with Maximum Visibility' },
    { icon:Diamond, t:s.feature3Title||'Designed for Premium Brands', d:s.feature3Desc||'& High Footfall' },
    { icon:Calendar, t:s.possessionLabel||'Possession', d:s.possessionDate||'March 2027' },
  ];

  return (
    <SlideShell>
      <div style={{ position:'absolute',inset:0,background:'#fff' }} />
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:'56%' }}>
        <img src={imgSrc} alt="project" style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(270deg,transparent 40%,white 100%)' }} />
        <div style={{ position:'absolute',bottom:'6%',right:'4%',background:hc,color:'#fff',padding:'clamp(5px,0.9vw,10px) clamp(8px,1.4vw,16px)',borderRadius:7,textAlign:'center' }}>
          <div style={{ fontSize:'clamp(4px,0.6vw,7px)',letterSpacing:'0.12em',opacity:0.65,marginBottom:2 }}>EXPECTED POSSESSION</div>
          <div style={{ fontSize:'clamp(8px,1.5vw,17px)',fontWeight:900,letterSpacing:'0.05em' }}>{(s.possessionDate||'MARCH 2027').toUpperCase()}</div>
        </div>
      </div>
      <div style={{ position:'absolute',inset:0,padding:'5%',paddingRight:'52%',display:'flex',flexDirection:'column',justifyContent:'center' }}>
        <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:'5%' }}>
          <div style={{ background:hc,color:'#fff',fontWeight:900,fontSize:'clamp(7px,1.2vw,14px)',padding:'3px 8px',borderRadius:4,flexShrink:0 }}>04</div>
          <div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.6vw,30px)',color:hc,lineHeight:1.1 }}>PROJECT</div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.6vw,30px)',color:ac,lineHeight:1.1 }}>SHOWCASE</div>
          </div>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'clamp(7px,1.3vw,16px)' }}>
          {features.map((f,i)=>{
            const Icon=f.icon;
            return (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:8 }}>
                <div style={{ width:'clamp(12px,2vw,24px)',height:'clamp(12px,2vw,24px)',border:`1.5px solid ${ac}`,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color:ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight:700,color:hc,fontSize:'clamp(6px,1.1vw,13px)' }}>{f.t}</div>
                  <div style={{ fontSize:'clamp(4px,0.8vw,9px)',color:'#6b7280' }}>{f.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide5Preview() {
  const { data:{ slide5:s } } = useFormData();
  const hc='#3d1a6e', ac='#f97316';
  const imgSrc = s.constructionImage
    ? URL.createObjectURL(s.constructionImage)
    : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop';

  const items = [
    { icon:CheckCircle2, t:s.progress1Title||'Foundation', st:s.progress1Status||'Completed' },
    { icon:Loader2, t:s.progress2Title||'Structure', st:s.progress2Status||'In Progress' },
    { icon:Clock, t:s.progress3Title||'Finishing', st:s.progress3Status||'Ahead' },
    { icon:Calendar, t:s.progress4Title||'Possession', st:s.progress4Status||'March 2027' },
  ];

  return (
    <SlideShell>
      <div style={{ position:'absolute',inset:0,background:'#fff' }} />
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:'56%' }}>
        <img src={imgSrc} alt="construction" style={{ width:'100%',height:'100%',objectFit:'cover' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(270deg,transparent 40%,white 100%)' }} />
        <div style={{ position:'absolute',bottom:'6%',right:'4%',background:hc,color:'#fff',padding:'clamp(5px,0.9vw,10px) clamp(8px,1.4vw,16px)',borderRadius:7,textAlign:'center' }}>
          <div style={{ fontSize:'clamp(4px,0.6vw,7px)',letterSpacing:'0.12em',opacity:0.65,marginBottom:2 }}>CURRENT STATUS</div>
          <div style={{ fontSize:'clamp(8px,1.5vw,17px)',fontWeight:900,letterSpacing:'0.05em' }}>{(s.currentStatus||'JUNE 2026').toUpperCase()}</div>
        </div>
      </div>
      <div style={{ position:'absolute',inset:0,padding:'5%',paddingRight:'52%',display:'flex',flexDirection:'column',justifyContent:'center' }}>
        <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:'5%' }}>
          <div style={{ background:hc,color:'#fff',fontWeight:900,fontSize:'clamp(7px,1.2vw,14px)',padding:'3px 8px',borderRadius:4,flexShrink:0 }}>05</div>
          <div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.6vw,30px)',color:hc,lineHeight:1.1 }}>CONSTRUCTION</div>
            <div style={{ fontWeight:900,fontSize:'clamp(11px,2.6vw,30px)',color:ac,lineHeight:1.1 }}>PROGRESS</div>
          </div>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:'clamp(7px,1.3vw,16px)' }}>
          {items.map((it,i)=>{
            const Icon=it.icon;
            return (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',gap:8 }}>
                <div style={{ width:'clamp(12px,2vw,24px)',height:'clamp(12px,2vw,24px)',border:`1.5px solid ${ac}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <Icon size="clamp(6px,1vw,12px)" style={{ color:ac }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontWeight:700,color:hc,fontSize:'clamp(6px,1.1vw,13px)' }}>{it.t}</div>
                  <div style={{ fontSize:'clamp(4px,0.8vw,9px)',color:'#6b7280' }}>{it.st}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide6Preview() {
  const { data: { slide6: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';
  const imgSrc = s.planImage
    ? URL.createObjectURL(s.planImage)
    : 'https://images.unsplash.com/photo-1598928506311-c55dd1b4eb64?q=80&w=800&auto=format&fit=crop';

  const features = [
    { icon: Ruler, label: s.floorHeightLabel || 'Floor Height', val: s.floorHeightValue || '12\'5"' },
    { icon: Expand, label: s.frontageLabel || 'Frontage', val: s.frontageValue || '20\' to 35\'' },
    { icon: Car, label: s.parkingLabel || 'Parking', val: s.parkingValue || 'Ample Two Wheeler\n& Four Wheeler' },
    { icon: Map, label: s.roadAccessLabel || 'Road Access', val: s.roadAccessValue || '30 MT Wide Road' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="floor plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '4%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
            {s.slideNumber || '06'}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || 'GROUND FLOOR PLAN'}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || 'RETAIL SPACES'}</div>
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
    </SlideShell>
  );
}

function Slide7Preview() {
  const { data: { slide7: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';
  const imgSrc = s.planImage
    ? URL.createObjectURL(s.planImage)
    : 'https://images.unsplash.com/photo-1598928506311-c55dd1b4eb64?q=80&w=800&auto=format&fit=crop';

  const features = [
    { icon: Ruler, label: s.floorHeightLabel || 'Floor Height', val: s.floorHeightValue || '9\'5"' },
    { icon: Briefcase, label: s.bestForLabel || 'Best for', val: s.bestForValue || 'F&B / Lifestyle / Offices' },
    { icon: Sun, label: s.terraceLabel || 'Open Terrace', val: s.terraceValue || 'Provision' },
    { icon: Building, label: s.liftStaircaseLabel || 'Lift & Staircase', val: s.liftStaircaseValue || 'Access' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '56%' }}>
        <img src={imgSrc} alt="floor plan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,transparent 40%,white 100%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, padding: '4%', paddingRight: '52%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '5%' }}>
          <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
            {s.slideNumber || '07'}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || 'SECOND FLOOR PLAN'}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || 'RETAIL SPACES'}</div>
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
    </SlideShell>
  );
}

function Slide8Preview() {
  const { data: { slide8: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';
  const imgSrc = s.mapImage
    ? URL.createObjectURL(s.mapImage)
    : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop';

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
            {s.slideNumber || '08'}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || 'BRAND LOCATION MAP'}</div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || 'BE IN THE COMPANY OF THE BEST'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.8vw,10px)' }}>
          {brandLines.map((line, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 'clamp(8px,1.5vw,14px)',
                height: 'clamp(8px,1.5vw,14px)',
                borderRadius: '50%',
                background: legendColors[i % legendColors.length],
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 'clamp(6px,1vw,12px)', fontWeight: 700, color: '#374151' }}>
                {line.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide9Preview() {
  const { data: { slide9: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';
  
  const cards = [
    {
      img: s.img1 ? URL.createObjectURL(s.img1) : 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop',
      label: s.label1 || 'FINE DINING'
    },
    {
      img: s.img2 ? URL.createObjectURL(s.img2) : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop',
      label: s.label2 || 'SHOPPING'
    },
    {
      img: s.img3 ? URL.createObjectURL(s.img3) : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop',
      label: s.label3 || 'FITNESS'
    },
    {
      img: s.img4 ? URL.createObjectURL(s.img4) : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop',
      label: s.label4 || 'ENTERTAINMENT'
    },
    {
      img: s.img5 ? URL.createObjectURL(s.img5) : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop',
      label: s.label5 || 'RESIDENTIAL CATCHMENT'
    }
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} />
      {/* Header */}
      <div style={{ position: 'absolute', left: '4%', top: '4%', right: '4%', display: 'flex', alignItems: 'flex-start', gap: 8, zIndex: 10 }}>
        <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {s.slideNumber || '09'}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>{s.title || 'LIFESTYLE AROUND YOU'}</div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>{s.subtitle || 'EVERYTHING NEARBY'}</div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '8%', top: '24%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(4px, 1.2vw, 12px)' }}>
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
    </SlideShell>
  );
}

function Slide10Preview() {
  const { data: { slide10: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';

  const col1 = [
    { icon: Building2, label: s.spec1Label || 'Project Type', val: s.spec1Value || 'Commercial' },
    { icon: MapPin, label: s.spec2Label || 'Location', val: s.spec2Value || 'Sindhu Bhavan Road,\nBodakdev, Ahmedabad' },
    { icon: Gem, label: s.spec3Label || 'Jewellery Brands', val: s.spec3Value || 'Tanishq, Malabar,\nPC Jeweller & More' },
    { icon: Shirt, label: s.spec4Label || 'Apparel Brands', val: s.spec4Value || 'Zara, H&M, Trends,\nLifestyle & More' },
    { icon: Utensils, label: s.spec5Label || 'F&B Outlets', val: s.spec5Value || "McDonald's, Starbucks,\nThe White Crow & More" },
  ];

  const col2 = [
    { icon: ArrowUpDown, label: s.spec6Label || 'Ground Floor Height', val: s.spec6Value || "12'5\"" },
    { icon: ArrowUpDown, label: s.spec7Label || 'First Floor Height', val: s.spec7Value || "10'5\"" },
    { icon: ArrowUpDown, label: s.spec8Label || 'Second Floor Height', val: s.spec8Value || "9'5\"" },
    { icon: Calendar, label: s.spec9Label || 'Possession', val: s.spec9Value || 'March 2027' },
    { icon: ScanLine, label: s.spec10Label || 'Google Maps', val: s.spec10Value || 'Scan QR Code' },
  ];

  const qrSrc = s.qrImage
    ? URL.createObjectURL(s.qrImage)
    : `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(s.qrUrl || 'https://maps.google.com')}`;

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} />
      {/* Header */}
      <div style={{ position: 'absolute', left: '4%', top: '4%', right: '4%', display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {s.slideNumber || '10'}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: hc, lineHeight: 1.1 }}>PROPERTY</div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.4vw,28px)', color: ac, lineHeight: 1.1 }}>SPECIFICATIONS</div>
        </div>
      </div>

      {/* Columns Grid */}
      <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '4%', top: '24%', display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr', gap: 'clamp(8px, 2vw, 20px)' }}>
        {/* Col 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 10px)' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed #d1d5db', borderRadius: 8, padding: '10%', background: '#f9fafb' }}>
          <img src={qrSrc} alt="QR Code" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
        </div>
      </div>
    </SlideShell>
  );
}

function Slide11Preview() {
  const { data: { slide11: s } } = useFormData();
  const hc = '#3d1a6e', ac = '#f97316';

  const row1 = [
    { icon: MapPin, label: s.card1Label || 'Prime Location\nHigh Visibility' },
    { icon: ShoppingBag, label: s.card2Label || 'Surrounded by\nPremium Brands' },
    { icon: Users, label: s.card3Label || 'High Footfall\nCatchment' },
    { icon: Building, label: s.card4Label || 'Modern Architecture\n& Design' },
  ];

  const row2 = [
    { icon: Route, label: s.card5Label || 'Excellent\nConnectivity & Access' },
    { icon: TrendingUp, label: s.card6Label || 'Strong Investment\n& Returns' },
    { icon: BarChart3, label: s.card7Label || 'Strong Investment\nPotential' },
  ];

  return (
    <SlideShell>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} />
      {/* Header */}
      <div style={{ position: 'absolute', left: '4%', top: '4%', right: '4%', display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <div style={{ background: hc, color: '#fff', fontWeight: 900, fontSize: 'clamp(7px,1.2vw,14px)', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
          {s.slideNumber || '11'}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.2vw,24px)', color: hc, lineHeight: 1.1 }}>WHY INVEST IN</div>
          <div style={{ fontWeight: 900, fontSize: 'clamp(11px,2.2vw,24px)', color: ac, lineHeight: 1.1 }}>MADHAV HIGHSTREET?</div>
        </div>
      </div>

      {/* Cards Area */}
      <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '8%', top: '24%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(8px, 2vw, 20px)' }}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(8px, 1.5vw, 16px)' }}>
          {row1.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 'clamp(8px, 1.5vw, 14px)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 'clamp(20px, 3.5vw, 36px)', height: 'clamp(20px, 3.5vw, 36px)', borderRadius: '50%', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(10px, 1.8vw, 18px)" style={{ color: ac }} />
                </div>
                <div style={{ fontSize: 'clamp(6px, 1vw, 11px)', fontWeight: 700, color: hc, whiteSpace: 'pre-line', lineHeight: 1.2 }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(8px, 1.5vw, 16px)' }}>
          {row2.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', width: '23%', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 'clamp(8px, 1.5vw, 14px)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 'clamp(20px, 3.5vw, 36px)', height: 'clamp(20px, 3.5vw, 36px)', borderRadius: '50%', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size="clamp(10px, 1.8vw, 18px)" style={{ color: ac }} />
                </div>
                <div style={{ fontSize: 'clamp(6px, 1vw, 11px)', fontWeight: 700, color: hc, whiteSpace: 'pre-line', lineHeight: 1.2 }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

const SLIDE_PREVIEWS = [Slide1Preview, Slide2Preview, Slide3Preview, Slide4Preview, Slide5Preview, Slide6Preview, Slide7Preview, Slide8Preview, Slide9Preview, Slide10Preview, Slide11Preview];

// ─────────────────────── FORM FIELD HELPERS ─────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: '#f8fafb',
  border: '1.5px solid #d1d5db', borderRadius: 8, color: '#1a2e1a',
  fontSize: 14, outline: 'none', transition: 'border 0.2s',
};
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: '#14532d', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' };
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical', minHeight: 70 };
const fileStyle: React.CSSProperties = { ...inputStyle, cursor: 'pointer', background: '#f0fdf4', borderColor: '#bbf7d0' };

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
        {s.backgroundImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.backgroundImage.name}</span>}
      </Field>
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
        {s.cityImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.cityImage.name}</span>}
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
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 1</div>
        <Field label="Title"><input style={inputStyle} value={s.point1Title} onChange={e => u('point1Title', e.target.value)} placeholder="2 Mins from SG Highway" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point1Desc} onChange={e => u('point1Desc', e.target.value)} placeholder="Excellent Connectivity" /></Field>
      </div>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 2</div>
        <Field label="Title"><input style={inputStyle} value={s.point2Title} onChange={e => u('point2Title', e.target.value)} placeholder="Easy Access to SP Ring Road" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point2Desc} onChange={e => u('point2Desc', e.target.value)} placeholder="Optional description" /></Field>
      </div>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location Point 3</div>
        <Field label="Title"><input style={inputStyle} value={s.point3Title} onChange={e => u('point3Title', e.target.value)} placeholder="Surrounded by Premium" /></Field>
        <Field label="Description"><input style={inputStyle} value={s.point3Desc} onChange={e => u('point3Desc', e.target.value)} placeholder="Residential & Commercial Developments" /></Field>
      </div>
      <Field label="Google Maps URL">
        <input style={inputStyle} value={s.mapsUrl} onChange={e => u('mapsUrl', e.target.value)} placeholder="https://maps.google.com/..." />
      </Field>
      <Field label="Map / Location Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('mapImage', e.target.files[0])} />
        {s.mapImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.mapImage.name}</span>}
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
        <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
          <Field label="Feature Title"><input style={inputStyle} value={(s as any)[f.tK]} onChange={e => u(f.tK, e.target.value)} placeholder={f.pt} /></Field>
          <Field label="Feature Description"><input style={inputStyle} value={(s as any)[f.dK]} onChange={e => u(f.dK, e.target.value)} placeholder={f.pd} /></Field>
        </div>
      ))}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4 (Possession)</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Label"><input style={inputStyle} value={s.possessionLabel} onChange={e => u('possessionLabel', e.target.value)} placeholder="Possession" /></Field>
          <Field label="Date (also shown in badge)"><input style={inputStyle} value={s.possessionDate} onChange={e => u('possessionDate', e.target.value)} placeholder="March 2027" /></Field>
        </div>
      </div>
      <Field label="Project Building Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('projectImage', e.target.files[0])} />
        {s.projectImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.projectImage.name}</span>}
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
        <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{it.label}</div>
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
        {s.constructionImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.constructionImage.name}</span>}
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
      
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 1</div>
        <Field label="Label"><input style={inputStyle} value={s.floorHeightLabel} onChange={e => u('floorHeightLabel', e.target.value)} placeholder="Floor Height" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.floorHeightValue} onChange={e => u('floorHeightValue', e.target.value)} placeholder={"12'5\""} /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 2</div>
        <Field label="Label"><input style={inputStyle} value={s.frontageLabel} onChange={e => u('frontageLabel', e.target.value)} placeholder="Frontage" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.frontageValue} onChange={e => u('frontageValue', e.target.value)} placeholder="20' to 35'" /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 3</div>
        <Field label="Label"><input style={inputStyle} value={s.parkingLabel} onChange={e => u('parkingLabel', e.target.value)} placeholder="Parking" /></Field>
        <Field label="Value"><textarea style={textareaStyle} value={s.parkingValue} onChange={e => u('parkingValue', e.target.value)} placeholder="Ample Two Wheeler & Four Wheeler" /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4</div>
        <Field label="Label"><input style={inputStyle} value={s.roadAccessLabel} onChange={e => u('roadAccessLabel', e.target.value)} placeholder="Road Access" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.roadAccessValue} onChange={e => u('roadAccessValue', e.target.value)} placeholder="30 MT Wide Road" /></Field>
      </div>

      <Field label="Floor Plan Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('planImage', e.target.files[0])} />
        {s.planImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.planImage.name}</span>}
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
      
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 1</div>
        <Field label="Label"><input style={inputStyle} value={s.floorHeightLabel} onChange={e => u('floorHeightLabel', e.target.value)} placeholder="Floor Height" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.floorHeightValue} onChange={e => u('floorHeightValue', e.target.value)} placeholder={"9'5\""} /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 2</div>
        <Field label="Label"><input style={inputStyle} value={s.bestForLabel} onChange={e => u('bestForLabel', e.target.value)} placeholder="Best for" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.bestForValue} onChange={e => u('bestForValue', e.target.value)} placeholder="F&B / Lifestyle / Offices" /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 3</div>
        <Field label="Label"><input style={inputStyle} value={s.terraceLabel} onChange={e => u('terraceLabel', e.target.value)} placeholder="Open Terrace" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.terraceValue} onChange={e => u('terraceValue', e.target.value)} placeholder="Provision" /></Field>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature 4</div>
        <Field label="Label"><input style={inputStyle} value={s.liftStaircaseLabel} onChange={e => u('liftStaircaseLabel', e.target.value)} placeholder="Lift & Staircase" /></Field>
        <Field label="Value"><input style={inputStyle} value={s.liftStaircaseValue} onChange={e => u('liftStaircaseValue', e.target.value)} placeholder="Access" /></Field>
      </div>

      <Field label="Floor Plan Image (Right side)">
        <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('planImage', e.target.files[0])} />
        {s.planImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.planImage.name}</span>}
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
        {s.mapImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.mapImage.name}</span>}
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
        <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.title}</div>
          <Field label="Label">
            <input style={inputStyle} value={(s as any)[cat.labelK]} onChange={e => u(cat.labelK, e.target.value)} placeholder={cat.defaultLabel} />
          </Field>
          <Field label="Image">
            <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u(cat.imgK, e.target.files[0])} />
            {(s as any)[cat.imgK] && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {(s as any)[cat.imgK].name}</span>}
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
        <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{spec.title}</div>
          <Field label="Label">
            <input style={inputStyle} value={(s as any)[spec.lK]} onChange={e => u(spec.lK, e.target.value)} placeholder={spec.dL} />
          </Field>
          <Field label="Value">
            <textarea style={textareaStyle} value={(s as any)[spec.vK]} onChange={e => u(spec.vK, e.target.value)} placeholder={spec.dV} />
          </Field>
        </div>
      ))}

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>QR Code Settings</div>
        <Field label="QR Target URL">
          <input style={inputStyle} value={s.qrUrl} onChange={e => u('qrUrl', e.target.value)} placeholder="https://maps.google.com" />
        </Field>
        <Field label="Or Upload Custom QR Image">
          <input type="file" accept="image/*" style={fileStyle} onChange={e => e.target.files && u('qrImage', e.target.files[0])} />
          {s.qrImage && <span style={{ fontSize: 11, color: '#6ee7b7', marginTop: 4, display: 'block' }}>✓ {s.qrImage.name}</span>}
        </Field>
      </div>
    </div>
  );
}

function Step11Form() {
  const { data: { slide11: s }, updateSlide11 } = useFormData();
  const u = (k: any, v: any) => updateSlide11({ [k]: v });

  const cards = [
    { labelK: 'card1Label', defaultLabel: 'Prime Location\nHigh Visibility', title: 'Highlight 1' },
    { labelK: 'card2Label', defaultLabel: 'Surrounded by\nPremium Brands', title: 'Highlight 2' },
    { labelK: 'card3Label', defaultLabel: 'High Footfall\nCatchment', title: 'Highlight 3' },
    { labelK: 'card4Label', defaultLabel: 'Modern Architecture\n& Design', title: 'Highlight 4' },
    { labelK: 'card5Label', defaultLabel: 'Excellent\nConnectivity & Access', title: 'Highlight 5' },
    { labelK: 'card6Label', defaultLabel: 'Strong Investment\n& Returns', title: 'Highlight 6' },
    { labelK: 'card7Label', defaultLabel: 'Strong Investment\nPotential', title: 'Highlight 7' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slide Number">
          <input style={inputStyle} value={s.slideNumber} onChange={e => u('slideNumber', e.target.value)} placeholder="11" />
        </Field>
      </div>
      <Field label="Slide Title">
        <input style={inputStyle} value={s.title} onChange={e => u('title', e.target.value)} placeholder="WHY INVEST IN MADHAV HIGHSTREET?" />
      </Field>

      {cards.map((card, i) => (
        <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#14532d', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.title}</div>
          <Field label="Label">
            <textarea style={textareaStyle} value={(s as any)[card.labelK]} onChange={e => u(card.labelK, e.target.value)} placeholder={card.defaultLabel} />
          </Field>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  { num: 1, title: 'Cover Slide', subtitle: 'Title, company & theme', form: Step1Form },
  { num: 2, title: 'City At A Glance', subtitle: 'Stats & infrastructure', form: Step2Form },
  { num: 3, title: 'Premium Location', subtitle: 'Map & location points', form: Step3Form },
  { num: 4, title: 'Project Showcase', subtitle: 'Features & possession', form: Step4Form },
  { num: 5, title: 'Construction', subtitle: 'Progress & status', form: Step5Form },
  { num: 6, title: 'Floor Plan 1', subtitle: 'Ground layout & features', form: Step6Form },
  { num: 7, title: 'Floor Plan 2', subtitle: 'Second layout & features', form: Step7Form },
  { num: 8, title: 'Brand Map', subtitle: 'Company of the best', form: Step8Form },
  { num: 9, title: 'Lifestyle Grid', subtitle: 'Everything nearby', form: Step9Form },
  { num: 10, title: 'Specifications', subtitle: 'Property specs & details', form: Step10Form },
  { num: 11, title: 'Why Invest', subtitle: 'Key investment highlights', form: Step11Form },
];

// ─────────────────────── MAIN STEPPER APP ────────────────────────────────────

export default function StepperApp() {
  const [step, setStep] = useState(0); // 0-indexed
  const [showAllSlides, setShowAllSlides] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { data } = useFormData();

  const CurrentForm = STEPS[step].form;
  const CurrentPreview = SLIDE_PREVIEWS[step];

  // Helper: convert a File to base64 data URL
  const fileToBase64 = (file: File | Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  // Helper: fetch an image URL and return base64 data URL
  const urlToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
  };

  // Helper: get base64 from File or fallback URL, returns null if both fail
  const getImageBase64 = async (file: File | null, fallbackUrl: string): Promise<string | null> => {
    if (file) {
      return await fileToBase64(file);
    }
    try {
      return await urlToBase64(fallbackUrl);
    } catch {
      return null;
    }
  };

  const handleDownloadPPT = async () => {
    setIsGenerating(true);
    
    try {
      const PptxGenJS = await loadPptxGenJS();
      const pptx = new PptxGenJS();

      // ==================== SLIDE 1: COVER PAGE ====================
      const slide1 = pptx.addSlide();
      const themeColor = data.slide1.themeColor.replace('#', '');
      const fontColor = data.slide1.fontColor.replace('#', '');
      
      // Background image
      const bgImageData = await getImageBase64(
        data.slide1.backgroundImage,
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
      );
      
      if (bgImageData) {
        slide1.background = { data: bgImageData };
      } else {
        slide1.background = { color: themeColor };
      }
      
      // Gradient overlay – simulate left-to-right gradient with multiple rect strips
      // Left side: nearly opaque theme color → right side: transparent
      const gradientSteps = [
        { x: 0, w: 3, transparency: 5 },    // almost solid
        { x: 3, w: 1.5, transparency: 20 },  // mostly opaque
        { x: 4.5, w: 1.5, transparency: 45 }, // semi-transparent
        { x: 6, w: 1.5, transparency: 70 },   // mostly transparent
        { x: 7.5, w: 2.5, transparency: 90 }, // nearly invisible
      ];
      gradientSteps.forEach(g => {
        slide1.addShape(pptx.ShapeType.rect, {
          x: g.x, y: 0, w: g.w, h: 7.5,
          fill: { color: themeColor, transparency: g.transparency },
          line: { type: 'none' }
        });
      });

      // Slide number badge
      slide1.addText(data.slide1.slideNumber || '01', {
        x: 0.4, y: 0.35, w: 0.7, h: 0.45, fontSize: 16, bold: true,
        color: fontColor, fill: { color: themeColor },
        align: 'center', valign: 'middle',
      });

      // Title
      slide1.addText(data.slide1.title || 'MADHAV\nHIGHSTREET', {
        x: 0.4, y: 1.0, w: 5, h: 1.4, fontSize: 44, bold: true,
        color: fontColor, fontFace: 'Arial',
      });

      // Subtitle
      slide1.addText(data.slide1.subtitle || 'THE NEXT PREMIUM RETAIL DESTINATION', {
        x: 0.4, y: 2.5, w: 5, h: 0.5, fontSize: 16, bold: true,
        color: fontColor, fontFace: 'Arial',
      });

      // Address
      slide1.addText(data.slide1.address || 'SINDHU BHAVAN ROAD,\nBODAKDEV, AHMEDABAD', {
        x: 0.4, y: 3.1, w: 5, h: 0.65, fontSize: 12,
        color: fontColor, fontFace: 'Arial',
      });

      // Divider line
      slide1.addShape(pptx.ShapeType.rect, {
        x: 0.4, y: 3.85, w: 1.2, h: 0.03,
        fill: { color: fontColor },
        line: { type: 'none' }
      });

      // Presented by
      slide1.addText('Presented by', {
        x: 0.4, y: 4.05, w: 5, h: 0.3, fontSize: 10,
        color: fontColor, fontFace: 'Arial',
      });

      // Logo + Company name
      let logoData: string | null = null;
      if (data.slide1.logo) {
        logoData = await fileToBase64(data.slide1.logo);
      }

      if (logoData) {
        slide1.addImage({
          data: logoData,
          x: 0.4, y: 4.4, w: 0.4, h: 0.4,
          rounding: true,
        });
        slide1.addText(data.slide1.companyName || 'AESTHETIC ARC', {
          x: 0.9, y: 4.35, w: 4, h: 0.3, fontSize: 14, bold: true,
          color: fontColor, fontFace: 'Arial',
        });
        slide1.addText(data.slide1.companyTagline || 'PROPERTY LEASING COMPANY', {
          x: 0.9, y: 4.65, w: 4, h: 0.25, fontSize: 9,
          color: fontColor, fontFace: 'Arial',
        });
      } else {
        // Orange logo placeholder square with "A"
        slide1.addShape(pptx.ShapeType.rect, {
          x: 0.4, y: 4.4, w: 0.35, h: 0.35,
          fill: { color: 'ff6b00' },
          line: { type: 'none' },
          rectRadius: 0.05,
        });
        slide1.addText('A', {
          x: 0.4, y: 4.4, w: 0.35, h: 0.35, fontSize: 14, bold: true,
          color: 'FFFFFF', align: 'center', valign: 'middle',
        });
        slide1.addText(data.slide1.companyName || 'AESTHETIC ARC', {
          x: 0.85, y: 4.35, w: 4, h: 0.3, fontSize: 14, bold: true,
          color: fontColor, fontFace: 'Arial',
        });
        slide1.addText(data.slide1.companyTagline || 'PROPERTY LEASING COMPANY', {
          x: 0.85, y: 4.65, w: 4, h: 0.25, fontSize: 9,
          color: fontColor, fontFace: 'Arial',
        });
      }

      // Categories – single row of 10 at the bottom (matching web preview)
      const categories = [
        'Fashion', 'Retail', 'Lifestyle', 'F&B', 'Electronics',
        'Hypermarket', 'Corporate\nOffices', 'Health &\nWellness', 'Multiplex', 'Game Zone',
      ];
      // Unicode icons that render well in PowerPoint
      const catIcons = ['🏪', '🛍️', '🌿', '🍽️', '💻', '🛒', '🏢', '❤️', '🎬', '🎮'];

      const catY = 5.25;
      const catW = 0.82;
      const catH = 0.75;
      const catGap = 0.1;
      const totalCatWidth = 10 * catW + 9 * catGap; // ~9.1
      const actualStartX = (10 - totalCatWidth) / 2; // center them

      categories.forEach((name, i) => {
        const xPos = actualStartX + i * (catW + catGap);
        // Background box
        slide1.addShape(pptx.ShapeType.rect, {
          x: xPos, y: catY, w: catW, h: catH,
          fill: { color: fontColor, transparency: 85 },
          line: { color: fontColor, width: 0.5, dashType: 'solid' },
          rectRadius: 0.05,
        });
        // Icon
        slide1.addText(catIcons[i], {
          x: xPos, y: catY, w: catW, h: catH * 0.55, fontSize: 16,
          align: 'center', valign: 'middle',
        });
        // Name
        slide1.addText(name, {
          x: xPos, y: catY + catH * 0.5, w: catW, h: catH * 0.5, fontSize: 6,
          color: fontColor, align: 'center', valign: 'top', bold: true, fontFace: 'Arial',
        });
      });

      // ==================== SLIDE 2: CITY AT A GLANCE ====================
      const slide2 = pptx.addSlide();
      slide2.background = { color: 'FFFFFF' };
      
      // City image on right side
      const cityImageData = await getImageBase64(
        data.slide2.cityImage,
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop'
      );
      
      if (cityImageData) {
        slide2.addImage({
          data: cityImageData,
          x: 5.5, y: 0, w: 4.5, h: 7.5,
          sizing: { type: 'cover', w: 4.5, h: 7.5 },
        });
        // White fade from left
        slide2.addShape(pptx.ShapeType.rect, {
          x: 5.5, y: 0, w: 1.5, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 40 },
          line: { type: 'none' }
        });
      } else {
        slide2.addShape(pptx.ShapeType.rect, {
          x: 5.5, y: 0, w: 4.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide2.addText('02', {
        x: 0.5, y: 0.4, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide2.addText(data.slide2.cityName || 'AHMEDABAD', {
        x: 1.15, y: 0.35, w: 4, h: 0.55, fontSize: 28, bold: true, color: '3d1a6e',
      });
      slide2.addText('AT A GLANCE', {
        x: 1.15, y: 0.9, w: 4, h: 0.45, fontSize: 24, bold: true, color: 'f97316',
      });
      slide2.addText('A Thriving City. A Growing Opportunity.', {
        x: 1.15, y: 1.35, w: 4, h: 0.3, fontSize: 10, color: '555555',
      });

      // Stats in grid (4 columns x 2 rows)
      const stats = [
        { value: data.slide2.population || '90.6 Lakh+', label: 'Population' },
        { value: data.slide2.gdp || '$135 Billion+', label: 'GDP' },
        { value: data.slide2.gdpGrowth || '6.7%+', label: 'GDP Growth' },
        { value: "World's 1st", label: data.slide2.worldFirst || 'Heritage City With BRTS', highlight: true },
        { value: data.slide2.metroKm || '40 KM+', label: 'Metro Network' },
        { value: data.slide2.brtsKm || '160 KM+', label: 'BRTS Network' },
        { value: data.slide2.dailyFlights || '130+', label: 'Daily Flights' },
        { value: 'Top 3', label: data.slide2.retailRank || 'Fastest Growing Retail Market', highlight: true },
      ];

      stats.forEach((stat, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const xPos = 0.4 + (col * 1.2);
        const yPos = 1.85 + (row * 1.25);
        
        const borderColor = stat.highlight ? '3d1a6e' : 'e5e7eb';
        const bgColor = stat.highlight ? 'f5f0ff' : 'FFFFFF';
        
        slide2.addShape(pptx.ShapeType.rect, {
          x: xPos, y: yPos, w: 1.1, h: 1.1,
          fill: { color: bgColor },
          line: { color: borderColor, width: 1 },
          rectRadius: 0.05,
        });
        slide2.addText(stat.value, {
          x: xPos + 0.08, y: yPos + 0.15, w: 0.95, h: 0.4,
          fontSize: 12, bold: true, color: '3d1a6e',
        });
        slide2.addText(stat.label, {
          x: xPos + 0.08, y: yPos + 0.6, w: 0.95, h: 0.4,
          fontSize: 7, color: '666666',
        });
      });

      // Infrastructure section
      const infraLines = (data.slide2.infrastructure || '').split('\n').filter(Boolean);
      if (infraLines.length > 0) {
        slide2.addText('UPCOMING INFRASTRUCTURE', {
          x: 0.4, y: 4.5, w: 5, h: 0.35, fontSize: 10, bold: true, color: '3d1a6e',
          letterSpacing: 1,
        });
        const half = Math.ceil(infraLines.length / 2);
        infraLines.forEach((line, i) => {
          const col = i < half ? 0 : 1;
          const row = i < half ? i : i - half;
          slide2.addText(`• ${line}`, {
            x: 0.4 + (col * 2.5), y: 4.95 + (row * 0.3), w: 2.4, h: 0.28,
            fontSize: 8, color: '374151',
          });
        });
      }

      // ==================== SLIDE 3: PREMIUM LOCATION ====================
      const slide3 = pptx.addSlide();
      slide3.background = { color: 'FFFFFF' };
      
      // Map image on right
      const mapImageData = await getImageBase64(
        data.slide3.mapImage,
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'
      );
      
      if (mapImageData) {
        slide3.addImage({
          data: mapImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        // White fade from left
        slide3.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide3.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide3.addText('03', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      const locationTitle = (data.slide3.locationTitle || 'PREMIUM LOCATION\nTHAT CONNECTS EVERYTHING').split('\n');
      slide3.addText(locationTitle[0] || 'PREMIUM LOCATION', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 24, bold: true, color: '3d1a6e',
      });
      if (locationTitle[1]) {
        slide3.addText(locationTitle[1], {
          x: 1.15, y: 1.45, w: 3.5, h: 0.5, fontSize: 22, bold: true, color: 'f97316',
        });
      }

      slide3.addText(data.slide3.address || 'Sindhu Bhavan Road,\nBodakdev, Ahmedabad', {
        x: 0.5, y: 2.2, w: 4, h: 0.6, fontSize: 12, color: '374151',
      });

      // Location points with orange icon boxes
      const points = [
        { title: data.slide3.point1Title || '2 Mins from SG Highway', desc: data.slide3.point1Desc || 'Excellent Connectivity' },
        { title: data.slide3.point2Title || 'Easy Access to SP Ring Road', desc: data.slide3.point2Desc || '' },
        { title: data.slide3.point3Title || 'Surrounded by Premium', desc: data.slide3.point3Desc || 'Residential & Commercial Developments' },
      ];

      points.forEach((point, i) => {
        const yPos = 3.1 + (i * 1.1);
        // Orange bordered icon box
        slide3.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        slide3.addText(point.title, {
          x: 0.95, y: yPos - 0.05, w: 3.5, h: 0.35, fontSize: 13, bold: true, color: '3d1a6e',
        });
        if (point.desc) {
          slide3.addText(point.desc, {
            x: 0.95, y: yPos + 0.3, w: 3.5, h: 0.3, fontSize: 10, color: '6b7280',
          });
        }
      });

      // Google Maps button
      slide3.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: 6.2, w: 2.2, h: 0.4,
        fill: { color: 'f97316' },
        line: { type: 'none' },
        rectRadius: 0.2,
      });
      slide3.addText('📍 VIEW ON GOOGLE MAPS', {
        x: 0.5, y: 6.2, w: 2.2, h: 0.4, fontSize: 8, bold: true,
        color: 'FFFFFF', align: 'center', valign: 'middle',
        hyperlink: { url: data.slide3.mapsUrl || 'https://maps.google.com' },
      });

      // ==================== SLIDE 4: PROJECT SHOWCASE ====================
      const slide4 = pptx.addSlide();
      slide4.background = { color: 'FFFFFF' };
      
      // Project image on right
      const projectImageData = await getImageBase64(
        data.slide4.projectImage,
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
      );
      
      if (projectImageData) {
        slide4.addImage({
          data: projectImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        slide4.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide4.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide4.addText('04', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide4.addText('PROJECT', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide4.addText('SHOWCASE', {
        x: 1.15, y: 1.45, w: 3.5, h: 0.55, fontSize: 30, bold: true, color: 'f97316',
      });

      const features = [
        { title: data.slide4.feature1Title || 'Premium Corner Plot', desc: data.slide4.feature1Desc || 'with Wide Frontage' },
        { title: data.slide4.feature2Title || 'Modern Retail Architecture', desc: data.slide4.feature2Desc || 'with Maximum Visibility' },
        { title: data.slide4.feature3Title || 'Designed for Premium Brands', desc: data.slide4.feature3Desc || '& High Footfall' },
        { title: data.slide4.possessionLabel || 'Possession', desc: data.slide4.possessionDate || 'March 2027' },
      ];

      features.forEach((feature, i) => {
        const yPos = 2.4 + (i * 1.1);
        // Orange bordered icon box
        slide4.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        slide4.addText(feature.title, {
          x: 0.95, y: yPos - 0.05, w: 3.5, h: 0.35, fontSize: 13, bold: true, color: '3d1a6e',
        });
        slide4.addText(feature.desc, {
          x: 0.95, y: yPos + 0.3, w: 3.5, h: 0.3, fontSize: 10, color: '6b7280',
        });
      });

      // Possession badge on image
      slide4.addShape(pptx.ShapeType.rect, {
        x: 7.5, y: 5.8, w: 2, h: 0.9,
        fill: { color: '3d1a6e' },
        line: { type: 'none' },
        rectRadius: 0.08,
      });
      slide4.addText('EXPECTED POSSESSION', {
        x: 7.5, y: 5.85, w: 2, h: 0.3, fontSize: 7, color: 'FFFFFF', align: 'center',
        letterSpacing: 1,
      });
      slide4.addText((data.slide4.possessionDate || 'MARCH 2027').toUpperCase(), {
        x: 7.5, y: 6.15, w: 2, h: 0.45, fontSize: 15, bold: true, color: 'FFFFFF', align: 'center',
      });

      // ==================== SLIDE 5: CONSTRUCTION PROGRESS ====================
      const slide5 = pptx.addSlide();
      slide5.background = { color: 'FFFFFF' };
      
      // Construction image on right
      const constructionImageData = await getImageBase64(
        data.slide5.constructionImage,
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'
      );
      
      if (constructionImageData) {
        slide5.addImage({
          data: constructionImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        slide5.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide5.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide5.addText('05', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide5.addText('CONSTRUCTION', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide5.addText('PROGRESS', {
        x: 1.15, y: 1.45, w: 3.5, h: 0.55, fontSize: 30, bold: true, color: 'f97316',
      });

      const progressItems = [
        { title: data.slide5.progress1Title || 'Foundation', status: data.slide5.progress1Status || 'Completed' },
        { title: data.slide5.progress2Title || 'Structure', status: data.slide5.progress2Status || 'In Progress' },
        { title: data.slide5.progress3Title || 'Finishing', status: data.slide5.progress3Status || 'Ahead' },
        { title: data.slide5.progress4Title || 'Possession', status: data.slide5.progress4Status || 'March 2027' },
      ];

      progressItems.forEach((item, i) => {
        const yPos = 2.4 + (i * 1.1);
        // Orange circle icon
        slide5.addShape(pptx.ShapeType.ellipse, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
        });
        slide5.addText(item.title, {
          x: 0.95, y: yPos - 0.05, w: 3.5, h: 0.35, fontSize: 13, bold: true, color: '3d1a6e',
        });
        slide5.addText(item.status, {
          x: 0.95, y: yPos + 0.3, w: 3.5, h: 0.3, fontSize: 10, color: '6b7280',
        });
      });

      // Current status badge on image
      slide5.addShape(pptx.ShapeType.rect, {
        x: 7.5, y: 5.8, w: 2, h: 0.9,
        fill: { color: '3d1a6e' },
        line: { type: 'none' },
        rectRadius: 0.08,
      });
      slide5.addText('CURRENT STATUS', {
        x: 7.5, y: 5.85, w: 2, h: 0.3, fontSize: 7, color: 'FFFFFF', align: 'center',
        letterSpacing: 1,
      });
      slide5.addText((data.slide5.currentStatus || 'JUNE 2026').toUpperCase(), {
        x: 7.5, y: 6.15, w: 2, h: 0.45, fontSize: 15, bold: true, color: 'FFFFFF', align: 'center',
      });

      // ==================== SLIDE 6: GROUND FLOOR PLAN ====================
      const slide6 = pptx.addSlide();
      slide6.background = { color: 'FFFFFF' };
      
      // Plan image on right
      const planImageData = await getImageBase64(
        data.slide6.planImage,
        'https://images.unsplash.com/photo-1598928506311-c55dd1b4eb64?q=80&w=800&auto=format&fit=crop'
      );
      
      if (planImageData) {
        slide6.addImage({
          data: planImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        slide6.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide6.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide6.addText(data.slide6.slideNumber || '06', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide6.addText(data.slide6.title || 'GROUND FLOOR PLAN', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide6.addText(data.slide6.subtitle || 'RETAIL SPACES', {
        x: 1.15, y: 1.45, w: 3.5, h: 0.55, fontSize: 30, bold: true, color: 'f97316',
      });

      const floorPlanFeatures = [
        { label: data.slide6.floorHeightLabel || 'Floor Height', val: data.slide6.floorHeightValue || '12\'5"', icon: '📏' },
        { label: data.slide6.frontageLabel || 'Frontage', val: data.slide6.frontageValue || '20\' to 35\'', icon: '↔️' },
        { label: data.slide6.parkingLabel || 'Parking', val: data.slide6.parkingValue || 'Ample Two Wheeler\n& Four Wheeler', icon: '🚗' },
        { label: data.slide6.roadAccessLabel || 'Road Access', val: data.slide6.roadAccessValue || '30 MT Wide Road', icon: '🛣️' },
      ];

      floorPlanFeatures.forEach((feat, i) => {
        const yPos = 2.4 + (i * 1.1);
        // Orange bordered icon box
        slide6.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        // Icon emoji inside the box
        slide6.addText(feat.icon, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35, fontSize: 12,
          align: 'center', valign: 'middle',
        });
        slide6.addText(feat.label, {
          x: 0.95, y: yPos - 0.05, w: 3.5, h: 0.25, fontSize: 10, color: '6b7280',
        });
        slide6.addText(feat.val, {
          x: 0.95, y: yPos + 0.2, w: 3.5, h: 0.4, fontSize: 13, bold: true, color: '3d1a6e',
        });
      });

      // ==================== SLIDE 7: SECOND FLOOR PLAN ====================
      const slide7 = pptx.addSlide();
      slide7.background = { color: 'FFFFFF' };
      
      // Plan image on right
      const plan7ImageData = await getImageBase64(
        data.slide7.planImage,
        'https://images.unsplash.com/photo-1598928506311-c55dd1b4eb64?q=80&w=800&auto=format&fit=crop'
      );
      
      if (plan7ImageData) {
        slide7.addImage({
          data: plan7ImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        slide7.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide7.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide7.addText(data.slide7.slideNumber || '07', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide7.addText(data.slide7.title || 'SECOND FLOOR PLAN', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide7.addText(data.slide7.subtitle || 'RETAIL SPACES', {
        x: 1.15, y: 1.45, w: 3.5, h: 0.55, fontSize: 30, bold: true, color: 'f97316',
      });

      const floorPlan7Features = [
        { label: data.slide7.floorHeightLabel || 'Floor Height', val: data.slide7.floorHeightValue || '9\'5"', icon: '📏' },
        { label: data.slide7.bestForLabel || 'Best for', val: data.slide7.bestForValue || 'F&B / Lifestyle / Offices', icon: '💼' },
        { label: data.slide7.terraceLabel || 'Open Terrace', val: data.slide7.terraceValue || 'Provision', icon: '☀️' },
        { label: data.slide7.liftStaircaseLabel || 'Lift & Staircase', val: data.slide7.liftStaircaseValue || 'Access', icon: '🏢' },
      ];

      floorPlan7Features.forEach((feat, i) => {
        const yPos = 2.4 + (i * 1.1);
        // Orange bordered icon box
        slide7.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        // Icon emoji inside the box
        slide7.addText(feat.icon, {
          x: 0.5, y: yPos, w: 0.35, h: 0.35, fontSize: 12,
          align: 'center', valign: 'middle',
        });
        slide7.addText(feat.label, {
          x: 0.95, y: yPos - 0.05, w: 3.5, h: 0.25, fontSize: 10, color: '6b7280',
        });
        slide7.addText(feat.val, {
          x: 0.95, y: yPos + 0.2, w: 3.5, h: 0.4, fontSize: 13, bold: true, color: '3d1a6e',
        });
      });

      // ==================== SLIDE 8: BRAND LOCATION MAP ====================
      const slide8 = pptx.addSlide();
      slide8.background = { color: 'FFFFFF' };
      
      // Map image on right
      const map8ImageData = await getImageBase64(
        data.slide8.mapImage,
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'
      );
      
      if (map8ImageData) {
        slide8.addImage({
          data: map8ImageData,
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          sizing: { type: 'cover', w: 5.5, h: 7.5 },
        });
        slide8.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 1.8, h: 7.5,
          fill: { color: 'FFFFFF', transparency: 30 },
          line: { type: 'none' }
        });
      } else {
        slide8.addShape(pptx.ShapeType.rect, {
          x: 4.5, y: 0, w: 5.5, h: 7.5,
          fill: { color: 'e5e7eb' },
          line: { type: 'none' }
        });
      }

      // Header
      slide8.addText(data.slide8.slideNumber || '08', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide8.addText(data.slide8.title || 'BRAND LOCATION MAP', {
        x: 1.15, y: 0.9, w: 3.5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide8.addText(data.slide8.subtitle || 'BE IN THE COMPANY OF THE BEST', {
        x: 1.15, y: 1.45, w: 3.5, h: 0.55, fontSize: 24, bold: true, color: 'f97316',
      });

      const brandLines = (data.slide8.brandList || '').split('\n').filter(Boolean);
      const legendColors = ['ec4899', 'eab308', 'ef4444', '22c55e', '3b82f6', 'a855f7'];

      brandLines.forEach((line, i) => {
        const yPos = 2.4 + (i * 0.7);
        // Colored circle shape
        slide8.addShape(pptx.ShapeType.ellipse, {
          x: 0.5, y: yPos, w: 0.15, h: 0.15,
          fill: { color: legendColors[i % legendColors.length] },
          line: { type: 'none' },
        });
        slide8.addText(line.toUpperCase(), {
          x: 0.8, y: yPos - 0.05, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: '374151',
        });
      });

      // ==================== SLIDE 9: LIFESTYLE AROUND YOU ====================
      const slide9 = pptx.addSlide();
      slide9.background = { color: 'FFFFFF' };
      
      // Header
      slide9.addText(data.slide9.slideNumber || '09', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide9.addText(data.slide9.title || 'LIFESTYLE AROUND YOU', {
        x: 1.15, y: 0.9, w: 5, h: 0.6, fontSize: 30, bold: true, color: '3d1a6e',
      });
      slide9.addText(data.slide9.subtitle || 'EVERYTHING NEARBY', {
        x: 1.15, y: 1.45, w: 5, h: 0.55, fontSize: 24, bold: true, color: 'f97316',
      });

      const lifestyleCards = [
        { label: data.slide9.label1 || 'FINE DINING', file: data.slide9.img1, defaultUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop' },
        { label: data.slide9.label2 || 'SHOPPING', file: data.slide9.img2, defaultUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop' },
        { label: data.slide9.label3 || 'FITNESS', file: data.slide9.img3, defaultUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop' },
        { label: data.slide9.label4 || 'ENTERTAINMENT', file: data.slide9.img4, defaultUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop' },
        { label: data.slide9.label5 || 'RESIDENTIAL CATCHMENT', file: data.slide9.img5, defaultUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop' },
      ];

      const cardW = 1.7;
      const cardGap = 0.15;
      const startX = (10 - (5 * cardW + 4 * cardGap)) / 2;

      for (let i = 0; i < 5; i++) {
        const item = lifestyleCards[i];
        const xPos = startX + i * (cardW + cardGap);
        const yPos = 2.6;

        const cardImgData = await getImageBase64(item.file, item.defaultUrl);

        if (cardImgData) {
          slide9.addImage({
            data: cardImgData,
            x: xPos, y: yPos, w: cardW, h: 2.8,
            sizing: { type: 'cover', w: cardW, h: 2.8 }
          });
        } else {
          slide9.addShape(pptx.ShapeType.rect, {
            x: xPos, y: yPos, w: cardW, h: 2.8,
            fill: { color: 'e5e7eb' },
            line: { type: 'none' }
          });
        }

        // Label box underneath
        slide9.addShape(pptx.ShapeType.rect, {
          x: xPos, y: yPos + 2.8, w: cardW, h: 0.7,
          fill: { color: '3d1a6e' },
          line: { type: 'none' }
        });
        slide9.addText(item.label.toUpperCase(), {
          x: xPos, y: yPos + 2.8, w: cardW, h: 0.7,
          fontSize: 8, bold: true, color: 'FFFFFF',
          align: 'center', valign: 'middle',
        });
      }

      // ==================== SLIDE 10: PROPERTY SPECIFICATIONS ====================
      const slide10 = pptx.addSlide();
      slide10.background = { color: 'FFFFFF' };
      
      // Header
      slide10.addText(data.slide10.slideNumber || '10', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide10.addText(data.slide10.title || 'PROPERTY SPECIFICATIONS', {
        x: 1.15, y: 0.9, w: 5, h: 1.1, fontSize: 30, bold: true, color: '3d1a6e',
      });

      const col1Data = [
        { label: data.slide10.spec1Label || 'Project Type', val: data.slide10.spec1Value || 'Commercial', icon: '🏢' },
        { label: data.slide10.spec2Label || 'Location', val: data.slide10.spec2Value || 'Sindhu Bhavan Road,\nBodakdev, Ahmedabad', icon: '📍' },
        { label: data.slide10.spec3Label || 'Jewellery Brands', val: data.slide10.spec3Value || 'Tanishq, Malabar,\nPC Jeweller & More', icon: '💎' },
        { label: data.slide10.spec4Label || 'Apparel Brands', val: data.slide10.spec4Value || 'Zara, H&M, Trends,\nLifestyle & More', icon: '👕' },
        { label: data.slide10.spec5Label || 'F&B Outlets', val: data.slide10.spec5Value || "McDonald's, Starbucks,\nThe White Crow & More", icon: '🍽️' },
      ];

      const col2Data = [
        { label: data.slide10.spec6Label || 'Ground Floor Height', val: data.slide10.spec6Value || "12'5\"", icon: '↕️' },
        { label: data.slide10.spec7Label || 'First Floor Height', val: data.slide10.spec7Value || "10'5\"", icon: '↕️' },
        { label: data.slide10.spec8Label || 'Second Floor Height', val: data.slide10.spec8Value || "9'5\"", icon: '↕️' },
        { label: data.slide10.spec9Label || 'Possession', val: data.slide10.spec9Value || 'March 2027', icon: '📅' },
        { label: data.slide10.spec10Label || 'Google Maps', val: data.slide10.spec10Value || 'Scan QR Code', icon: '🔍' },
      ];

      // Render Col 1
      col1Data.forEach((item, i) => {
        const yPos = 2.4 + (i * 0.95);
        // Orange bordered icon box
        slide10.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: yPos, w: 0.3, h: 0.3,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        slide10.addText(item.icon, {
          x: 0.5, y: yPos, w: 0.3, h: 0.3, fontSize: 10,
          align: 'center', valign: 'middle',
        });
        slide10.addText(item.label, {
          x: 0.9, y: yPos - 0.05, w: 2.8, h: 0.2, fontSize: 8, color: '6b7280',
        });
        slide10.addText(item.val, {
          x: 0.9, y: yPos + 0.15, w: 2.8, h: 0.4, fontSize: 10, bold: true, color: '3d1a6e',
        });
      });

      // Render Col 2
      col2Data.forEach((item, i) => {
        const yPos = 2.4 + (i * 0.95);
        // Orange bordered icon box
        slide10.addShape(pptx.ShapeType.rect, {
          x: 4.0, y: yPos, w: 0.3, h: 0.3,
          fill: { color: 'FFFFFF' },
          line: { color: 'f97316', width: 1.5 },
          rectRadius: 0.05,
        });
        slide10.addText(item.icon, {
          x: 4.0, y: yPos, w: 0.3, h: 0.3, fontSize: 10,
          align: 'center', valign: 'middle',
        });
        slide10.addText(item.label, {
          x: 4.4, y: yPos - 0.05, w: 2.8, h: 0.2, fontSize: 8, color: '6b7280',
        });
        slide10.addText(item.val, {
          x: 4.4, y: yPos + 0.15, w: 2.8, h: 0.4, fontSize: 10, bold: true, color: '3d1a6e',
        });
      });

      // Render QR Code
      const qrImageData = await getImageBase64(
        data.slide10.qrImage,
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(data.slide10.qrUrl || 'https://maps.google.com')}`
      );

      if (qrImageData) {
        slide10.addImage({
          data: qrImageData,
          x: 7.5, y: 2.6, w: 2.0, h: 2.0,
        });
        // Draw a dashed border box around the QR code
        slide10.addShape(pptx.ShapeType.rect, {
          x: 7.4, y: 2.5, w: 2.2, h: 2.2,
          fill: { type: 'none' },
          line: { color: 'd1d5db', width: 1.5, dashType: 'dash' },
          rectRadius: 0.08,
        });
      }

      // ==================== SLIDE 11: WHY INVEST ====================
      const slide11 = pptx.addSlide();
      slide11.background = { color: 'FFFFFF' };

      // Header
      slide11.addText(data.slide11.slideNumber || '11', {
        x: 0.5, y: 1.0, w: 0.55, h: 0.5, fontSize: 14, bold: true,
        color: 'FFFFFF', fill: { color: '3d1a6e' },
        align: 'center', valign: 'middle',
      });

      slide11.addText(data.slide11.title || 'WHY INVEST IN MADHAV HIGHSTREET?', {
        x: 1.15, y: 0.9, w: 8, h: 1.1, fontSize: 30, bold: true, color: '3d1a6e',
      });

      const row1Cards = [
        { label: data.slide11.card1Label || 'Prime Location\nHigh Visibility', icon: '📍' },
        { label: data.slide11.card2Label || 'Surrounded by\nPremium Brands', icon: '🛍️' },
        { label: data.slide11.card3Label || 'High Footfall\nCatchment', icon: '👥' },
        { label: data.slide11.card4Label || 'Modern Architecture\n& Design', icon: '🏢' },
      ];

      const row2Cards = [
        { label: data.slide11.card5Label || 'Excellent\nConnectivity & Access', icon: '🛣️' },
        { label: data.slide11.card6Label || 'Strong Investment\n& Returns', icon: '📈' },
        { label: data.slide11.card7Label || 'Strong Investment\nPotential', icon: '📊' },
      ];

      // Draw Row 1
      row1Cards.forEach((item, i) => {
        const xPos = 0.5 + i * 2.3;
        const yPos = 2.4;
        slide11.addShape(pptx.ShapeType.rect, {
          x: xPos, y: yPos, w: 2.1, h: 1.6,
          fill: { color: 'f9fafb' },
          line: { color: 'e5e7eb', width: 1 },
          rectRadius: 0.08,
        });
        slide11.addShape(pptx.ShapeType.ellipse, {
          x: xPos + 0.85, y: yPos + 0.15, w: 0.4, h: 0.4,
          fill: { color: 'fff7ed' },
          line: { color: 'ffedd5', width: 1 },
        });
        slide11.addText(item.icon, {
          x: xPos + 0.85, y: yPos + 0.15, w: 0.4, h: 0.4, fontSize: 11,
          align: 'center', valign: 'middle',
        });
        slide11.addText(item.label.toUpperCase(), {
          x: xPos + 0.1, y: yPos + 0.65, w: 1.9, h: 0.8,
          fontSize: 8, bold: true, color: '3d1a6e',
          align: 'center', valign: 'middle',
        });
      });

      // Draw Row 2
      row2Cards.forEach((item, i) => {
        const xPos = 1.65 + i * 2.3;
        const yPos = 4.3;
        slide11.addShape(pptx.ShapeType.rect, {
          x: xPos, y: yPos, w: 2.1, h: 1.6,
          fill: { color: 'f9fafb' },
          line: { color: 'e5e7eb', width: 1 },
          rectRadius: 0.08,
        });
        slide11.addShape(pptx.ShapeType.ellipse, {
          x: xPos + 0.85, y: yPos + 0.15, w: 0.4, h: 0.4,
          fill: { color: 'fff7ed' },
          line: { color: 'ffedd5', width: 1 },
        });
        slide11.addText(item.icon, {
          x: xPos + 0.85, y: yPos + 0.15, w: 0.4, h: 0.4, fontSize: 11,
          align: 'center', valign: 'middle',
        });
        slide11.addText(item.label.toUpperCase(), {
          x: xPos + 0.1, y: yPos + 0.65, w: 1.9, h: 0.8,
          fontSize: 8, bold: true, color: '3d1a6e',
          align: 'center', valign: 'middle',
        });
      });

      // ==================== SLIDE 12: THANK YOU ====================
      const slide12 = pptx.addSlide();
      slide12.background = { color: '1f2937' };
      
      // Decorative accent line
      slide12.addShape(pptx.ShapeType.rect, {
        x: 4, y: 2.5, w: 2, h: 0.05,
        fill: { color: 'f97316' },
        line: { type: 'none' }
      });

      slide12.addText('Thank You!', {
        x: 1, y: 2.8, w: 8, h: 1.2, fontSize: 48, bold: true,
        color: 'FFFFFF', align: 'center', fontFace: 'Arial',
      });
      slide12.addText(data.slide1.companyName || 'AESTHETIC ARC', {
        x: 1, y: 4.0, w: 8, h: 0.5, fontSize: 18, bold: true,
        color: 'f97316', align: 'center', fontFace: 'Arial',
      });
      slide12.addText(data.slide1.companyTagline || 'PROPERTY LEASING COMPANY', {
        x: 1, y: 4.5, w: 8, h: 0.4, fontSize: 12,
        color: 'FFFFFF', align: 'center', fontFace: 'Arial',
      });

      // Save the presentation
      await pptx.writeFile({ fileName: 'presentation.pptx' });
      alert('Presentation downloaded successfully!');
    } catch (error) {
      console.error('Error generating PPT:', error);
      alert('Failed to generate presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f4' }}>
      {/* ── HEADER ── */}
      <div style={{ borderBottom: '2px solid #d1fae5', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#14532d,#166534)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff', boxShadow: '0 4px 12px rgba(20,83,45,0.4)' }}>P</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#14532d' }}>PPT Generator</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Real Estate Presentation Builder</div>
          </div>
        </div>
        <button
          onClick={() => setShowAllSlides(v => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: showAllSlides ? '#14532d' : '#fff', border: '2px solid #14532d', borderRadius: 9, color: showAllSlides ? '#fff' : '#14532d', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <Eye size={15} /> {showAllSlides ? 'Back to Edit' : 'Preview All Slides'}
        </button>
      </div>

      {showAllSlides ? (
        /* ── ALL SLIDES VIEW ── */
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#14532d', marginBottom: 32, textAlign: 'center' }}>All {SLIDE_PREVIEWS.length} Slides Preview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SLIDE_PREVIEWS.map((SlideComp, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#14532d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' }}>{i + 1}</div>
                  <span style={{ fontWeight: 700, color: '#14532d', fontSize: 15 }}>{STEPS[i].title}</span>
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
          <div style={{ padding: '28px 14px', background: '#14532d', borderRight: '3px solid #166534' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20, paddingLeft: 8 }}>Form Steps</div>
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', borderRadius: 10, marginBottom: 6,
                    background: isActive ? 'rgba(255,255,255,0.18)' : isDone ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: isActive ? '2px solid #86efac' : isDone ? '2px solid rgba(255,255,255,0.15)' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? '#fff' : isDone ? '#4ade80' : 'rgba(255,255,255,0.15)',
                    border: `2px solid ${isActive ? '#86efac' : isDone ? '#4ade80' : 'rgba(255,255,255,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 13, color: isActive ? '#14532d' : '#fff',
                  }}>
                    {isDone ? '✓' : s.num}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: isActive ? '#fff' : isDone ? '#bbf7d0' : 'rgba(255,255,255,0.7)' }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: isActive ? '#86efac' : 'rgba(255,255,255,0.4)' }}>{s.subtitle}</div>
                  </div>
                </button>
              );
            })}

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '20px 8px' }} />

            {/* Download button */}
            <div style={{ padding: '0 4px' }}>
              <button
                onClick={handleDownloadPPT}
                disabled={isGenerating}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: '#fff', border: '2px solid #86efac', borderRadius: 10, color: '#14532d', fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', transition: 'all 0.2s', opacity: isGenerating ? 0.6 : 1 }}
              >
                <Download size={17} /> {isGenerating ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
          </div>

          {/* ── RIGHT: Form + Preview (White) ── */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'auto', background: '#fff' }}>
            {/* Step header */}
            <div style={{ padding: '22px 32px', borderBottom: '2px solid #d1fae5', background: '#f0fdf4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#14532d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#fff', boxShadow: '0 4px 12px rgba(20,83,45,0.3)' }}>{step + 1}</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#14532d', lineHeight: 1 }}>{STEPS[step].title}</h2>
                  <p style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>{STEPS[step].subtitle}</p>
                </div>
                {/* Step progress dots */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 7, alignItems: 'center' }}>
                  {STEPS.map((_, i) => (
                    <div key={i} onClick={() => setStep(i)} style={{ width: i === step ? 28 : 9, height: 9, borderRadius: 5, background: i === step ? '#14532d' : i < step ? '#4ade80' : '#d1fae5', cursor: 'pointer', transition: 'all 0.3s' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Form + preview split */}
            <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', overflow: 'hidden' }}>
              {/* Form panel */}
              <div style={{ overflowY: 'auto', padding: '26px 30px', borderRight: '2px solid #d1fae5', background: '#fff' }}>
                <CurrentForm />

                {/* Next / Prev */}
                <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '2px solid #d1fae5' }}>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#fff', border: '2px solid #14532d', borderRadius: 9, color: '#14532d', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                      <ChevronLeft size={16} /> Previous
                    </button>
                  )}
                  {step < STEPS.length - 1 && (
                    <button onClick={() => setStep(s => s + 1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#14532d', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(20,83,45,0.4)' }}>
                      Next <ChevronRight size={16} />
                    </button>
                  )}
                  {step === STEPS.length - 1 && (
                    <button onClick={() => setShowAllSlides(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', background: '#14532d', border: 'none', borderRadius: 9, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(20,83,45,0.4)' }}>
                      <Eye size={16} /> Preview All
                    </button>
                  )}
                </div>
              </div>

              {/* Live preview panel */}
              <div style={{ overflowY: 'auto', padding: '26px', background: '#f0fdf4', display: 'flex', flexDirection: 'column', gap: 14, borderLeft: '2px solid #d1fae5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#14532d', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#14532d', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Preview — Slide {step + 1}</span>
                </div>
                <CurrentPreview />
                <p style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>✏️ Changes reflect instantly as you type</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
