export const PPT_THEME = {
  colors: {
    primary: '7d3c70',       // Brand purple
    accent: 'ff8435',        // Brand orange accent
    accentBg: 'fff2e9',      // Light cream accent background
    bg: 'ffffff',            // White background
    darkBg: '1f2937',        // Dark grey background
    darkBgAccent: '0d0420',  // Dark blue-black background
    textDark: '324d7b',      // Navy blue text
    textLight: 'ffffff',     // White text
    textMuted: '666666',     // Muted grey text
    border: 'e5e7eb',        // Border grey
    divider: 'd1d5db',       // Divider grey
    shadow: '000000',
  },
  fonts: {
    body: 'Montserrat',
    header: 'Montserrat',
  },
  layout: {
    width: 13.33,
    height: 7.5,
    margins: {
      left: 0.6,
      right: 0.6,
      top: 0.5,
      bottom: 0.5,
    },
    // Standard Header Dimensions
    header: {
      x: 0.6,
      y: 0.5,
      w: 12.13,
      h: 0.9,
    },
    // Standard Footer Dimensions
    footer: {
      x: 0.6,
      y: 6.9,
      w: 12.13,
      h: 0.4,
    },
    // Standard Split Layout (Split Screen Left/Right Column placements)
    split: {
      leftCol: {
        x: 0.6,
        y: 1.4,
        w: 5.6,
        h: 5.0,
      },
      rightCol: {
        x: 6.7,
        y: 1.4,
        w: 6.03,
        h: 5.0,
      },
      // Reverse Split Screen placement (map/plan left, details right)
      leftImageCol: {
        x: 0.6,
        y: 1.4,
        w: 6.03,
        h: 5.0,
      },
      rightTextCol: {
        x: 7.1,
        y: 1.4,
        w: 5.63,
        h: 5.0,
      },
    },
    // Full width visual placements
    fullWidthContent: {
      x: 0.6,
      y: 1.4,
      w: 12.13,
      h: 5.0,
    },
  },
};
