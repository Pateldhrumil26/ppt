import { PPT_THEME } from '../ppt/pptLayoutConfig';

// Helper to mix colors for opacity/transparency simulations
const getThemedColor = (hex: string, opacity: number) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const nr = Math.round(r * opacity + 255 * (1 - opacity));
  const ng = Math.round(g * opacity + 255 * (1 - opacity));
  const nb = Math.round(b * opacity + 255 * (1 - opacity));

  return '#' + nr.toString(16).padStart(2, '0') + ng.toString(16).padStart(2, '0') + nb.toString(16).padStart(2, '0');
};

export const setFillColorHex = (doc: any, hex: string) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  doc.setFillColor(r, g, b);
};

export const setTextColorHex = (doc: any, hex: string) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  doc.setTextColor(r, g, b);
};

export const setDrawColorHex = (doc: any, hex: string) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  doc.setDrawColor(r, g, b);
};

/**
 * Image cropping helper to achieve perfect "cover" sizing inside jsPDF.
 * Crops the center portion of the base64 source image to match the container's aspect ratio.
 */
export const cropImageCover = (
  base64: string,
  w: number,
  h: number
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(w * 150);
      canvas.height = Math.round(h * 150);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const targetRatio = canvas.width / canvas.height;
        const sourceRatio = img.width / img.height;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;

        if (sourceRatio > targetRatio) {
          sw = img.height * targetRatio;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / targetRatio;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } else {
        resolve(base64);
      }
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
};

/**
 * Standardized PDF text drawing function that handles multiline wrapping and custom typography weights.
 */
export const addPDFText = (
  doc: any,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  options: {
    fontSize?: number;
    color?: string;
    bold?: boolean;
    align?: 'left' | 'center' | 'right';
    lineSpacing?: number;
    transparency?: number;
  } = {}
) => {
  if (!text) return;
  const size = options.fontSize || 10;
  doc.setFontSize(size);

  const fontStyle = options.bold ? 'bold' : 'normal';
  doc.setFont('helvetica', fontStyle);

  const cleanText = text.replace(/\\n/g, '\n').replace(/\n/g, '\n');
  const baseColor = options.color || '#1E293B';
  const finalColor = options.transparency
    ? getThemedColor(baseColor, (100 - options.transparency) / 100)
    : baseColor;

  setTextColorHex(doc, finalColor);

  let targetX = x;
  if (options.align === 'center') {
    targetX = x + w / 2;
  } else if (options.align === 'right') {
    targetX = x + w;
  }

  doc.text(cleanText, targetX, y, {
    maxWidth: w,
    align: options.align || 'left',
    baseline: 'top',
    lineHeightFactor: options.lineSpacing || 1.15
  });
};

/**
 * Standard header component for PDF slides.
 */
export const addPDFHeader = (
  doc: any,
  title: string,
  subtitle: string,
  slideNum: string
) => {
  const { colors, layout } = PPT_THEME;

  if (slideNum) {
    setFillColorHex(doc, colors.primary);
    doc.rect(layout.header.x, layout.header.y, 0.55, 0.5, 'F');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    setTextColorHex(doc, colors.textLight);
    doc.text(slideNum, layout.header.x + 0.275, layout.header.y + 0.15, {
      align: 'center',
      baseline: 'top'
    });
  }

  const titleX = slideNum ? layout.header.x + 0.65 : layout.header.x;
  addPDFText(doc, title.toUpperCase(), titleX, layout.header.y, layout.header.w - 0.7, 0.4, {
    fontSize: 18,
    bold: true,
    color: colors.primary
  });

  addPDFText(doc, subtitle.toUpperCase(), titleX, layout.header.y + 0.35, layout.header.w - 0.7, 0.3, {
    fontSize: 10,
    bold: true,
    color: colors.accent
  });

  setDrawColorHex(doc, colors.divider);
  doc.setLineWidth(0.015);
  doc.line(layout.header.x, layout.header.y + 0.75, layout.header.x + layout.header.w, layout.header.y + 0.75);
};

/**
 * Standard container card drawing component.
 */
export const addPDFCard = (
  doc: any,
  x: number,
  y: number,
  w: number,
  h: number,
  options: {
    fillColor?: string;
    borderColor?: string;
    borderWidth?: number;
    radius?: number;
  } = {}
) => {
  const { colors } = PPT_THEME;
  const fColor = options.fillColor || colors.bg;
  const bColor = options.borderColor || colors.border;
  const bWidth = options.borderWidth !== undefined ? options.borderWidth / 72 : 0.01;
  const rad = options.radius !== undefined ? options.radius : 0.05;

  setFillColorHex(doc, fColor);
  setDrawColorHex(doc, bColor);
  doc.setLineWidth(bWidth);
  doc.roundedRect(x, y, w, h, rad, rad, 'FD');
};

/**
 * Render image block with auto-crop cover logic or draw placeholder.
 */
