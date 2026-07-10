import { PPT_THEME } from './pptLayoutConfig';

// Helper to check if a string is a valid base64 data URL
const isValidBase64 = (str: any): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('data:image/') || str.length > 1000;
};

/**
 * Draws the consistent slide header containing the slide number badge, title, subtitle, and thin divider.
 */
export const addHeader = (
  slide: any,
  pptx: any,
  title: string,
  subtitle: string,
  slideNum: string
) => {
  const { colors, fonts, layout } = PPT_THEME;

  // 1. Category/Slide Number Badge
  if (slideNum) {
    slide.addText(slideNum, {
      x: layout.header.x,
      y: layout.header.y,
      w: 0.55,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: colors.textLight,
      fill: { color: colors.primary },
      align: 'center',
      valign: 'middle',
    });
  }

  // 2. Main Title Text
  const titleX = slideNum ? layout.header.x + 0.65 : layout.header.x;
  slide.addText(title.toUpperCase(), {
    x: titleX,
    y: layout.header.y - 0.05,
    w: layout.header.w - 0.7,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: colors.primary,
    fontFace: fonts.header,
  });

  // 3. Subtitle Text
  slide.addText(subtitle.toUpperCase(), {
    x: titleX,
    y: layout.header.y + 0.35,
    w: layout.header.w - 0.7,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: colors.accent,
    fontFace: fonts.header,
  });

  // 4. Subtle horizontal divider line
  slide.addShape(pptx.ShapeType.rect, {
    x: layout.header.x,
    y: layout.header.y + 0.75,
    w: layout.header.w,
    h: 0.015,
    fill: { color: colors.divider },
    line: { type: 'none' },
  });
};

/**
 * Draws the consistent slide footer containing the Aesthetic Arc logo, company name,
 * city name, website, and page number.
 */
export const addFooter = (
  slide: any,
  pptx: any,
  slideNum: string,
  logoData: string | null,
  companyName: string,
  cityName: string,
  website: string,
  isDark: boolean = false
) => {
  const { colors, fonts, layout } = PPT_THEME;
  const dividerColor = isDark ? '4A455A' : colors.border;
  const primaryTextColor = isDark ? colors.textLight : colors.textDark;
  const secondaryTextColor = isDark ? colors.textLight : colors.textMuted;
  const secondaryTransparency = isDark ? 38 : 0;

  slide.addShape(pptx.ShapeType.rect, {
    x: layout.footer.x,
    y: layout.footer.y - 0.08,
    w: layout.footer.w,
    h: 0.01,
    fill: { color: dividerColor },
    line: { type: 'none' },
  });

  if (logoData && isValidBase64(logoData)) {
    slide.addImage({
      data: logoData,
      x: layout.footer.x,
      y: layout.footer.y,
      w: 0.35,
      h: 0.35,
      sizing: { type: 'contain', w: 0.35, h: 0.35 },
    });
  } else {
    slide.addShape(pptx.ShapeType.rect, {
      x: layout.footer.x,
      y: layout.footer.y,
      w: 0.35,
      h: 0.35,
      fill: { color: isDark ? 'ffffff' : colors.primary, transparency: isDark ? 82 : 0 },
      line: { type: 'none' },
      rectRadius: 0.04,
    });
    slide.addText('A', {
      x: layout.footer.x,
      y: layout.footer.y,
      w: 0.35,
      h: 0.35,
      fontSize: 10,
      bold: true,
      color: colors.textLight,
      align: 'center',
      valign: 'middle',
    });
  }

  const formattedCompany = companyName || 'Aesthetic Arc';
  const formattedCity = (cityName || 'AHMEDABAD').toUpperCase();

  slide.addText(formattedCompany, {
    x: layout.footer.x + 0.45,
    y: layout.footer.y,
    w: 2.3,
    h: 0.35,
    fontSize: 8.5,
    bold: true,
    color: primaryTextColor,
    transparency: isDark ? 18 : 0,
    fontFace: fonts.body,
    valign: 'middle',
    fit: 'shrink',
  });

  slide.addShape(pptx.ShapeType.line, {
    x: layout.footer.x + 2.45,
    y: layout.footer.y + 0.06,
    w: 0,
    h: 0.23,
    line: {
      color: dividerColor,
      width: 1,
    },
  });

  slide.addText(formattedCity, {
    x: layout.footer.x + 2.57,
    y: layout.footer.y,
    w: 1.7,
    h: 0.35,
    fontSize: 8.5,
    bold: true,
    color: secondaryTextColor,
    transparency: secondaryTransparency,
    fontFace: fonts.body,
    valign: 'middle',
    fit: 'shrink',
  });

  const webLink = website || 'www.aestheticarc.com';
  slide.addText(webLink.toLowerCase(), {
    x: layout.width / 2 - 2.0,
    y: layout.footer.y,
    w: 4.0,
    h: 0.35,
    fontSize: 8.5,
    color: secondaryTextColor,
    transparency: secondaryTransparency,
    fontFace: fonts.body,
    align: 'center',
    valign: 'middle',
    fit: 'shrink',
  });

  if (slideNum) {
    slide.addText(slideNum, {
      x: layout.width - layout.margins.right - 1.0,
      y: layout.footer.y,
      w: 1.0,
      h: 0.35,
      fontSize: 8.5,
      bold: true,
      color: primaryTextColor,
      transparency: isDark ? 18 : 0,
      fontFace: fonts.body,
      align: 'right',
      valign: 'middle',
    });
  }
};

