import { ReactNode } from 'react';

export const SlideShell = ({ children }: { children: ReactNode }) => (
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

// Helper to safely get an image URL whether it's a File object or a string URL
export const getSafeImageUrl = (source: any): string | undefined => {
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