export const addPDFImageBlock = async (
  doc: any,
  x: number,
  y: number,
  w: number,
  h: number,
  base64Data: string | null,
  label: string
) => {
  const { colors } = PPT_THEME;

  if (base64Data && base64Data.startsWith('data:image/')) {
    try {
      const cropped = await cropImageCover(base64Data, w, h);
      doc.addImage(cropped, 'JPEG', x, y, w, h);
    } catch (err) {
      console.error('Crop failed, falling back to stretch:', err);
      doc.addImage(base64Data, 'JPEG', x, y, w, h);
    }
  } else {
    addPDFCard(doc, x, y, w, h, {
      fillColor: colors.accentBg,
      borderColor: colors.primary,
      borderWidth: 1.5,
      radius: 0.06
    });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    setTextColorHex(doc, colors.primary);
    doc.text('PHOTO', x + w / 2, y + h / 2 - 0.2, { align: 'center', baseline: 'middle' });

    addPDFText(doc, `MISSING PHOTO: ${label.toUpperCase()}`, x + 0.2, y + h / 2 + 0.15, w - 0.4, 0.3, {
      fontSize: 8.5,
      bold: true,
      color: colors.primary,
      align: 'center'
    });

    addPDFText(doc, 'Upload image to display here', x + 0.2, y + h / 2 + 0.38, w - 0.4, 0.25, {
      fontSize: 7.5,
      color: colors.textMuted,
      align: 'center'
    });
  }
};

/**
 * Standard key-value stat card drawing component.
 */
export const addPDFStatCard = (
  doc: any,
  x: number,
  y: number,
  w: number,
  h: number,
  value: string,
  label: string,
  highlight: boolean = false
) => {
  const { colors } = PPT_THEME;
  const bgColor = highlight ? colors.accentBg : colors.bg;
  const borderColor = highlight ? colors.primary : colors.border;

  addPDFCard(doc, x, y, w, h, {
    fillColor: bgColor,
    borderColor,
    radius: 0.05
  });

  addPDFText(doc, value, x + 0.08, y + 0.18, w - 0.16, 0.35, {
    fontSize: 11,
    bold: true,
    color: colors.primary
  });

  addPDFText(doc, label.toUpperCase(), x + 0.08, y + 0.58, w - 0.16, 0.4, {
    fontSize: 7,
    bold: true,
    color: colors.textMuted
  });
};

/**
 * Consistent branding footer component.
 */
export const addPDFFooter = (
  doc: any,
  slideNum: string,
  logoData: string | null,
  companyName: string,
  cityName: string,
  website: string,
  isDark: boolean = false
) => {
  const { colors, layout } = PPT_THEME;

  const lineColor = isDark ? '#4A455A' : colors.border;
  const primaryTextColor = isDark ? '#ffffff' : colors.textDark;
  const secondaryTextColor = isDark ? '#ffffff' : colors.textMuted;
  const textOpacity = isDark ? 40 : 0;

  setDrawColorHex(doc, lineColor);
  doc.setLineWidth(0.01);
  doc.line(layout.footer.x, layout.footer.y - 0.05, layout.footer.x + layout.footer.w, layout.footer.y - 0.05);

  if (logoData && logoData.startsWith('data:image/')) {
    doc.addImage(logoData, 'JPEG', layout.footer.x, layout.footer.y, 0.35, 0.35);
  } else {
    setFillColorHex(doc, isDark ? '#ffffff20' : colors.primary);
    doc.roundedRect(layout.footer.x, layout.footer.y, 0.35, 0.35, 0.04, 0.04, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setTextColorHex(doc, isDark ? '#ffffff' : colors.textLight);
    doc.text('A', layout.footer.x + 0.175, layout.footer.y + 0.1, { align: 'center', baseline: 'top' });
  }

  const brand = companyName || 'Aesthetic Arc';
  addPDFText(doc, brand, layout.footer.x + 0.45, layout.footer.y + 0.1, 2.3, 0.25, {
    fontSize: 8.5,
    bold: true,
    color: primaryTextColor,
    transparency: isDark ? 18 : 0
  });

  setDrawColorHex(doc, lineColor);
  doc.setLineWidth(0.01);
  doc.line(layout.footer.x + 2.5, layout.footer.y + 0.05, layout.footer.x + 2.5, layout.footer.y + 0.3);

  const city = (cityName || 'AHMEDABAD').toUpperCase();
  addPDFText(doc, city, layout.footer.x + 2.62, layout.footer.y + 0.1, 1.7, 0.25, {
    fontSize: 8.5,
    bold: true,
    color: secondaryTextColor,
    transparency: textOpacity
  });

  const web = (website || 'www.aestheticarc.com').toLowerCase();
  addPDFText(doc, web, layout.width / 2 - 2.0, layout.footer.y + 0.1, 4.0, 0.25, {
    fontSize: 8.5,
    color: secondaryTextColor,
    align: 'center',
    transparency: textOpacity
  });

  if (slideNum) {
    addPDFText(doc, slideNum, layout.width - layout.margins.right - 1.0, layout.footer.y + 0.1, 1.0, 0.25, {
      fontSize: 8.5,
      bold: true,
      color: primaryTextColor,
      align: 'right',
      transparency: isDark ? 18 : 0
    });
  }
};
