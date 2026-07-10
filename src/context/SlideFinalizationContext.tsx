import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';

export type SlideStatus = 'pending' | 'editing' | 'finalized';

interface SlideFinalizationContextType {
  slideStatuses: Record<number, SlideStatus>;
  slideSnapshots: Record<number, string>;
  markEditing: (slideIndex: number) => void;
  finalizeSlide: (slideIndex: number, snapshotBase64: string) => void;
  getSnapshot: (slideIndex: number) => string | null;
  allFinalized: boolean;
  finalizedCount: number;
  totalSlides: number;
}

const TOTAL_SLIDES = 15;

const SlideFinalizationContext = createContext<SlideFinalizationContextType | undefined>(undefined);

export const SlideFinalizationProvider = ({ children }: { children: ReactNode }) => {
  // Initialize all slides as 'pending'
  const [slideStatuses, setSlideStatuses] = useState<Record<number, SlideStatus>>(() => {
    const initial: Record<number, SlideStatus> = {};
    for (let i = 0; i < TOTAL_SLIDES; i++) initial[i] = 'pending';
    return initial;
  });

  const [slideSnapshots, setSlideSnapshots] = useState<Record<number, string>>({});

  const markEditing = useCallback((slideIndex: number) => {
    setSlideStatuses(prev => {
      // Only transition if currently pending or finalized
      if (prev[slideIndex] === 'editing') return prev;
      return { ...prev, [slideIndex]: 'editing' };
    });
    // Clear snapshot if it was finalized
    setSlideSnapshots(prev => {
      if (!prev[slideIndex]) return prev;
      const next = { ...prev };
      delete next[slideIndex];
      return next;
    });
  }, []);

  const finalizeSlide = useCallback((slideIndex: number, snapshotBase64: string) => {
    setSlideStatuses(prev => ({ ...prev, [slideIndex]: 'finalized' }));
    setSlideSnapshots(prev => ({ ...prev, [slideIndex]: snapshotBase64 }));
  }, []);

  const getSnapshot = useCallback((slideIndex: number): string | null => {
    return slideSnapshots[slideIndex] || null;
  }, [slideSnapshots]);

  const finalizedCount = useMemo(() => {
    return Object.values(slideStatuses).filter(s => s === 'finalized').length;
  }, [slideStatuses]);

  const allFinalized = finalizedCount === TOTAL_SLIDES;

  return (
    <SlideFinalizationContext.Provider value={{
      slideStatuses,
      slideSnapshots,
      markEditing,
      finalizeSlide,
      getSnapshot,
      allFinalized,
      finalizedCount,
      totalSlides: TOTAL_SLIDES,
    }}>
      {children}
    </SlideFinalizationContext.Provider>
  );
};

export const useSlideFinalization = () => {
  const ctx = useContext(SlideFinalizationContext);
  if (!ctx) throw new Error('useSlideFinalization must be used within SlideFinalizationProvider');
  return ctx;
};