/**
 * Draws a standardized container card box.
 */
export const addCard = (
  slide: any,
  pptx: any,
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
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: options.fillColor || colors.bg },
    line: {
      color: options.borderColor || colors.border,
      width: options.borderWidth !== undefined ? options.borderWidth : 1,
    },
    rectRadius: options.radius !== undefined ? options.radius : 0.05,
  });
};

/**
 * Renders an image block with cover sizing or displays a branded placeholder if the image is missing.
 */
export const addImageBlock = (
  slide: any,
  pptx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  base64Data: string | null,
  label: string
) => {
  const { colors, fonts } = PPT_THEME;

  if (base64Data && isValidBase64(base64Data)) {
    slide.addImage({
      data: base64Data,
      x,
      y,
      w,
      h,
      sizing: { type: 'cover', w, h },
    });
  } else {
    addCard(slide, pptx, x, y, w, h, {
      fillColor: colors.accentBg,
      borderColor: colors.primary,
      borderWidth: 1.5,
      radius: 0.06,
    });

    slide.addText('PHOTO', {
      x: x + w / 2 - 1.0,
      y: y + h / 2 - 0.7,
      w: 2.0,
      h: 0.6,
      fontSize: 16,
      bold: true,
      color: colors.primary,
      align: 'center',
      valign: 'middle',
    });

    slide.addText(`MISSING PHOTO: ${label.toUpperCase()}`, {
      x: x + 0.2,
      y: y + h / 2 + 0.1,
      w: w - 0.4,
      h: 0.4,
      fontSize: 9,
      bold: true,
      color: colors.primary,
      fontFace: fonts.body,
      align: 'center',
      valign: 'middle',
    });
    slide.addText('Upload image to display here', {
      x: x + 0.2,
      y: y + h / 2 + 0.4,
      w: w - 0.4,
      h: 0.3,
      fontSize: 8,
      color: colors.textMuted,
      fontFace: fonts.body,
      align: 'center',
      valign: 'middle',
    });
  }
};

/**
 * Draws a standardized key-value stat card grid.
 */
export const addStatCard = (
  slide: any,
  pptx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  value: string,
  label: string,
  highlight: boolean = false
) => {
  const { colors, fonts } = PPT_THEME;
  const bgColor = highlight ? colors.accentBg : colors.bg;
  const borderColor = highlight ? colors.primary : colors.border;

  addCard(slide, pptx, x, y, w, h, {
    fillColor: bgColor,
    borderColor,
    radius: 0.05,
  });

  slide.addText(value, {
    x: x + 0.08,
    y: y + 0.12,
    w: w - 0.16,
    h: 0.35,
    fontSize: 12,
    bold: true,
    color: colors.primary,
    fontFace: fonts.body,
    valign: 'middle',
  });

  slide.addText(label.toUpperCase(), {
    x: x + 0.08,
    y: y + 0.52,
    w: w - 0.16,
    h: 0.4,
    fontSize: 7.5,
    bold: true,
    color: colors.textMuted,
    fontFace: fonts.body,
  });
};
