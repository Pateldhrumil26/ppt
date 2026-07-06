import { useFormData } from '../context/FormContext';
import {
  Shirt,
  ShoppingBag,
  Leaf,
  Utensils,
  MonitorSmartphone,
  ShoppingCart,
  Building2,
  HeartPulse,
  Ticket,
  Gamepad2,
  Users,
  DollarSign,
  TrendingUp,
  Landmark,
  Train,
  Bus,
  Plane,
  ShoppingBasket,
  MapPin,
  Route,
  CheckCircle2,
  Loader2,
  Clock,
  Calendar,
  Diamond,
} from 'lucide-react';

// ─── Slide 1: Cover / Hero ───────────────────────────────────────────────────
const Slide1Cover = ({ formData }: { formData: any }) => {
  const categories = [
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

  const theme = formData.presentation.themeColor || '#3d1a6e';
  const fontColor = formData.presentation.fontColor || '#FFFFFF';
  const fontFamily = formData.presentation.fontFamily || 'Arial';

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{ aspectRatio: '16/9', fontFamily, background: '#1a0a2e' }}
    >
      {/* Right side: building photo */}
      <div className="absolute inset-0">
        {formData.imagesDocuments.backgroundImage ? (
          <img
            src={URL.createObjectURL(formData.imagesDocuments.backgroundImage)}
            alt="Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay: dark left half, transparent right */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${theme}f2 0%, ${theme}cc 38%, ${theme}55 60%, transparent 100%)`,
          }}
        />
      </div>

      {/* Left content panel */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-[4%]"
        style={{ color: fontColor }}
      >
        {/* Top */}
        <div style={{ maxWidth: '48%' }}>
          {/* Slide badge */}
          <div
            className="inline-flex items-center justify-center rounded mb-4"
            style={{
              backgroundColor: theme,
              padding: '4px 12px',
              border: `2px solid ${fontColor}33`,
            }}
          >
            <span className="font-bold" style={{ fontSize: 'clamp(10px,1.6vw,18px)' }}>
              {formData.presentation.slideNumber || '01'}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-extrabold leading-none mb-3"
            style={{ fontSize: 'clamp(18px,4.5vw,52px)', letterSpacing: '-0.02em' }}
          >
            {formData.presentation.title || 'MADHAV\nHIGHSTREET'}
          </h1>

          {/* Subtitle */}
          <p
            className="font-semibold uppercase tracking-wide mb-3"
            style={{ fontSize: 'clamp(8px,1.5vw,16px)', opacity: 0.85 }}
          >
            {formData.presentation.subtitle || 'THE NEXT PREMIUM RETAIL DESTINATION'}
          </p>

          {/* Address */}
          <p style={{ fontSize: 'clamp(7px,1.1vw,13px)', opacity: 0.75, marginBottom: '3%' }}>
            {formData.presentation.address || 'SINDHU BHAVAN ROAD,\nBODAKDEV, AHMEDABAD'}
          </p>

          {/* Divider */}
          <div style={{ width: '15%', height: 2, backgroundColor: fontColor, marginBottom: '3%', opacity: 0.7 }} />

          {/* Presented by */}
          <p style={{ fontSize: 'clamp(6px,0.9vw,11px)', opacity: 0.6, marginBottom: '1%' }}>
            Presented by
          </p>
          <div className="flex items-center gap-2">
            {formData.imagesDocuments.logo ? (
              <img
                src={URL.createObjectURL(formData.imagesDocuments.logo)}
                alt="Logo"
                style={{ width: 'clamp(20px,3vw,36px)', height: 'clamp(20px,3vw,36px)', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: 'clamp(20px,3vw,36px)',
                  height: 'clamp(20px,3vw,36px)',
                  borderRadius: '4px',
                  background: '#ff6b00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(8px,1.2vw,14px)' }}>A</span>
              </div>
            )}
            <div>
              <div className="font-bold" style={{ fontSize: 'clamp(8px,1.4vw,17px)' }}>
                {formData.presentation.companyName || formData.company?.companyName || 'AESTHETIC ARC'}
              </div>
              <div style={{ fontSize: 'clamp(5px,0.85vw,10px)', opacity: 0.6 }}>
                {formData.presentation.companyTagline || formData.company?.industry || 'PROPERTY LEASING COMPANY'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Category grid (2 rows × 5) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: 'clamp(2px,0.5vw,6px)',
          }}
        >
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
                style={{
                  background: `${fontColor}18`,
                  border: `1px solid ${fontColor}30`,
                  borderRadius: 6,
                  padding: 'clamp(4px,1vw,10px) clamp(2px,0.4vw,4px)',
                  gap: 'clamp(2px,0.4vw,5px)',
                }}
              >
                <Icon size="clamp(10px,2vw,22px)" strokeWidth={1.5} style={{ color: fontColor }} />
                <span
                  className="text-center font-semibold leading-tight"
                  style={{ fontSize: 'clamp(4px,0.7vw,8px)', color: fontColor }}
                >
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Slide 2: City At A Glance ───────────────────────────────────────────────
const Slide2CityGlance = ({ formData }: { formData: any }) => {
  const accentColor = '#f97316'; // orange
  const headingColor = '#3d1a6e'; // dark purple
  const fontFamily = formData.presentation.fontFamily || 'Arial';

  const stats = [
    { icon: Users, value: '90.6 Lakh+', label: 'Population' },
    { icon: DollarSign, value: '$135 Billion+', label: 'GDP' },
    { icon: TrendingUp, value: '6.7%+', label: 'GDP Growth' },
    { icon: Landmark, value: "World's 1st", label: 'Heritage City With BRTS', highlight: true },
    { icon: Train, value: '40 KM+', label: 'Metro Network' },
    { icon: Bus, value: '160 KM+', label: 'BRTS Network' },
    { icon: Plane, value: '130+', label: 'Daily Flights (Domestic & Int\'l)' },
    { icon: ShoppingBasket, value: 'Top 3', label: 'Fastest Growing Retail Market', highlight: true },
  ];

  const infra = [
    ['Bullet Train Project', 'Evolving IT & Business Hubs'],
    ['Dedicated Freight Corridor', 'Expanded Metro Network'],
    ['Ahmedabad-Dholera Expressway', 'International Convention Centre'],
    ['Sardar Patel Ring Road', ''],
  ];

  const cityImage = formData.imagesDocuments.images[0]
    ? URL.createObjectURL(formData.imagesDocuments.images[0])
    : 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop';

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white"
      style={{ aspectRatio: '16/9', fontFamily }}
    >
      {/* Right image */}
      <div className="absolute right-0 top-0 bottom-0" style={{ width: '45%' }}>
        <img src={cityImage} alt="City" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, transparent 40%, white 100%)' }}
        />
      </div>

      {/* Left content */}
      <div className="absolute inset-0 flex flex-col justify-start p-[4%] pr-[50%]">
        {/* Slide number + heading */}
        <div className="flex items-start gap-3 mb-[3%]">
          <div
            style={{
              background: headingColor,
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(8px,1.3vw,15px)',
              padding: '3px 8px',
              borderRadius: 4,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            02
          </div>
          <div>
            <h2
              className="font-extrabold leading-none"
              style={{ color: headingColor, fontSize: 'clamp(14px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              {formData.project?.city || 'AHMEDABAD'}
            </h2>
            <h2
              className="font-extrabold"
              style={{ color: accentColor, fontSize: 'clamp(14px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              AT A GLANCE
            </h2>
            <p style={{ color: '#555', fontSize: 'clamp(6px,1vw,12px)', marginTop: 2 }}>
              A Thriving City. A Growing Opportunity.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(3px,0.6vw,7px)',
            marginBottom: '3%',
          }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                style={{
                  border: `1px solid ${s.highlight ? headingColor : '#e5e7eb'}`,
                  borderRadius: 6,
                  padding: 'clamp(4px,0.8vw,9px)',
                  background: s.highlight ? `${headingColor}08` : '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Icon
                  size="clamp(8px,1.4vw,16px)"
                  style={{ color: headingColor, opacity: 0.7 }}
                  strokeWidth={1.5}
                />
                <div
                  className="font-extrabold"
                  style={{ color: headingColor, fontSize: 'clamp(8px,1.4vw,16px)', lineHeight: 1.2 }}
                >
                  {s.value}
                </div>
                <div style={{ color: '#666', fontSize: 'clamp(5px,0.75vw,9px)', lineHeight: 1.3 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Infrastructure */}
        <div>
          <p
            className="font-bold uppercase tracking-wide mb-2"
            style={{ color: headingColor, fontSize: 'clamp(6px,0.95vw,11px)' }}
          >
            UPCOMING INFRASTRUCTURE
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px 16px' }}>
            {infra.map((row, ri) =>
              row.map((item, ci) =>
                item ? (
                  <div
                    key={`${ri}-${ci}`}
                    style={{
                      fontSize: 'clamp(5px,0.8vw,9px)',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ color: headingColor, fontWeight: 700 }}>•</span>
                    {item}
                  </div>
                ) : null
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Slide 3: Premium Location ────────────────────────────────────────────────
const Slide3Location = ({ formData }: { formData: any }) => {
  const accentColor = '#f97316';
  const headingColor = '#3d1a6e';
  const fontFamily = formData.presentation.fontFamily || 'Arial';

  const locationPoints = [
    { icon: MapPin, title: '2 Mins from SG Highway', desc: 'Excellent Connectivity' },
    { icon: Route, title: 'Easy Access to', desc: 'SP Ring Road' },
    { icon: Building2, title: 'Surrounded by Premium', desc: 'Residential & Commercial Developments' },
  ];

  const mapImage = formData.imagesDocuments.images[1]
    ? URL.createObjectURL(formData.imagesDocuments.images[1])
    : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop';

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white"
      style={{ aspectRatio: '16/9', fontFamily }}
    >
      {/* Right: Map image */}
      <div className="absolute right-0 top-0 bottom-0" style={{ width: '55%' }}>
        <img src={mapImage} alt="Map" className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, transparent 35%, white 100%)' }}
        />
      </div>

      {/* Left content */}
      <div className="absolute inset-0 flex flex-col justify-center p-[5%] pr-[52%]">
        <div className="flex items-start gap-3 mb-[3%]">
          <div
            style={{
              background: headingColor,
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(8px,1.3vw,15px)',
              padding: '3px 8px',
              borderRadius: 4,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            03
          </div>
          <div>
            <h2
              className="font-extrabold leading-none"
              style={{ color: headingColor, fontSize: 'clamp(13px,2.5vw,28px)', lineHeight: 1.1 }}
            >
              PREMIUM LOCATION
            </h2>
            <h2
              className="font-extrabold"
              style={{ color: accentColor, fontSize: 'clamp(13px,2.5vw,28px)', lineHeight: 1.1 }}
            >
              THAT CONNECTS EVERYTHING
            </h2>
          </div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: '4%' }}>
          <p style={{ color: '#374151', fontSize: 'clamp(7px,1.1vw,13px)', fontWeight: 500 }}>
            {formData.presentation.address || 'Sindhu Bhavan Road,\nBodakdev, Ahmedabad'}
          </p>
        </div>

        {/* Location points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1.2vw,14px)', marginBottom: '5%' }}>
          {locationPoints.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div
                  style={{
                    width: 'clamp(14px,2.2vw,26px)',
                    height: 'clamp(14px,2.2vw,26px)',
                    borderRadius: 6,
                    border: `1.5px solid ${accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size="clamp(7px,1.1vw,13px)" style={{ color: accentColor }} strokeWidth={2} />
                </div>
                <div>
                  <div
                    className="font-bold"
                    style={{ color: headingColor, fontSize: 'clamp(7px,1.15vw,13px)' }}
                  >
                    {pt.title}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 'clamp(5px,0.85vw,10px)' }}>
                    {pt.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Google Maps button */}
        <div>
          <button
            style={{
              background: accentColor,
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(6px,1vw,11px)',
              padding: 'clamp(5px,1vw,10px) clamp(10px,2vw,22px)',
              borderRadius: 30,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <MapPin size="clamp(8px,1.2vw,14px)" />
            VIEW ON GOOGLE MAPS
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Slide 4: Project Showcase ────────────────────────────────────────────────
const Slide4ProjectShowcase = ({ formData }: { formData: any }) => {
  const accentColor = '#f97316';
  const headingColor = '#3d1a6e';
  const fontFamily = formData.presentation.fontFamily || 'Arial';

  const features = [
    { icon: Building2, title: 'Premium Corner Plot', desc: 'with Wide Frontage' },
    { icon: Landmark, title: 'Modern Retail Architecture', desc: 'with Maximum Visibility' },
    { icon: Diamond, title: 'Designed for Premium Brands', desc: '& High Footfall' },
    { icon: Calendar, title: 'Possession', desc: formData.financial?.possession || 'March 2027' },
  ];

  const buildingImage = formData.imagesDocuments.images[2]
    ? URL.createObjectURL(formData.imagesDocuments.images[2])
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white"
      style={{ aspectRatio: '16/9', fontFamily }}
    >
      {/* Right: Building image */}
      <div className="absolute right-0 top-0 bottom-0" style={{ width: '55%' }}>
        <img src={buildingImage} alt="Project" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, transparent 40%, white 100%)' }}
        />
        {/* Expected possession badge */}
        <div
          className="absolute bottom-[6%] right-[4%]"
          style={{
            background: headingColor,
            color: '#fff',
            padding: 'clamp(6px,1vw,12px) clamp(10px,1.5vw,18px)',
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 'clamp(4px,0.7vw,8px)', letterSpacing: '0.12em', opacity: 0.7, marginBottom: 2 }}>
            EXPECTED POSSESSION
          </div>
          <div style={{ fontSize: 'clamp(9px,1.6vw,18px)', fontWeight: 900, letterSpacing: '0.05em' }}>
            {formData.financial?.possession?.toUpperCase() || 'MARCH 2027'}
          </div>
        </div>
      </div>

      {/* Left content */}
      <div className="absolute inset-0 flex flex-col justify-center p-[5%] pr-[52%]">
        <div className="flex items-start gap-3 mb-[5%]">
          <div
            style={{
              background: headingColor,
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(8px,1.3vw,15px)',
              padding: '3px 8px',
              borderRadius: 4,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            04
          </div>
          <div>
            <h2
              className="font-extrabold leading-none"
              style={{ color: headingColor, fontSize: 'clamp(13px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              PROJECT
            </h2>
            <h2
              className="font-extrabold"
              style={{ color: accentColor, fontSize: 'clamp(13px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              SHOWCASE
            </h2>
          </div>
        </div>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,18px)' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div
                  style={{
                    width: 'clamp(14px,2.2vw,26px)',
                    height: 'clamp(14px,2.2vw,26px)',
                    borderRadius: 6,
                    border: `1.5px solid ${accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size="clamp(7px,1.1vw,13px)" style={{ color: accentColor }} strokeWidth={2} />
                </div>
                <div>
                  <div
                    className="font-bold"
                    style={{ color: headingColor, fontSize: 'clamp(7px,1.2vw,14px)' }}
                  >
                    {f.title}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 'clamp(5px,0.85vw,10px)' }}>
                    {f.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Slide 5: Construction Progress ──────────────────────────────────────────
const Slide5Construction = ({ formData }: { formData: any }) => {
  const accentColor = '#f97316';
  const headingColor = '#3d1a6e';
  const fontFamily = formData.presentation.fontFamily || 'Arial';

  const progressItems = [
    { icon: CheckCircle2, title: 'Foundation', status: 'Completed', color: accentColor },
    { icon: Loader2, title: 'Structure', status: 'In Progress', color: accentColor },
    { icon: Clock, title: 'Finishing', status: 'Ahead', color: accentColor },
    { icon: Calendar, title: 'Possession', status: formData.financial?.possession || 'March 2027', color: accentColor },
  ];

  const constructionImage = formData.imagesDocuments.images[3]
    ? URL.createObjectURL(formData.imagesDocuments.images[3])
    : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop';

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white"
      style={{ aspectRatio: '16/9', fontFamily }}
    >
      {/* Right: Construction image */}
      <div className="absolute right-0 top-0 bottom-0" style={{ width: '55%' }}>
        <img src={constructionImage} alt="Construction" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, transparent 40%, white 100%)' }}
        />
        {/* Current status badge */}
        <div
          className="absolute bottom-[6%] right-[4%]"
          style={{
            background: headingColor,
            color: '#fff',
            padding: 'clamp(6px,1vw,12px) clamp(10px,1.5vw,18px)',
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 'clamp(4px,0.7vw,8px)', letterSpacing: '0.12em', opacity: 0.7, marginBottom: 2 }}>
            CURRENT STATUS
          </div>
          <div style={{ fontSize: 'clamp(9px,1.6vw,18px)', fontWeight: 900, letterSpacing: '0.05em' }}>
            {formData.financial?.currentStatus?.toUpperCase() || 'JUNE 2026'}
          </div>
        </div>
      </div>

      {/* Left content */}
      <div className="absolute inset-0 flex flex-col justify-center p-[5%] pr-[52%]">
        <div className="flex items-start gap-3 mb-[5%]">
          <div
            style={{
              background: headingColor,
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(8px,1.3vw,15px)',
              padding: '3px 8px',
              borderRadius: 4,
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            05
          </div>
          <div>
            <h2
              className="font-extrabold leading-none"
              style={{ color: headingColor, fontSize: 'clamp(13px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              CONSTRUCTION
            </h2>
            <h2
              className="font-extrabold"
              style={{ color: accentColor, fontSize: 'clamp(13px,2.8vw,32px)', lineHeight: 1.1 }}
            >
              PROGRESS
            </h2>
          </div>
        </div>

        {/* Progress list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.5vw,18px)' }}>
          {progressItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div
                  style={{
                    width: 'clamp(14px,2.2vw,26px)',
                    height: 'clamp(14px,2.2vw,26px)',
                    borderRadius: '50%',
                    border: `1.5px solid ${item.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size="clamp(7px,1.1vw,13px)" style={{ color: item.color }} strokeWidth={2} />
                </div>
                <div>
                  <div
                    className="font-bold"
                    style={{ color: headingColor, fontSize: 'clamp(7px,1.2vw,14px)' }}
                  >
                    {item.title}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: 'clamp(5px,0.85vw,10px)' }}>
                    {item.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Main PPTPreview Page ─────────────────────────────────────────────────────
const PPTPreview = () => {
  const { formData } = useFormData();

  const slides = [
    { id: 1, label: 'Slide 1 — Cover / Hero', component: <Slide1Cover formData={formData} /> },
    { id: 2, label: 'Slide 2 — City At A Glance', component: <Slide2CityGlance formData={formData} /> },
    { id: 3, label: 'Slide 3 — Premium Location', component: <Slide3Location formData={formData} /> },
    { id: 4, label: 'Slide 4 — Project Showcase', component: <Slide4ProjectShowcase formData={formData} /> },
    { id: 5, label: 'Slide 5 — Construction Progress', component: <Slide5Construction formData={formData} /> },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">PPT Preview</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Live preview of all 5 slide layouts — text &amp; images update from the admin forms.
      </p>

      <div className="space-y-10">
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex items-center justify-center rounded-full text-white font-bold text-sm"
                style={{ width: 32, height: 32, background: '#3d1a6e', flexShrink: 0 }}
              >
                {slide.id}
              </div>
              <h2 className="text-lg font-semibold text-gray-700">{slide.label}</h2>
            </div>
            <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {slide.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PPTPreview;