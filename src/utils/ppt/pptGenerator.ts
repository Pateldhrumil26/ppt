import { AllSlides } from '../../context/FormContext';
import { PPT_THEME } from './pptLayoutConfig';
import { addHeader, addFooter, addCard, addImageBlock, addStatCard } from './pptComponents';

// Dynamic loader for pptxgenjs
let PptxGenJS: any = null;
const loadPptxGenJS = async () => {
  if (!PptxGenJS) {
    const module = await import('pptxgenjs');
    PptxGenJS = module.default;
  }
  return PptxGenJS;
};

// Helper to check if a string is a valid base64 data URL
const isValidBase64 = (str: any): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('data:image/') && str.includes(';base64,');
};

// Helper: convert a File or Blob to base64 data URL
const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    if (!(file instanceof File) && !(file instanceof Blob)) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

// Helper: fetch an image URL and return base64 data URL
const urlToBase64 = (url: string, retryCount = 0): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Handle SVGs or images without natural width/height in headless/certain environments
      canvas.width = img.naturalWidth || 300;
      canvas.height = img.naturalHeight || 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      if (retryCount === 0 && url.startsWith('http') && !url.includes('corsproxy.io')) {
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
        urlToBase64(proxyUrl, 1).then(resolve).catch(reject);
      } else {
        reject(new Error('Failed to load image'));
      }
    };
    img.src = url;
  });
};

// Helper: get base64 from File or fallback URL
const getImageBase64 = async (file: any, fallbackUrl: string): Promise<string | null> => {
  if (typeof file === 'string') {
    if (file.startsWith('[File:') || file === '' || file === 'null') {
      return await urlToBase64(fallbackUrl).catch(() => null);
    }
    try {
      return await urlToBase64(file);
    } catch {
      return await urlToBase64(fallbackUrl).catch(() => null);
    }
  }
  if (file instanceof File || file instanceof Blob) {
    const base64 = await fileToBase64(file);
    return base64 || null;
  }
  try {
    return await urlToBase64(fallbackUrl);
  } catch {
    return null;
  }
};

/**
 * Pre-defined categories list matching FormContext keys and emojis
 */
const PREDEFINED_CATEGORIES = [
  { id: 'cat_1', name: 'Prime Location', emoji: '📍' },
  { id: 'cat_2', name: 'Premium Brands', emoji: '💎' },
  { id: 'cat_3', name: 'High Footfall', emoji: '👥' },
  { id: 'cat_4', name: 'Modern Architecture', emoji: '🏢' },
  { id: 'cat_5', name: 'Excellent Connectivity', emoji: '🛣️' },
  { id: 'cat_6', name: 'Strong Investment Returns', emoji: '📈' },
  { id: 'cat_7', name: 'Future Growth', emoji: '↗️' },
  { id: 'cat_8', name: 'Retail Opportunity', emoji: '🛍️' },
  { id: 'cat_9', name: 'F&B Potential', emoji: '🍽️' },
  { id: 'cat_10', name: 'Corporate Hub', emoji: '💼' },
  { id: 'cat_11', name: 'Lifestyle Destination', emoji: '🌿' },
  { id: 'cat_12', name: 'Entertainment Zone', emoji: '🎬' },
  { id: 'cat_13', name: 'Health & Wellness', emoji: '❤️' },
  { id: 'cat_14', name: 'Smart Design', emoji: '💠' },
  { id: 'cat_15', name: 'High Visibility', emoji: '👁️' },
];

/**
 * Resolves all presentation images in parallel before rendering the slides.
 */
