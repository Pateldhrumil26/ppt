import { jsPDF } from 'jspdf';
import { AllSlides } from '../../context/FormContext';
import { PPT_THEME } from '../ppt/pptLayoutConfig';
import {
  addPDFHeader,
  addPDFFooter,
  addPDFCard,
  addPDFImageBlock,
  addPDFStatCard,
  addPDFText,
  setFillColorHex,
  setTextColorHex,
  setDrawColorHex,
  cropImageCover
} from './pdfComponents';

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
 * Main PDF presentation builder and downloader.
 */
export const generatePDF = async (
  data: AllSlides,
  setIsGenerating?: (isGenerating: boolean) => void
) => {
  if (setIsGenerating) setIsGenerating(true);

  try {
    // 1. Initialize jsPDF Document (Widescreen 16:9 in inches)
    const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [13.33, 7.5] });

    // 2. Pre-resolve all slide base64 graphics in parallel
    const images = await resolveAllImages(data);
    const logoData = images.slideContactLogo || images.slide1Logo;
    const companyName = data.slideContact.companyName || data.slide1.companyName || 'Aesthetic Arc';
    const cityName = data.slide2.cityName || 'AHMEDABAD';
    const website = data.slideContact.website || 'www.aestheticarc.com';

    const { colors, layout } = PPT_THEME;

    // ==================== SLIDE 1: COVER PAGE ====================
    const themeColor = data.slide1.themeColor || '#4B247A';
    const fontColor = data.slide1.fontColor || '#FFFFFF';
    
    setFillColorHex(doc, themeColor);
    doc.rect(0, 0, 13.33, 7.5, 'F');

    // Right-side cover visual
    if (images.slide1Bg && isValidBase64(images.slide1Bg)) {
      try {
        const croppedBg = await cropImageCover(images.slide1Bg, 6.63, 7.5);
        doc.addImage(croppedBg, 'JPEG', 6.7, 0, 6.63, 7.5);
      } catch (err) {
        doc.addImage(images.slide1Bg, 'JPEG', 6.7, 0, 6.63, 7.5);
      }
    }

    // Cover Page content (Left aligned)
    addPDFText(doc, data.slide1.slideNumber || '', 0.6, 0.5, 1.0, 0.5, {
      fontSize: 16, bold: true, color: fontColor
    });
    addPDFText(doc, data.slide1.title || '', 0.6, 1.4, 5.6, 1.6, {
      fontSize: 36, bold: true, color: fontColor, lineSpacing: 1.1
    });
    addPDFText(doc, data.slide1.subtitle || '', 0.6, 3.1, 5.6, 0.5, {
      fontSize: 14, bold: true, color: colors.accent
    });
    addPDFText(doc, data.slide1.address || '', 0.6, 3.7, 5.6, 0.6, {
      fontSize: 10, color: fontColor
    });

    addPDFText(doc, 'Presented by', 0.6, 4.4, 5.0, 0.3, {
      fontSize: 9.5, color: fontColor, transparency: 45
    });

    // Company logo + details
    if (images.slide1Logo && isValidBase64(images.slide1Logo)) {
      doc.addImage(images.slide1Logo, 'JPEG', 0.6, 4.7, 0.5, 0.5);
      addPDFText(doc, data.slide1.companyName || '', 1.2, 4.7, 4.0, 0.3, {
        fontSize: 13, bold: true, color: fontColor
      });
      addPDFText(doc, data.slide1.companyTagline || '', 1.2, 5.0, 4.0, 0.25, {
        fontSize: 8.5, color: fontColor, transparency: 45
      });
    } else {
      addPDFText(doc, data.slide1.companyName || '', 0.6, 4.7, 4.0, 0.3, {
        fontSize: 13, bold: true, color: fontColor
      });
      addPDFText(doc, data.slide1.companyTagline || '', 0.6, 5.0, 4.0, 0.25, {
        fontSize: 8.5, color: fontColor, transparency: 45
      });
    }

    // Dynamic cover page bottom category row
    let selectedCats1 = (data.slide1.selectedCategories || []).map(id =>
      PREDEFINED_CATEGORIES.find(c => c.id === id)
    ).filter(Boolean) as typeof PREDEFINED_CATEGORIES;

    // Fallback to the 10 reference design categories if none selected
    if (selectedCats1.length === 0) {
      selectedCats1 = [
        { id: 'cat_8', name: 'Fashion', emoji: '👕' },
        { id: 'cat_8', name: 'Retail', emoji: '🛍️' },
        { id: 'cat_11', name: 'Lifestyle', emoji: '🌿' },
        { id: 'cat_9', name: 'F&B', emoji: '🍽️' },
        { id: 'cat_14', name: 'Electronics', emoji: '💻' },
        { id: 'cat_8', name: 'Hypermarket', emoji: '🛒' },
        { id: 'cat_10', name: 'Corporate Offices', emoji: '💼' },
        { id: 'cat_13', name: 'Health & Wellness', emoji: '❤️' },
        { id: 'cat_12', name: 'Multiplex', emoji: '🎬' },
        { id: 'cat_12', name: 'Game Zone', emoji: '🎮' }
      ];
    }

    const maxCats = Math.min(selectedCats1.length, 10);
    const catCardGap = 0.08;
    const totalGapW = (maxCats - 1) * catCardGap;
    const totalAvailW = 12.13; // 13.33 - 1.2 margins
    const catCardW = (totalAvailW - totalGapW) / maxCats;
    const catCardH = 0.65;
    const cardY = 6.25;

    for (let idx = 0; idx < maxCats; idx++) {
      const cat = selectedCats1[idx];
      const cardX = 0.6 + idx * (catCardW + catCardGap);

      // Draw glassmorphism card background
      try {
        doc.saveGraphicsState();
        const GStateClass = (doc as any).GState;
        const gState = new GStateClass({ opacity: 0.1 });
        doc.setGState(gState);
        setFillColorHex(doc, fontColor);
        doc.roundedRect(cardX, cardY, catCardW, catCardH, 0.05, 0.05, 'F');
        doc.restoreGraphicsState();
      } catch {
        setFillColorHex(doc, '#ffffff1a');
        doc.roundedRect(cardX, cardY, catCardW, catCardH, 0.05, 0.05, 'F');
      }

      // Draw light border
      try {
        doc.saveGraphicsState();
        const GStateClass = (doc as any).GState;
        const gState = new GStateClass({ opacity: 0.15 });
        doc.setGState(gState);
        setDrawColorHex(doc, fontColor);
        doc.setLineWidth(0.008);
        doc.roundedRect(cardX, cardY, catCardW, catCardH, 0.05, 0.05, 'S');
        doc.restoreGraphicsState();
      } catch {
        setDrawColorHex(doc, '#ffffff26');
        doc.roundedRect(cardX, cardY, catCardW, catCardH, 0.05, 0.05, 'S');
      }

      // Draw emoji
      doc.setFontSize(11);
      doc.text(cat.emoji, cardX + catCardW / 2, cardY + 0.11, { align: 'center', baseline: 'top' });

      // Draw label
      addPDFText(doc, cat.name.toUpperCase(), cardX + 0.04, cardY + 0.38, catCardW - 0.08, 0.25, {
        fontSize: 5.5,
        bold: true,
        color: fontColor,
        align: 'center'
      });
    }

    // ==================== SLIDE 2: CITY AT A GLANCE ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, 'City Context', 'AT A GLANCE', '02');

    // Left Column stats layout
    addPDFText(doc, 'A Thriving City. A Growing Opportunity.', layout.split.leftCol.x, 1.45, layout.split.leftCol.w, 0.3, {
      fontSize: 10.5, bold: true, color: colors.textMuted
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
      addPDFStatCard(doc, statX, statY, statW, statH, stat.value, stat.label, stat.highlight);
    });

    // Infrastructure list
    const infraLines = (data.slide2.infrastructure || '').split('\n').filter(Boolean);
    if (infraLines.length > 0) {
      addPDFText(doc, 'UPCOMING INFRASTRUCTURE', layout.split.leftCol.x, 4.8, layout.split.leftCol.w, 0.3, {
        fontSize: 9.5, bold: true, color: colors.primary
      });

      const half = Math.ceil(infraLines.length / 2);
      infraLines.forEach((line, idx) => {
        const col = idx < half ? 0 : 1;
        const row = idx < half ? idx : idx - half;
        addPDFText(doc, `•  ${line}`, layout.split.leftCol.x + col * 2.85, 5.15 + row * 0.32, 2.7, 0.28, {
          fontSize: 8.5, color: colors.textDark
        });
      });
    }

    // Right Column visual
    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide2City, 'Cityscape Context');
    addPDFFooter(doc, '02', logoData, companyName, cityName, website);

    // ==================== SLIDE 3: PREMIUM LOCATION ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, 'Premium Location', 'THAT CONNECTS EVERYTHING', '03');

    // Left Column Image
    await addPDFImageBlock(doc, layout.split.leftImageCol.x, layout.split.leftImageCol.y, layout.split.leftImageCol.w, layout.split.leftImageCol.h, images.slide3Map, 'Neighborhood Location Map');

    // Right Column text details
    const rightTextX = layout.split.rightTextCol.x;
    addPDFText(doc, data.slide3.address || '', rightTextX, 1.45, layout.split.rightTextCol.w, 0.35, {
      fontSize: 11, bold: true, color: colors.primary
    });

    const locationHighlights = [
      { label: data.slide3.point1Title || 'SG Highway', desc: data.slide3.point1Desc || '' },
      { label: data.slide3.point2Title || 'Access', desc: data.slide3.point2Desc || '' },
      { label: data.slide3.point3Title || 'Surroundings', desc: data.slide3.point3Desc || '' },
    ];

    for (let idx = 0; idx < locationHighlights.length; idx++) {
      const item = locationHighlights[idx];
      const cardY = 2.0 + idx * 1.5;
      addPDFCard(doc, rightTextX, cardY, layout.split.rightTextCol.w, 1.35, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.05
      });

      addPDFText(doc, item.label.toUpperCase(), rightTextX + 0.15, cardY + 0.1, layout.split.rightTextCol.w - 0.3, 0.25, {
        fontSize: 9, bold: true, color: colors.accent
      });

      addPDFText(doc, item.desc, rightTextX + 0.15, cardY + 0.35, layout.split.rightTextCol.w - 0.3, 0.9, {
        fontSize: 8.5, color: colors.textDark
      });
    }

    addPDFFooter(doc, '03', logoData, companyName, cityName, website);

    // ==================== SLIDE 4: PREMIUM PLOT FEATURES ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, 'Premium Corner Plot', 'WITH MAXIMUM VISIBILITY', '04');

    // Left Column details
    const features4 = [
      { num: '01', title: data.slide4.feature1Title || '', desc: data.slide4.feature1Desc || '' },
      { num: '02', title: data.slide4.feature2Title || '', desc: data.slide4.feature2Desc || '' },
      { num: '03', title: data.slide4.feature3Title || '', desc: data.slide4.feature3Desc || '' },
    ];

    features4.forEach((f, idx) => {
      const itemY = 1.45 + idx * 1.35;
      addPDFText(doc, f.num, layout.split.leftCol.x, itemY, 0.5, 0.4, {
        fontSize: 16, bold: true, color: colors.accent
      });
      addPDFText(doc, f.title, layout.split.leftCol.x + 0.6, itemY - 0.05, layout.split.leftCol.w - 0.6, 0.25, {
        fontSize: 10.5, bold: true, color: colors.primary
      });
      addPDFText(doc, f.desc, layout.split.leftCol.x + 0.6, itemY + 0.2, layout.split.leftCol.w - 0.6, 0.9, {
        fontSize: 8.5, color: colors.textDark
      });
    });

    // Milestone / Possession Card at the bottom left
    const possessionY = 5.7;
    addPDFCard(doc, layout.split.leftCol.x, possessionY, layout.split.leftCol.w, 0.75, {
      fillColor: colors.primary,
      borderColor: colors.primary,
      radius: 0.06
    });
    addPDFText(doc, (data.slide4.possessionLabel || 'EXPECTED POSSESSION').toUpperCase(), layout.split.leftCol.x + 0.2, possessionY + 0.1, layout.split.leftCol.w - 0.4, 0.25, {
      fontSize: 8, bold: true, color: colors.accent
    });
    addPDFText(doc, data.slide4.possessionDate || 'March 2027', layout.split.leftCol.x + 0.2, possessionY + 0.35, layout.split.leftCol.w - 0.4, 0.3, {
      fontSize: 12, bold: true, color: colors.textLight
    });

    // Right Column visual
    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide4Project, 'Architectural Render');
    addPDFFooter(doc, '04', logoData, companyName, cityName, website);

    // ==================== SLIDE 5: CONSTRUCTION UPDATE ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, 'Construction Progress', 'DEVELOPMENT MILESTONES', '05');

    // Left Column progress detail list
    const milestones = [
      { label: data.slide5.progress1Title || 'Foundation', val: data.slide5.progress1Status || '' },
      { label: data.slide5.progress2Title || 'Structure', val: data.slide5.progress2Status || '' },
      { label: data.slide5.progress3Title || 'Finishing', val: data.slide5.progress3Status || '' },
      { label: data.slide5.progress4Title || 'Possession', val: data.slide5.progress4Status || '' },
    ];

    milestones.forEach((m, idx) => {
      const cardY = 1.45 + idx * 1.05;
      const isDone = m.val.toLowerCase().includes('complete');
      const accent = isDone ? colors.primary : colors.accent;

      addPDFCard(doc, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 0.9, {
        fillColor: colors.bg,
        borderColor: isDone ? colors.border : colors.primary,
        radius: 0.05
      });

      // Accent border bar
      setFillColorHex(doc, accent);
      doc.rect(layout.split.leftCol.x, cardY, 0.08, 0.9, 'F');

      addPDFText(doc, m.label.toUpperCase(), layout.split.leftCol.x + 0.25, cardY + 0.3, 3.5, 0.4, {
        fontSize: 10.5, bold: true, color: colors.primary
      });

      addPDFText(doc, m.val.toUpperCase(), layout.split.leftCol.x + layout.split.leftCol.w - 1.6, cardY + 0.3, 1.4, 0.4, {
        fontSize: 9.5, bold: true, color: accent, align: 'right'
      });
    });

    const snapshotText = data.slide5.currentStatus ? `Last updated snapshot: ${data.slide5.currentStatus}` : '';
    addPDFText(doc, snapshotText, layout.split.leftCol.x, 6.0, layout.split.leftCol.w, 0.35, {
      fontSize: 8.5, color: colors.textMuted
    });

    // Right Column visual
    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide5Construction, 'Site Construction Photo');
    addPDFFooter(doc, '05', logoData, companyName, cityName, website);

    // ==================== SLIDE: SITE VISIBILITY ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slideSiteVisibility.title || 'Site Visibility', data.slideSiteVisibility.subtitle || 'EXCELLENT FRONTAGE & ACCESS', '06');

    const views = [
      { label: 'LEFT VIEW', image: images.slideSiteVisibilityLeft },
      { label: 'FRONT VIEW', image: images.slideSiteVisibilityFront },
      { label: 'RIGHT VIEW', image: images.slideSiteVisibilityRight },
    ];

    for (let idx = 0; idx < views.length; idx++) {
      const item = views[idx];
      const cardW = 3.8;
      const cardH = 4.5;
      const cardX = 0.6 + idx * 4.16;
      const cardY = 1.7;

      addPDFCard(doc, cardX, cardY, cardW, cardH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06
      });

      const frameH = 3.4;
      await addPDFImageBlock(doc, cardX, cardY, cardW, frameH, item.image, item.label);

      // Label block under image
      setFillColorHex(doc, colors.primary);
      doc.rect(cardX, cardY + frameH, cardW, 1.1, 'F');
      
      addPDFText(doc, item.label, cardX, cardY + frameH + 0.38, cardW, 0.4, {
        fontSize: 10, bold: true, color: colors.textLight, align: 'center'
      });
    }

    addPDFFooter(doc, '06', logoData, companyName, cityName, website);

    // ==================== SLIDE 6: GROUND FLOOR PLAN ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slide6.title || 'Ground Floor Plan', data.slide6.subtitle || 'RETAIL SPACES', '07');

    const features6 = [
      { label: data.slide6.floorHeightLabel || 'Floor Height', val: data.slide6.floorHeightValue || "12'5\"" },
      { label: data.slide6.frontageLabel || 'Frontage', val: data.slide6.frontageValue || "20' to 35'" },
      { label: data.slide6.parkingLabel || 'Parking', val: data.slide6.parkingValue || 'Ample Parking' },
      { label: data.slide6.roadAccessLabel || 'Road Access', val: data.slide6.roadAccessValue || '30 MT Wide Road' },
    ];

    features6.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addPDFCard(doc, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05
      });

      addPDFText(doc, item.label.toUpperCase(), layout.split.leftCol.x + 0.2, cardY + 0.15, layout.split.leftCol.w - 0.4, 0.25, {
        fontSize: 8, bold: true, color: colors.textMuted
      });

      addPDFText(doc, item.val, layout.split.leftCol.x + 0.2, cardY + 0.4, layout.split.leftCol.w - 0.4, 0.55, {
        fontSize: 11, bold: true, color: colors.primary
      });
    });

    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide6Plan, 'Ground Floor Plan Layout');
    addPDFFooter(doc, '07', logoData, companyName, cityName, website);

    // ==================== SLIDE: FIRST FLOOR PLAN ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slideFirstFloorPlan.title || 'First Floor Plan', data.slideFirstFloorPlan.subtitle || 'RETAIL SPACES', '08');

    const featuresFirst = [
      { label: data.slideFirstFloorPlan.feature1Title || 'Floor Height', val: data.slideFirstFloorPlan.feature1Desc || '10\'5"' },
      { label: data.slideFirstFloorPlan.feature2Title || 'Frontage', val: data.slideFirstFloorPlan.feature2Desc || '18\' to 28\'' },
      { label: data.slideFirstFloorPlan.feature3Title || 'Parking', val: data.slideFirstFloorPlan.feature3Desc || 'Ample' },
      { label: data.slideFirstFloorPlan.feature4Title || 'Escalator & Lift', val: data.slideFirstFloorPlan.feature4Desc || 'For Easy Access' },
    ];

    featuresFirst.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addPDFCard(doc, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05
      });

      addPDFText(doc, item.label.toUpperCase(), layout.split.leftCol.x + 0.2, cardY + 0.15, layout.split.leftCol.w - 0.4, 0.25, {
        fontSize: 8, bold: true, color: colors.textMuted
      });

      addPDFText(doc, item.val, layout.split.leftCol.x + 0.2, cardY + 0.4, layout.split.leftCol.w - 0.4, 0.55, {
        fontSize: 11, bold: true, color: colors.primary
      });
    });

    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slideFirstFloorPlan, 'First Floor Plan Layout');
    addPDFFooter(doc, '08', logoData, companyName, cityName, website);

    // ==================== SLIDE 7: SECOND FLOOR PLAN ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slide7.title || 'Second Floor Plan', data.slide7.subtitle || 'RETAIL / OFFICE SPACES', '09');

    const features7 = [
      { label: data.slide7.floorHeightLabel || 'Floor Height', val: data.slide7.floorHeightValue || "9'5\"" },
      { label: data.slide7.bestForLabel || 'Best for', val: data.slide7.bestForValue || 'F&B / Lifestyle / Offices' },
      { label: data.slide7.terraceLabel || 'Open Terrace', val: data.slide7.terraceValue || 'Provision' },
      { label: data.slide7.liftStaircaseLabel || 'Lift & Staircase', val: data.slide7.liftStaircaseValue || 'Access' },
    ];

    features7.forEach((item, idx) => {
      const cardY = 1.45 + idx * 1.25;
      addPDFCard(doc, layout.split.leftCol.x, cardY, layout.split.leftCol.w, 1.1, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05
      });

      addPDFText(doc, item.label.toUpperCase(), layout.split.leftCol.x + 0.2, cardY + 0.15, layout.split.leftCol.w - 0.4, 0.25, {
        fontSize: 8, bold: true, color: colors.textMuted
      });

      addPDFText(doc, item.val, layout.split.leftCol.x + 0.2, cardY + 0.4, layout.split.leftCol.w - 0.4, 0.55, {
        fontSize: 11, bold: true, color: colors.primary
      });
    });

    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide7Plan, 'Second Floor Plan Layout');
    addPDFFooter(doc, '09', logoData, companyName, cityName, website);

    // ==================== SLIDE: NEARBY COMMERCIAL ECOSYSTEM ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slideNearbyCommercial.title || 'Commercial Ecosystem', data.slideNearbyCommercial.subtitle || 'NEARBY DEVELOPMENTS', '10');

    await addPDFImageBlock(doc, layout.split.leftCol.x, layout.split.leftCol.y, layout.split.leftCol.w, layout.split.leftCol.h, images.slideNearbyCommercialEcosystem, 'Neighborhood Map Context');

    // Grid of 8 buildings
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

      addPDFCard(doc, cardX, cardY, gridCardW, gridCardH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06
      });

      const frameHeight = 1.35;
      if (b.image && isValidBase64(b.image)) {
        try {
          const croppedB = await cropImageCover(b.image, gridCardW, frameHeight);
          doc.addImage(croppedB, 'JPEG', cardX, cardY, gridCardW, frameHeight);
        } catch {
          doc.addImage(b.image, 'JPEG', cardX, cardY, gridCardW, frameHeight);
        }
      } else {
        setFillColorHex(doc, colors.accentBg);
        doc.rect(cardX, cardY, gridCardW, frameHeight, 'F');
        doc.setFontSize(20);
        doc.text('🏢', cardX + gridCardW / 2, cardY + 0.6, { align: 'center', baseline: 'top' });
      }

      // Label background
      setFillColorHex(doc, colors.primary);
      doc.rect(cardX, cardY + frameHeight - 0.25, gridCardW, 0.25, 'F');
      
      addPDFText(doc, b.name.toUpperCase(), cardX, cardY + frameHeight - 0.2, gridCardW, 0.25, {
        fontSize: 6.5, bold: true, color: colors.textLight, align: 'center'
      });

      // Distance tag
      addPDFText(doc, b.distance, cardX, cardY + frameHeight + 0.35, gridCardW, gridCardH - frameHeight, {
        fontSize: 10, bold: true, color: colors.accent, align: 'center'
      });
    }

    addPDFFooter(doc, '10', logoData, companyName, cityName, website);

    // ==================== SLIDE 8: BRAND LOCATION MAP ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slide8.title || 'Brand Location Map', data.slide8.subtitle || 'BE IN THE COMPANY OF THE BEST', '11');

    await addPDFImageBlock(doc, layout.fullWidthContent.x, layout.fullWidthContent.y, layout.fullWidthContent.w, layout.fullWidthContent.h, images.slide8Map, 'Brand Context Neighborhood Map');
    addPDFFooter(doc, '11', logoData, companyName, cityName, website);

    // ==================== SLIDE 9: LIFESTYLE AROUND YOU ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slide9.title || 'Lifestyle Catchment', data.slide9.subtitle || 'EVERYTHING NEARBY', '12');

    const lifestyleCategories = [
      { label: data.slide9.label1 || 'Dining', image: images.slide9Img1 },
      { label: data.slide9.label2 || 'Shopping', image: images.slide9Img2 },
      { label: data.slide9.label3 || 'Fitness', image: images.slide9Img3 },
      { label: data.slide9.label4 || 'Entertainment', image: images.slide9Img4 },
      { label: data.slide9.label5 || 'Residential', image: images.slide9Img5 },
    ];

    for (let idx = 0; idx < lifestyleCategories.length; idx++) {
      const item = lifestyleCategories[idx];
      const colW = 2.15;
      const colH = 4.6;
      const colX = 0.6 + idx * 2.495;
      const colY = 1.6;

      addPDFCard(doc, colX, colY, colW, colH, {
        fillColor: colors.bg,
        borderColor: colors.border,
        radius: 0.06
      });

      const photoH = 3.6;
      await addPDFImageBlock(doc, colX, colY, colW, photoH, item.image, item.label);

      setFillColorHex(doc, colors.primary);
      doc.rect(colX, colY + photoH, colW, colH - photoH, 'F');

      addPDFText(doc, item.label.toUpperCase(), colX, colY + photoH + 0.3, colW, colH - photoH, {
        fontSize: 9.5, bold: true, color: colors.textLight, align: 'center'
      });
    }

    addPDFFooter(doc, '12', logoData, companyName, cityName, website);

    // ==================== SLIDE 10: PROPERTY SPECIFICATIONS ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.bg);
    doc.rect(0, 0, 13.33, 7.5, 'F');
    addPDFHeader(doc, data.slide10.title || 'Specifications', 'PROPERTY BENCHMARKS', '13');

    const col1 = [
      { label: 'Project Type', val: data.slide10.spec1Value || 'Commercial' },
      { label: 'Location Context', val: data.slide10.spec2Value || '' },
      { label: 'Jeweller Brands nearby', val: data.slide10.spec3Value || '' },
      { label: 'Apparel Brands nearby', val: data.slide10.spec4Value || '' },
      { label: 'F&B Outlets nearby', val: data.slide10.spec5Value || '' },
    ];

    const col2 = [
      { label: 'Ground Floor Height', val: data.slide10.spec6Value || '' },
      { label: 'First Floor Height', val: data.slide10.spec7Value || '' },
      { label: 'Second Floor Height', val: data.slide10.spec8Value || '' },
      { label: 'Possession Date', val: data.slide10.spec9Value || '' },
    ];

    col1.forEach((item, idx) => {
      const itemY = 1.45 + idx * 1.05;
      addPDFCard(doc, 0.6, itemY, 5.8, 0.9, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05
      });
      addPDFText(doc, item.label.toUpperCase(), 0.8, itemY + 0.1, 5.4, 0.25, {
        fontSize: 7.5, bold: true, color: colors.textMuted
      });
      addPDFText(doc, item.val, 0.8, itemY + 0.32, 5.4, 0.5, {
        fontSize: 9.5, bold: true, color: colors.primary
      });
    });

    col2.forEach((item, idx) => {
      const itemY = 1.45 + idx * 1.05;
      addPDFCard(doc, 6.9, itemY, 5.8, 0.9, {
        fillColor: colors.accentBg,
        borderColor: colors.border,
        radius: 0.05
      });
      addPDFText(doc, item.label.toUpperCase(), 7.1, itemY + 0.1, 5.4, 0.25, {
        fontSize: 7.5, bold: true, color: colors.textMuted
      });
      addPDFText(doc, item.val, 7.1, itemY + 0.32, 5.4, 0.5, {
        fontSize: 9.5, bold: true, color: colors.primary
      });
    });

    // QR Code / Maps Block in Col 2 bottom row
    const qrY = 5.65;
    addPDFCard(doc, 6.9, qrY, 5.8, 1.1, {
      fillColor: colors.primary,
      borderColor: colors.primary,
      radius: 0.05
    });

    const qrSrc = images.slide10Qr || (data.slide10.qrUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.slide10.qrUrl)}` : '');

    if (qrSrc && isValidBase64(qrSrc)) {
      doc.addImage(qrSrc, 'JPEG', 7.05, qrY + 0.1, 0.9, 0.9);
      addPDFText(doc, data.slide10.spec10Value || 'Scan QR Code', 8.1, qrY + 0.25, 4.4, 0.3, {
        fontSize: 12, bold: true, color: colors.textLight
      });
      addPDFText(doc, 'Scan for Google Maps Navigation context', 8.1, qrY + 0.55, 4.4, 0.3, {
        fontSize: 8.5, color: colors.textLight, transparency: 30
      });
    } else {
      addPDFText(doc, 'Google Maps Link Not Provided', 7.1, qrY + 0.4, 5.4, 0.3, {
        fontSize: 10, bold: true, color: colors.textLight, align: 'center'
      });
    }

    addPDFFooter(doc, '13', logoData, companyName, cityName, website);

    // ==================== SLIDE 11: INVESTMENT PROFILE ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.darkBgAccent);
    doc.rect(0, 0, 13.33, 7.5, 'F');

    // Navy header style
    setFillColorHex(doc, colors.primary);
    doc.rect(0.6, 0.5, 0.55, 0.5, 'F');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    setTextColorHex(doc, colors.textLight);
    doc.text('14', 0.6 + 0.275, 0.5 + 0.15, { align: 'center', baseline: 'top' });

    addPDFText(doc, 'WHY INVEST IN', 1.25, 0.45, 6.0, 0.3, {
      fontSize: 16, bold: true, color: colors.textLight
    });
    addPDFText(doc, (data.slide11.title || '').toUpperCase(), 1.25, 0.75, 6.0, 0.45, {
      fontSize: 18, bold: true, color: colors.textLight
    });
    
    // Header line
    setFillColorHex(doc, colors.primary);
    doc.rect(1.25, 1.25, 1.2, 0.04, 'F');

    // Right Column visual
    await addPDFImageBlock(doc, layout.split.rightCol.x, layout.split.rightCol.y, layout.split.rightCol.w, layout.split.rightCol.h, images.slide11Building, 'Development Render');

    // Category circles
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

      addPDFCard(doc, circleX, circleY, circleW, circleH, {
        fillColor: '#120D24',
        borderColor: colors.primary,
        borderWidth: 1.5,
        radius: 0.1
      });

      // Emoji/Icon
      doc.setFontSize(18);
      doc.text(cat.emoji, circleX + circleW / 2, circleY + 0.25, { align: 'center', baseline: 'top' });

      // Label below
      addPDFText(doc, cat.name.toUpperCase(), circleX + 0.05, circleY + 0.75, circleW - 0.1, 0.6, {
        fontSize: 7, bold: true, color: colors.textLight, align: 'center'
      });
    });

    addPDFFooter(doc, '14', logoData, companyName, cityName, website, true);

    // ==================== SLIDE 12: CONTACT SLIDE ====================
    doc.addPage([13.33, 7.5], 'l');
    setFillColorHex(doc, colors.darkBgAccent);
    doc.rect(0, 0, 13.33, 7.5, 'F');

    setFillColorHex(doc, colors.accent);
    doc.rect(0.6, 1.2, 2.0, 0.05, 'F');

    addPDFText(doc, (data.slideContact.heading || 'Let\'s build\nsomething iconic\ntogether').toUpperCase(), 0.6, 1.5, 6.0, 1.8, {
      fontSize: 32, bold: true, color: colors.textLight, lineSpacing: 1.1
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
      doc.setFontSize(12);
      doc.text(item.icon, 0.6, itemY + 0.05, { baseline: 'top' });
      addPDFText(doc, item.text, 1.1, itemY, 5.0, 0.4, {
        fontSize: 9.5, color: colors.textLight
      });
    });

    const brandX = 7.5;
    const brandY = 2.5;

    if (images.slideContactLogo && isValidBase64(images.slideContactLogo)) {
      doc.addImage(images.slideContactLogo, 'JPEG', brandX, brandY, 1.1, 1.1);
      addPDFText(doc, data.slideContact.companyName || '', brandX, brandY + 1.35, 5.0, 0.4, {
        fontSize: 22, bold: true, color: colors.textLight
      });
      addPDFText(doc, data.slideContact.companyTagline || '', brandX, brandY + 1.8, 5.0, 0.3, {
        fontSize: 10.5, color: colors.accent
      });
    } else {
      addPDFText(doc, data.slideContact.companyName || '', brandX, brandY, 5.0, 0.4, {
        fontSize: 22, bold: true, color: colors.textLight
      });
      addPDFText(doc, data.slideContact.companyTagline || '', brandX, brandY + 0.45, 5.0, 0.3, {
        fontSize: 10.5, color: colors.accent
      });
    }

    addPDFFooter(doc, '15', logoData, companyName, cityName, website, true);

    // 3. Save Document to Trigger Browser Download
    const fileName = `${data.slide1.companyName || 'Presentation'}_Marketing_Deck.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error('Error generating PDF presentation:', error);
    throw error;
  } finally {
    if (setIsGenerating) setIsGenerating(false);
  }
};
