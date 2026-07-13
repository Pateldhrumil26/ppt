const fs = require('fs');
const path = 'e:/ppt/src/pages/StepperApp.tsx';
let content = fs.readFileSync(path, 'utf8');

const helper = `
// Helper to safely get an image URL whether it's a File object or a string URL
const getSafeImageUrl = (source: any): string | null => {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source instanceof File || source instanceof Blob) {
    try {
      return URL.createObjectURL(source);
    } catch (e) {
      return null;
    }
  }
  return null;
};
`;

// Insert the helper after the imports
if (!content.includes('getSafeImageUrl')) {
  content = content.replace(/(import .*;\n)+/, match => match + '\n' + helper);
}

// Replace URL.createObjectURL(xxx) with getSafeImageUrl(xxx) in the file
// Note: We shouldn't replace it inside fileToBase64 or urlToBase64 if they don't use it, but they don't.
// Wait, urlToBase64 uses URL.revokeObjectURL? No.
// Let's replace only inside StepperApp.tsx where it's called with s.something.
content = content.replace(/URL\.createObjectURL\(([^)]+)\)/g, 'getSafeImageUrl($1)');

// But wait, there might be legitimate URL.createObjectURL calls inside handleDownload?
// Let's check handleDownload JSON button in JsonPreviewPanel? We are only modifying StepperApp.tsx.
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed StepperApp.tsx');