const resolveAllImages = async (data: AllSlides) => {
  const promises = {
    slide1Bg: getImageBase64(data.slide1.backgroundImage, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop'),
    slide1Logo: getImageBase64(data.slide1.logo, 'https://aestheticarc.com/wp-content/uploads/2024/07/Group-1465.svg'),
    slide2City: getImageBase64(data.slide2.cityImage, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop'),
    slide3Map: getImageBase64(data.slide3.mapImage, 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'),
    slide4Project: getImageBase64(data.slide4.projectImage, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'),
    slide5Construction: getImageBase64(data.slide5.constructionImage, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'),
    slide6Plan: getImageBase64(data.slide6.planImage, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop'),
    slide7Plan: getImageBase64(data.slide7.planImage, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop'),
    slideFirstFloorPlan: getImageBase64(data.slideFirstFloorPlan.floorPlanImage, 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop'),
    slideSiteVisibilityLeft: getImageBase64(data.slideSiteVisibility.leftViewImage, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'),
    slideSiteVisibilityFront: getImageBase64(data.slideSiteVisibility.frontViewImage, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    slideSiteVisibilityRight: getImageBase64(data.slideSiteVisibility.rightViewImage, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop'),
    slideNearbyCommercialEcosystem: getImageBase64(data.slideNearbyCommercial.ecosystemImage, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'),
    // 8 building images
    building1: getImageBase64(data.slideNearbyCommercial.building1Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building2: getImageBase64(data.slideNearbyCommercial.building2Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building3: getImageBase64(data.slideNearbyCommercial.building3Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building4: getImageBase64(data.slideNearbyCommercial.building4Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building5: getImageBase64(data.slideNearbyCommercial.building5Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building6: getImageBase64(data.slideNearbyCommercial.building6Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building7: getImageBase64(data.slideNearbyCommercial.building7Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    building8: getImageBase64(data.slideNearbyCommercial.building8Image, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'),
    slide8Map: getImageBase64(data.slide8.mapImage, 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'),
    slide9Img1: getImageBase64(data.slide9.img1, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop'),
    slide9Img2: getImageBase64(data.slide9.img2, 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop'),
    slide9Img3: getImageBase64(data.slide9.img3, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop'),
    slide9Img4: getImageBase64(data.slide9.img4, 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop'),
    slide9Img5: getImageBase64(data.slide9.img5, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop'),
    slide11Building: getImageBase64(data.slide11.buildingImage, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'),
    slideContactLogo: getImageBase64(data.slideContact.companyLogo, 'https://aestheticarc.com/wp-content/uploads/2024/07/Group-1465.svg')
  };

  const keys = Object.keys(promises);
  const values = await Promise.all(Object.values(promises));
  const resolved: Record<string, string | null> = {};
  keys.forEach((key, idx) => {
    resolved[key] = values[idx];
  });
  return resolved;
};

/**
 * Main PPTX presentation builder and downloader.
 */
export const generatePPT = async (
  data: AllSlides,
  setIsGenerating?: (isGenerating: boolean) => void
) => {
  if (setIsGenerating) setIsGenerating(true);

  try {
    const PptxGen = await loadPptxGenJS();
    const pptx = new PptxGen();
    pptx.defineLayout({ name: 'custom16x9', width: 13.33, height: 7.5 });
    pptx.layout = 'custom16x9';

    // 1. Pre-resolve all slide base64 graphics in parallel
    const images = await resolveAllImages(data);
    const logoData = images.slideContactLogo || images.slide1Logo;
    const companyName = data.slideContact.companyName || data.slide1.companyName || 'Aesthetic Arc';
    const cityName = data.slide2.cityName || 'AHMEDABAD';
    const website = data.slideContact.website || 'www.aestheticarc.com';

    const { colors, fonts, layout } = PPT_THEME;

    // ==================== SLIDE 1: COVER PAGE ====================
    const slide1 = pptx.addSlide();
    const themeColor = data.slide1.themeColor.replace('#', '');
    const fontColor = data.slide1.fontColor.replace('#', '');
    slide1.background = { color: themeColor };

    // Right-side cover visual
    if (images.slide1Bg && isValidBase64(images.slide1Bg)) {
      slide1.addImage({
        data: images.slide1Bg,
        x: 6.7, y: 0, w: 6.63, h: 7.5,
        sizing: { type: 'cover', w: 6.63, h: 7.5 }
      });
      // Themed smooth fade from solid color edge to visual edge
      const gradientWidths = [0.2, 0.3, 0.4, 0.4];
      const transparencySteps = [0, 30, 60, 85];
      let currentX = 6.7;
      gradientWidths.forEach((w, idx) => {
        slide1.addShape(pptx.ShapeType.rect, {
          x: currentX, y: 0, w, h: 7.5,
          fill: { color: themeColor, transparency: transparencySteps[idx] },
          line: { type: 'none' }
        });
        currentX += w;
      });
    }

    // Cover Page content (Left aligned)
    slide1.addText(data.slide1.slideNumber || '', {
      x: 0.6, y: 0.5, w: 1.0, h: 0.5, fontSize: 16, bold: true, color: fontColor,
    });
    slide1.addText(data.slide1.title || '', {
      x: 0.6, y: 1.4, w: 5.6, h: 1.6, fontSize: 36, bold: true, color: fontColor,
      fontFace: fonts.header, lineSpacing: 1.1,
    });
    slide1.addText(data.slide1.subtitle || '', {
      x: 0.6, y: 3.1, w: 5.6, h: 0.5, fontSize: 14, bold: true, color: colors.accent,
      fontFace: fonts.header,
    });
    slide1.addText(data.slide1.address || '', {
      x: 0.6, y: 3.7, w: 5.6, h: 0.6, fontSize: 10, color: fontColor,
      fontFace: fonts.body,
    });

    slide1.addText('Presented by', {
      x: 0.6, y: 4.4, w: 5.0, h: 0.3, fontSize: 9.5, color: fontColor,
      fontFace: fonts.body, transparency: 45,
    });

    // Company logo + details
    if (images.slide1Logo && isValidBase64(images.slide1Logo)) {
      slide1.addImage({
        data: images.slide1Logo,
        x: 0.6, y: 4.7, w: 0.5, h: 0.5,
        sizing: { type: 'contain', w: 0.5, h: 0.5 }
      });
      slide1.addText(data.slide1.companyName || '', {
        x: 1.2, y: 4.7, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: fontColor,
        fontFace: fonts.header,
      });
      slide1.addText(data.slide1.companyTagline || '', {
        x: 1.2, y: 5.0, w: 4.0, h: 0.25, fontSize: 8.5, color: fontColor,
        fontFace: fonts.body, transparency: 45,
      });
    } else {
      slide1.addText(data.slide1.companyName || '', {
        x: 0.6, y: 4.7, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: fontColor,
        fontFace: fonts.header,
      });
      slide1.addText(data.slide1.companyTagline || '', {
        x: 0.6, y: 5.0, w: 4.0, h: 0.25, fontSize: 8.5, color: fontColor,
        fontFace: fonts.body, transparency: 45,
      });
    }

    // ==================== SLIDE 2: CITY AT A GLANCE ====================
    const slide2 = pptx.addSlide();
    slide2.background = { color: colors.bg };
    addHeader(slide2, pptx, 'City Context', 'AT A GLANCE', '02');

    // Left Column stats layout
    slide2.addText('A Thriving City. A Growing Opportunity.', {
      x: layout.split.leftCol.x, y: 1.45, w: layout.split.leftCol.w, h: 0.3,
      fontSize: 10.5, bold: true, color: colors.textMuted,
    });

    const stats = [
      { value: data.slide2.population || '', label: 'Population' },
      { value: data.slide2.gdp || '', label: 'GDP' },
      { value: data.slide2.gdpGrowth || '', label: 'GDP Growth' },
      { value: "World's 1st", label: data.slide2.worldFirst || '', highlight: true },
      { value: data.slide2.metroKm || '', label: 'Metro Network' },
      { value: data.slide2.brtsKm || '', label: 'BRTS Network' },
      { value: data.slide2.dailyFlights || '', label: 'Daily Flights' },
      { value: 'Top 3', label: data.slide2.retailRank || '', highlight: true },
    ];

    stats.forEach((stat, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const statW = 1.28;
      const statH = 1.15;
      const statX = layout.split.leftCol.x + col * 1.44;
      const statY = 1.95 + row * 1.35;
      addStatCard(slide2, pptx, statX, statY, statW, statH, stat.value, stat.label, stat.highlight);
    });

    // Infrastructure list at the bottom left
    const infraLines = (data.slide2.infrastructure || '').split('\n').filter(Boolean);
    if (infraLines.length > 0) {
      slide2.addText('UPCOMING INFRASTRUCTURE', {
        x: layout.split.leftCol.x, y: 4.8, w: layout.split.leftCol.w, h: 0.3,
        fontSize: 9.5, bold: true, color: colors.primary, letterSpacing: 1,
      });

      const half = Math.ceil(infraLines.length / 2);
      infraLines.forEach((line, idx) => {
        const col = idx < half ? 0 : 1;
        const row = idx < half ? idx : idx - half;
        slide2.addText(`•  ${line}`, {
          x: layout.split.leftCol.x + col * 2.85,
          y: 5.15 + row * 0.32,
          w: 2.7,
          h: 0.28,
          fontSize: 8.5,
          color: colors.textDark,
        });
      });
    }

    // Right Column visual
    addImageBlock(slide2, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide2City, 'Cityscape Context');
    addFooter(slide2, pptx, '02', logoData, companyName, cityName, website);

    // ==================== SLIDE 3: PREMIUM LOCATION ====================
    const slide3 = pptx.addSlide();
    slide3.background = { color: colors.bg };
    addHeader(slide3, pptx, 'Premium Location', 'THAT CONNECTS EVERYTHING', '03');

    // Left Column Image (Map/Location visual)
    addImageBlock(slide3, pptx, layout.split.leftImageCol.x, layout.split.leftImageCol.y, layout.split.leftImageCol.w, layout.split.leftImageCol.h, images.slide3Map, 'Neighborhood Location Map');

    // Right Column text details
    const rightTextX = layout.split.rightTextCol.x;
    slide3.addText(data.slide3.address || '', {
      x: rightTextX, y: 1.45, w: layout.split.rightTextCol.w, h: 0.35,
      fontSize: 11, bold: true, color: colors.primary,
    });

    // Location Highlights grid
    const highlights = [
      { label: data.slide3.point1Title || 'SG Highway', desc: data.slide3.point1Desc || '' },
      { label: data.slide3.point2Title || 'Access', desc: data.slide3.point2Desc || '' },
      { label: data.slide3.point3Title || 'Surroundings', desc: data.slide3.point3Desc || '' },
    ];

    highlights.forEach((item, idx) => {
      const cardY = 2.0 + idx * 1.5;
      addCard(slide3, pptx, rightTextX, cardY, layout.split.rightTextCol.w, 1.35, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.05,
      });

      slide3.addText(item.label.toUpperCase(), {
        x: rightTextX + 0.15, y: cardY + 0.1, w: layout.split.rightTextCol.w - 0.3, h: 0.25,
        fontSize: 9, bold: true, color: colors.accent,
      });

      slide3.addText(item.desc, {
        x: rightTextX + 0.15, y: cardY + 0.35, w: layout.split.rightTextCol.w - 0.3, h: 0.9,
        fontSize: 8, color: colors.textDark,
      });
    });

    addFooter(slide3, pptx, '03', logoData, companyName, cityName, website);

    // ==================== SLIDE 4: PREMIUM PLOT FEATURES ====================
    const slide4 = pptx.addSlide();
    slide4.background = { color: colors.bg };
    addHeader(slide4, pptx, 'Premium Corner Plot', 'WITH MAXIMUM VISIBILITY', '04');

    // Left Column details
    const features4 = [
      { num: '01', title: data.slide4.feature1Title || '', desc: data.slide4.feature1Desc || '' },
      { num: '02', title: data.slide4.feature2Title || '', desc: data.slide4.feature2Desc || '' },
      { num: '03', title: data.slide4.feature3Title || '', desc: data.slide4.feature3Desc || '' },
    ];

    features4.forEach((f, idx) => {
      const itemY = 1.45 + idx * 1.35;
      slide4.addText(f.num, {
        x: layout.split.leftCol.x, y: itemY, w: 0.5, h: 0.4,
        fontSize: 16, bold: true, color: colors.accent,
      });
      slide4.addText(f.title, {
        x: layout.split.leftCol.x + 0.6, y: itemY - 0.05, w: layout.split.leftCol.w - 0.6, h: 0.25,
        fontSize: 10.5, bold: true, color: colors.primary,
      });
      slide4.addText(f.desc, {
        x: layout.split.leftCol.x + 0.6, y: itemY + 0.2, w: layout.split.leftCol.w - 0.6, h: 0.9,
        fontSize: 8, color: colors.textDark,
      });
    });

    // Milestone / Possession Card at the bottom left
    const possessionY = 5.7;
    addCard(slide4, pptx, layout.split.leftCol.x, possessionY, layout.split.leftCol.w, 0.75, {
      fillColor: colors.primary,
      borderColor: colors.primary,
      radius: 0.06,
    });
    slide4.addText((data.slide4.possessionLabel || 'EXPECTED POSSESSION').toUpperCase(), {
      x: layout.split.leftCol.x + 0.2, y: possessionY + 0.1, w: layout.split.leftCol.w - 0.4, h: 0.25,
      fontSize: 8, bold: true, color: colors.accent,
    });
    slide4.addText(data.slide4.possessionDate || 'March 2027', {
      x: layout.split.leftCol.x + 0.2, y: possessionY + 0.35, w: layout.split.leftCol.w - 0.4, h: 0.3,
      fontSize: 12, bold: true, color: colors.textLight,
    });

    // Right Column visual
    addImageBlock(slide4, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide4Project, 'Architectural Render');
    addFooter(slide4, pptx, '04', logoData, companyName, cityName, website);

    // ==================== SLIDE 5: CONSTRUCTION UPDATE ====================
    const slide5 = pptx.addSlide();
    slide5.background = { color: colors.bg };
    addHeader(slide5, pptx, 'Construction Progress', 'DEVELOPMENT MILESTONES', '05');

    // Left Column progress detail list
    const milestones = [
      { label: data.slide5.progress1Title || 'Foundation', val: data.slide5.progress1Status || '', desc: '' },
      { label: data.slide5.progress2Title || 'Structure', val: data.slide5.progress2Status || '', desc: '' },
      { label: data.slide5.progress3Title || 'Finishing', val: data.slide5.progress3Status || '', desc: '' },
      { label: data.slide5.progress4Title || 'Possession', val: data.slide5.progress4Status || '', desc: '' },
    ];

    milestones.forEach((m, idx) => {
      const cardY = 1.45 + idx * 1.05;
      const isDone = m.val.toLowerCase().includes('complete');
      const accent = isDone ? colors.primary : colors.accent;

      addCard(slide5, pptx, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 0.9, {
        fillColor: colors.bg,
        borderColor: isDone ? colors.border : colors.primary,
        radius: 0.05,
      });

      slide5.addShape(pptx.ShapeType.rect, {
        x: layout.split.leftCol.x, y: cardY, w: 0.08, h: 0.9,
        fill: { color: accent },
        line: { type: 'none' },
      });

      slide5.addText(m.label.toUpperCase(), {
        x: layout.split.leftCol.x + 0.25, y: cardY + 0.25, w: 3.5, h: 0.4,
        fontSize: 10.5, bold: true, color: colors.primary,
        valign: 'middle',
      });

      slide5.addText(m.val.toUpperCase(), {
        x: layout.split.leftCol.x + layout.split.leftCol.w - 1.6, y: cardY + 0.25, w: 1.4, h: 0.4,
        fontSize: 9.5, bold: true, color: accent, align: 'right',
        valign: 'middle',
      });
    });

    // Milestone Completion summary text at bottom
    const snapshotText = data.slide5.currentStatus ? `Last updated snapshot: ${data.slide5.currentStatus}` : '';
    slide5.addText(snapshotText, {
      x: layout.split.leftCol.x, y: 6.0, w: layout.split.leftCol.w, h: 0.35,
      fontSize: 8.5, color: colors.textMuted, italic: true,
    });

    // Right Column visual
    addImageBlock(slide5, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide5Construction, 'Site Construction Photo');
    addFooter(slide5, pptx, '05', logoData, companyName, cityName, website);

    // ==================== SLIDE: SITE VISIBILITY ====================
    const slideSiteVisibility = pptx.addSlide();
    slideSiteVisibility.background = { color: colors.bg };
    addHeader(slideSiteVisibility, pptx, data.slideSiteVisibility.title || 'Site Visibility', data.slideSiteVisibility.subtitle || 'EXCELLENT FRONTAGE & ACCESS', '06');

    const views = [
      { label: 'LEFT VIEW', image: images.slideSiteVisibilityLeft },
      { label: 'FRONT VIEW', image: images.slideSiteVisibilityFront },
      { label: 'RIGHT VIEW', image: images.slideSiteVisibilityRight },
    ];

    views.forEach((item, idx) => {
      const cardW = 3.8;
      const cardH = 4.5;
      const cardX = 0.6 + idx * 4.16;
      const cardY = 1.7;

      addCard(slideSiteVisibility, pptx, cardX, cardY, cardW, cardH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06,
      });

      const frameH = 3.4;
      addImageBlock(slideSiteVisibility, pptx, cardX, cardY, cardW, frameH, item.image, item.label);

      // Label block under image
      slideSiteVisibility.addShape(pptx.ShapeType.rect, {
        x: cardX, y: cardY + frameH, w: cardW, h: 1.1,
        fill: { color: colors.primary },
        line: { type: 'none' }
      });
      slideSiteVisibility.addText(item.label, {
        x: cardX, y: cardY + frameH + 0.3, w: cardW, h: 0.4,
        fontSize: 10, bold: true, color: colors.textLight, align: 'center', valign: 'middle',
      });
    });

    addFooter(slideSiteVisibility, pptx, '06', logoData, companyName, cityName, website);

    // ==================== SLIDE 6: GROUND FLOOR PLAN ====================
    const slide6 = pptx.addSlide();
    slide6.background = { color: colors.bg };
    addHeader(slide6, pptx, data.slide6.title || 'Ground Floor Plan', data.slide6.subtitle || 'RETAIL SPACES', '07');

    // Left Column details
    const features6 = [
      { label: data.slide6.floorHeightLabel || 'Floor Height', val: data.slide6.floorHeightValue || "12'5\"" },
      { label: data.slide6.frontageLabel || 'Frontage', val: data.slide6.frontageValue || "20' to 35'" },
      { label: data.slide6.parkingLabel || 'Parking', val: data.slide6.parkingValue || 'Ample Parking' },
      { label: data.slide6.roadAccessLabel || 'Road Access', val: data.slide6.roadAccessValue || '30 MT Wide Road' },
    ];

    features6.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addCard(slide6, pptx, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05,
      });

      slide6.addText(item.label.toUpperCase(), {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.15, w: layout.split.leftCol.w - 0.4, h: 0.25,
        fontSize: 8, bold: true, color: colors.textMuted,
      });

      slide6.addText(item.val, {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.4, w: layout.split.leftCol.w - 0.4, h: 0.55,
        fontSize: 11, bold: true, color: colors.primary,
      });
    });

    // Right Column visual
    addImageBlock(slide6, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide6Plan, 'Ground Floor Plan Layout');
    addFooter(slide6, pptx, '07', logoData, companyName, cityName, website);

    // ==================== SLIDE: FIRST FLOOR PLAN ====================
    const slideFirstFloorPlan = pptx.addSlide();
    slideFirstFloorPlan.background = { color: colors.bg };
    addHeader(slideFirstFloorPlan, pptx, data.slideFirstFloorPlan.title || 'First Floor Plan', data.slideFirstFloorPlan.subtitle || 'RETAIL SPACES', '08');

    // Left Column details
    const featuresFirst = [
      { label: data.slideFirstFloorPlan.feature1Title || 'Floor Height', val: data.slideFirstFloorPlan.feature1Desc || '10\'5"' },
      { label: data.slideFirstFloorPlan.feature2Title || 'Frontage', val: data.slideFirstFloorPlan.feature2Desc || '18\' to 28\'' },
      { label: data.slideFirstFloorPlan.feature3Title || 'Parking', val: data.slideFirstFloorPlan.feature3Desc || 'Ample' },
      { label: data.slideFirstFloorPlan.feature4Title || 'Escalator & Lift', val: data.slideFirstFloorPlan.feature4Desc || 'For Easy Access' },
    ];

    featuresFirst.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addCard(slideFirstFloorPlan, pptx, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05,
      });

      slideFirstFloorPlan.addText(item.label.toUpperCase(), {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.15, w: layout.split.leftCol.w - 0.4, h: 0.25,
        fontSize: 8, bold: true, color: colors.textMuted,
      });

      slideFirstFloorPlan.addText(item.val, {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.4, w: layout.split.leftCol.w - 0.4, h: 0.55,
        fontSize: 11, bold: true, color: colors.primary,
      });
    });

    // Right Column visual
    addImageBlock(slideFirstFloorPlan, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slideFirstFloorPlan, 'First Floor Plan Layout');
    addFooter(slideFirstFloorPlan, pptx, '08', logoData, companyName, cityName, website);

    // ==================== SLIDE 7: SECOND FLOOR PLAN ====================
    const slide7 = pptx.addSlide();
    slide7.background = { color: colors.bg };
    addHeader(slide7, pptx, data.slide7.title || 'Second Floor Plan', data.slide7.subtitle || 'RETAIL / OFFICE SPACES', '09');

    // Left Column details
    const features7 = [
      { label: data.slide7.floorHeightLabel || 'Floor Height', val: data.slide7.floorHeightValue || "9'5\"" },
      { label: data.slide7.bestForLabel || 'Best for', val: data.slide7.bestForValue || 'F&B / Lifestyle / Offices' },
      { label: data.slide7.terraceLabel || 'Open Terrace', val: data.slide7.terraceValue || 'Provision' },
      { label: data.slide7.liftStaircaseLabel || 'Lift & Staircase', val: data.slide7.liftStaircaseValue || 'Access' },
    ];

    features7.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addCard(slide7, pptx, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05,
      });

      slide7.addText(item.label.toUpperCase(), {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.15, w: layout.split.leftCol.w - 0.4, h: 0.25,
        fontSize: 8, bold: true, color: colors.textMuted,
      });

      slide7.addText(item.val, {
        x: layout.split.leftCol.x + 0.2, y: cardY + 0.4, w: layout.split.leftCol.w - 0.4, h: 0.55,
        fontSize: 11, bold: true, color: colors.primary,
      });
    });

    // Right Column visual
    addImageBlock(slide7, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide7Plan, 'Second Floor Plan Layout');
    addFooter(slide7, pptx, '09', logoData, companyName, cityName, website);

    // ==================== SLIDE: NEARBY COMMERCIAL ECOSYSTEM ====================
    const slideNearbyCommercial = pptx.addSlide();
    slideNearbyCommercial.background = { color: colors.bg };
    addHeader(slideNearbyCommercial, pptx, data.slideNearbyCommercial.title || 'Commercial Ecosystem', data.slideNearbyCommercial.subtitle || 'NEARBY DEVELOPMENTS', '10');

    // Left Column Image
    addImageBlock(slideNearbyCommercial, pptx, layout.split.leftCol.x, layout.split.leftCol.y, layout.split.leftCol.w, layout.split.leftCol.h, images.slideNearbyCommercialEcosystem, 'Neighborhood Map Context');

    // Right Column: Grid of 8 buildings (4 columns x 2 rows)
    const buildings = [
      { name: data.slideNearbyCommercial.building1Name || '', distance: data.slideNearbyCommercial.building1Distance || '', image: images.building1 },
      { name: data.slideNearbyCommercial.building2Name || '', distance: data.slideNearbyCommercial.building2Distance || '', image: images.building2 },
      { name: data.slideNearbyCommercial.building3Name || '', distance: data.slideNearbyCommercial.building3Distance || '', image: images.building3 },
      { name: data.slideNearbyCommercial.building4Name || '', distance: data.slideNearbyCommercial.building4Distance || '', image: images.building4 },
      { name: data.slideNearbyCommercial.building5Name || '', distance: data.slideNearbyCommercial.building5Distance || '', image: images.building5 },
      { name: data.slideNearbyCommercial.building6Name || '', distance: data.slideNearbyCommercial.building6Distance || '', image: images.building6 },
      { name: data.slideNearbyCommercial.building7Name || '', distance: data.slideNearbyCommercial.building7Distance || '', image: images.building7 },
      { name: data.slideNearbyCommercial.building8Name || '', distance: data.slideNearbyCommercial.building8Distance || '', image: images.building8 },
    ];

    const gridCardW = 1.38;
    const gridCardH = 2.3;
    const gridGapX = 0.17;
    const gridGapY = 0.25;

    for (let idx = 0; idx < 8; idx++) {
      const b = buildings[idx];
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const cardX = layout.split.rightCol.x + col * (gridCardW + gridGapX);
      const cardY = layout.split.rightCol.y + row * (gridCardH + gridGapY);

      addCard(slideNearbyCommercial, pptx, cardX, cardY, gridCardW, gridCardH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06,
      });

      // Image frame within building card
      const frameHeight = 1.35;
      if (b.image && isValidBase64(b.image)) {
        slideNearbyCommercial.addImage({
          data: b.image,
          x: cardX, y: cardY, w: gridCardW, h: frameHeight,
          sizing: { type: 'cover', w: gridCardW, h: frameHeight }
        });
      } else {
        slideNearbyCommercial.addShape(pptx.ShapeType.rect, {
          x: cardX, y: cardY, w: gridCardW, h: frameHeight,
          fill: { color: colors.accentBg },
          line: { type: 'none' }
        });
        slideNearbyCommercial.addText('🏢', {
          x: cardX, y: cardY + 0.3, w: gridCardW, h: 0.5,
          fontSize: 20, align: 'center', valign: 'middle',
        });
      }

      // Building name badge overlay
      slideNearbyCommercial.addShape(pptx.ShapeType.rect, {
        x: cardX, y: cardY + frameHeight - 0.25, w: gridCardW, h: 0.25,
        fill: { color: colors.primary, transparency: 10 },
        line: { type: 'none' }
      });
      slideNearbyCommercial.addText(b.name.toUpperCase(), {
        x: cardX, y: cardY + frameHeight - 0.25, w: gridCardW, h: 0.25,
        fontSize: 6.5, bold: true, color: colors.textLight,
        align: 'center', valign: 'middle',
      });

      // Distance tag
      slideNearbyCommercial.addText(b.distance, {
        x: cardX, y: cardY + frameHeight, w: gridCardW, h: gridCardH - frameHeight,
        fontSize: 10, bold: true, color: colors.accent,
        align: 'center', valign: 'middle',
      });
    }

    addFooter(slideNearbyCommercial, pptx, '10', logoData, companyName, cityName, website);

    // ==================== SLIDE 8: BRAND LOCATION MAP ====================
    const slide8 = pptx.addSlide();
    slide8.background = { color: colors.bg };
    addHeader(slide8, pptx, data.slide8.title || 'Brand Location Map', data.slide8.subtitle || 'BE IN THE COMPANY OF THE BEST', '11');

    // Large Location Map Visual
    addImageBlock(slide8, pptx, layout.fullWidthContent.x, layout.fullWidthContent.y, layout.fullWidthContent.w, layout.fullWidthContent.h, images.slide8Map, 'Brand Context Neighborhood Map');

    addFooter(slide8, pptx, '11', logoData, companyName, cityName, website);

    // ==================== SLIDE 9: LIFESTYLE AROUND YOU ====================
    const slide9 = pptx.addSlide();
    slide9.background = { color: colors.bg };
    addHeader(slide9, pptx, data.slide9.title || 'Lifestyle Catchment', data.slide9.subtitle || 'EVERYTHING NEARBY', '12');

    const lifestyleCategories = [
      { label: data.slide9.label1 || 'Dining', image: images.slide9Img1 },
      { label: data.slide9.label2 || 'Shopping', image: images.slide9Img2 },
      { label: data.slide9.label3 || 'Fitness', image: images.slide9Img3 },
      { label: data.slide9.label4 || 'Entertainment', image: images.slide9Img4 },
      { label: data.slide9.label5 || 'Residential', image: images.slide9Img5 },
    ];

    lifestyleCategories.forEach((item, idx) => {
      const colW = 2.15;
      const colH = 4.6;
      const colX = 0.6 + idx * 2.495;
      const colY = 1.6;

      addCard(slide9, pptx, colX, colY, colW, colH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06,
      });

      const photoH = 3.6;
      addImageBlock(slide9, pptx, colX, colY, colW, photoH, item.image, item.label);

      slide9.addShape(pptx.ShapeType.rect, {
        x: colX, y: colY + photoH, w: colW, h: colH - photoH,
        fill: { color: colors.primary },
        line: { type: 'none' }
      });
      slide9.addText(item.label.toUpperCase(), {
        x: colX, y: colY + photoH, w: colW, h: colH - photoH,
        fontSize: 9.5, bold: true, color: colors.textLight,
        align: 'center', valign: 'middle',
      });
    });

    addFooter(slide9, pptx, '12', logoData, companyName, cityName, website);

    // ==================== SLIDE 10: PROPERTY SPECIFICATIONS ====================
    const slide10 = pptx.addSlide();
    slide10.background = { color: colors.bg };
    addHeader(slide10, pptx, data.slide10.title || 'Specifications', 'PROPERTY BENCHMARKS', '13');

    // Col 1 Data List
    const col1 = [
      { label: 'Project Type', val: data.slide10.spec1Value || 'Commercial' },
      { label: 'Location Context', val: data.slide10.spec2Value || '' },
      { label: 'Jeweller Brands nearby', val: data.slide10.spec3Value || '' },
      { label: 'Apparel Brands nearby', val: data.slide10.spec4Value || '' },
      { label: 'F&B Outlets nearby', val: data.slide10.spec5Value || '' },
    ];

    // Col 2 Data List
    const col2 = [
      { label: 'Ground Floor Height', val: data.slide10.spec6Value || '' },
      { label: 'First Floor Height', val: data.slide10.spec7Value || '' },
      { label: 'Second Floor Height', val: data.slide10.spec8Value || '' },
      { label: 'Possession Date', val: data.slide10.spec9Value || '' },
    ];

    col1.forEach((item, idx) => {
      const itemY = 1.45 + idx * 1.05;
      addCard(slide10, pptx, 0.6, itemY, 5.8, 0.9, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05,
      });
      slide10.addText(item.label.toUpperCase(), {
        x: 0.8, y: itemY + 0.1, w: 5.4, h: 0.25,
        fontSize: 7.5, bold: true, color: colors.textMuted,
      });
      slide10.addText(item.val, {
        x: 0.8, y: itemY + 0.32, w: 5.4, h: 0.5,
        fontSize: 9.5, bold: true, color: colors.primary,
      });
    });

    col2.forEach((item, idx) => {
      const itemY = 1.45 + idx * 1.05;
      addCard(slide10, pptx, 6.9, itemY, 5.8, 0.9, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05,
      });
      slide10.addText(item.label.toUpperCase(), {
        x: 7.1, y: itemY + 0.1, w: 5.4, h: 0.25,
        fontSize: 7.5, bold: true, color: colors.textMuted,
      });
      slide10.addText(item.val, {
        x: 7.1, y: itemY + 0.32, w: 5.4, h: 0.5,
        fontSize: 9.5, bold: true, color: colors.primary,
      });
    });

    // QR Code / Maps Block in Col 2 bottom row
    const qrY = 5.65;
    addCard(slide10, pptx, 6.9, qrY, 5.8, 1.1, {
      fillColor: colors.primary,
      borderColor: colors.primary,
      radius: 0.05,
    });

    const qrSrc = images.slide10Qr || (data.slide10.qrUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.slide10.qrUrl)}` : '');

    if (qrSrc && isValidBase64(qrSrc)) {
      slide10.addImage({
        data: qrSrc,
        x: 7.05, y: qrY + 0.1, w: 0.9, h: 0.9,
      });
      slide10.addText(data.slide10.spec10Value || 'Scan QR Code', {
        x: 8.1, y: qrY + 0.25, w: 4.4, h: 0.3,
        fontSize: 12, bold: true, color: colors.textLight,
      });
      slide10.addText('Scan for Google Maps Navigation context', {
        x: 8.1, y: qrY + 0.55, w: 4.4, h: 0.3,
        fontSize: 8.5, color: colors.textLight, transparency: 30,
      });
    } else {
      slide10.addText('Google Maps Link Not Provided', {
        x: 7.1, y: qrY + 0.4, w: 5.4, h: 0.3,
        fontSize: 10, bold: true, color: colors.textLight, align: 'center',
      });
    }

    addFooter(slide10, pptx, '13', logoData, companyName, cityName, website);

    // ==================== SLIDE 11: INVESTMENT PROFILE ====================
    const slide14 = pptx.addSlide();
    slide14.background = { color: colors.darkBgAccent };

    // Navy header style
    slide14.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 0.5, w: 0.55, h: 0.5,
      fill: { color: colors.primary },
      line: { type: 'none' }
    });
    slide14.addText('14', {
      x: 0.6, y: 0.5, w: 0.55, h: 0.5,
      fontSize: 14, bold: true, color: colors.textLight,
      align: 'center', valign: 'middle',
    });
    slide14.addText('WHY INVEST IN', {
      x: 1.25, y: 0.45, w: 6.0, h: 0.3,
      fontSize: 16, bold: true, color: colors.textLight, fontFace: fonts.header,
    });
    slide14.addText((data.slide11.title || '').toUpperCase(), {
      x: 1.25, y: 0.75, w: 6.0, h: 0.45,
      fontSize: 18, bold: true, color: colors.textLight, fontFace: fonts.header,
    });
    slide14.addShape(pptx.ShapeType.rect, {
      x: 1.25, y: 1.25, w: 1.2, h: 0.04,
      fill: { color: colors.primary },
      line: { type: 'none' }
    });

    // Right Column visual
    addImageBlock(slide14, pptx, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide11Building, 'Development Render');

    // Horizontal category circles row at the bottom area (y: 4.8)
    const selectedCats = (data.slide11.selectedCategories || []).slice(0, 7).map(id =>
      PREDEFINED_CATEGORIES.find(c => c.id === id) || PREDEFINED_CATEGORIES[0]
    );
    const highlights11 = [
      ...selectedCats,
      ...Array(Math.max(0, 7 - selectedCats.length)).fill(PREDEFINED_CATEGORIES[0])
    ].slice(0, 7);

    const circleW = 1.35;
    const circleH = 1.45;
    const circleGap = 0.4;

    highlights11.forEach((cat, idx) => {
      const circleX = 0.6 + idx * (circleW + circleGap);
      const circleY = 4.7;

      addCard(slide14, pptx, circleX, circleY, circleW, circleH, {
        fillColor: '120d24',
        borderColor: colors.primary,
        borderWidth: 1.5,
        radius: 0.1,
      });

      // Emoji
      slide14.addText(cat.emoji, {
        x: circleX, y: circleY + 0.15, w: circleW, h: 0.5,
        fontSize: 18, align: 'center', valign: 'middle',
      });

      // Name label
      slide14.addText(cat.name.toUpperCase(), {
        x: circleX + 0.05, y: circleY + 0.7, w: circleW - 0.1, h: 0.6,
        fontSize: 7, bold: true, color: colors.textLight, align: 'center',
      });
    });

    addFooter(slide14, pptx, '14', logoData, companyName, cityName, website, true);

    // ==================== SLIDE 12: CONTACT SLIDE ====================
    const slideContact = pptx.addSlide();
    slideContact.background = { color: colors.darkBgAccent };

    slideContact.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 1.2, w: 2.0, h: 0.05,
      fill: { color: colors.accent },
      line: { type: 'none' }
    });

    slideContact.addText((data.slideContact.heading || 'Let\'s build\nsomething iconic\ntogether').toUpperCase(), {
      x: 0.6, y: 1.5, w: 6.0, h: 1.8, fontSize: 32, bold: true, color: colors.textLight,
      fontFace: fonts.header, lineSpacing: 1.1,
    });

    const contactInfo = [
      { text: data.slideContact.phone1 || '+91 97129 06363', icon: '📞' },
      { text: data.slideContact.phone2 || '+91 97129 06364', icon: '📞' },
      { text: data.slideContact.email || 'info@aestheticarc.com', icon: '✉️' },
      { text: data.slideContact.website || 'www.aestheticarc.com', icon: '🌐' },
      { text: data.slideContact.address || '', icon: '📍' },
    ];

    contactInfo.forEach((item, idx) => {
      const itemY = 3.6 + idx * 0.55;
      slideContact.addText(item.icon, {
        x: 0.6, y: itemY, w: 0.4, h: 0.4,
        fontSize: 12, align: 'center', valign: 'middle',
      });
      slideContact.addText(item.text, {
        x: 1.1, y: itemY, w: 5.0, h: 0.4,
        fontSize: 9.5, color: colors.textLight,
        fontFace: fonts.body,
        valign: 'middle',
      });
    });

    const brandX = 7.5;
    const brandY = 2.5;

    if (images.slideContactLogo && isValidBase64(images.slideContactLogo)) {
      slideContact.addImage({
        data: images.slideContactLogo,
        x: brandX, y: brandY, w: 1.1, h: 1.1,
        sizing: { type: 'contain', w: 1.1, h: 1.1 }
      });
      slideContact.addText(data.slideContact.companyName || '', {
        x: brandX, y: brandY + 1.35, w: 5.0, h: 0.4,
        fontSize: 22, bold: true, color: colors.textLight,
        fontFace: fonts.header,
      });
      slideContact.addText(data.slideContact.companyTagline || '', {
        x: brandX, y: brandY + 1.8, w: 5.0, h: 0.3,
        fontSize: 10.5, color: colors.accent,
        fontFace: fonts.body,
      });
    } else {
      slideContact.addText(data.slideContact.companyName || '', {
        x: brandX, y: brandY, w: 5.0, h: 0.4,
        fontSize: 22, bold: true, color: colors.textLight,
        fontFace: fonts.header,
      });
      slideContact.addText(data.slideContact.companyTagline || '', {
        x: brandX, y: brandY + 0.45, w: 5.0, h: 0.3,
        fontSize: 10.5, color: colors.accent,
        fontFace: fonts.body,
      });
    }

    addFooter(slideContact, pptx, '15', logoData, companyName, cityName, website, true);

    // ==================== SLIDE 13: THANK YOU ====================
    const slide12 = pptx.addSlide();
    slide12.background = { color: colors.darkBg };

    slide12.addShape(pptx.ShapeType.rect, {
      x: layout.width / 2 - 1.0, y: 2.2, w: 2.0, h: 0.05,
      fill: { color: colors.accent },
      line: { type: 'none' }
    });

    slide12.addText('THANK YOU!', {
      x: 1.0, y: 2.6, w: layout.width - 2.0, h: 1.2,
      fontSize: 48, bold: true, color: colors.textLight,
      align: 'center', fontFace: fonts.header, letterSpacing: -0.02,
    });

    slide12.addText(data.slide1.companyName || '', {
      x: 1.0, y: 3.9, w: layout.width - 2.0, h: 0.5,
      fontSize: 18, bold: true, color: colors.accent,
      align: 'center', fontFace: fonts.header,
    });

    slide12.addText(data.slide1.companyTagline || '', {
      x: 1.0, y: 4.4, w: layout.width - 2.0, h: 0.4,
      fontSize: 11.5, color: colors.textLight,
      align: 'center', fontFace: fonts.body, transparency: 30,
    });

    addFooter(slide12, pptx, '16', logoData, companyName, cityName, website, true);

    const fileName = `${data.slide1.companyName || 'Presentation'}_Marketing_Deck.pptx`;
    await pptx.writeFile({ fileName });

  } catch (error) {
    console.error('Error generating presentation:', error);
    throw error;
  } finally {
    if (setIsGenerating) setIsGenerating(false);
  }
};
