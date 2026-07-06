import { createContext, useContext, useState, ReactNode } from 'react';

export interface Slide1Data {
  title: string;
  subtitle: string;
  address: string;
  companyName: string;
  companyTagline: string;
  themeColor: string;
  fontColor: string;
  slideNumber: string;
  logo: File | null;
  backgroundImage: File | null;
}

export interface Slide2Data {
  cityName: string;
  population: string;
  gdp: string;
  gdpGrowth: string;
  worldFirst: string;
  metroKm: string;
  brtsKm: string;
  dailyFlights: string;
  retailRank: string;
  infrastructure: string;
  cityImage: File | null;
}

export interface Slide3Data {
  locationTitle: string;
  address: string;
  point1Title: string;
  point1Desc: string;
  point2Title: string;
  point2Desc: string;
  point3Title: string;
  point3Desc: string;
  mapsUrl: string;
  mapImage: File | null;
}

export interface Slide4Data {
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  possessionLabel: string;
  possessionDate: string;
  projectImage: File | null;
}

export interface Slide5Data {
  progress1Title: string;
  progress1Status: string;
  progress2Title: string;
  progress2Status: string;
  progress3Title: string;
  progress3Status: string;
  progress4Title: string;
  progress4Status: string;
  currentStatus: string;
  constructionImage: File | null;
}

export interface AllSlides {
  slide1: Slide1Data;
  slide2: Slide2Data;
  slide3: Slide3Data;
  slide4: Slide4Data;
  slide5: Slide5Data;
}

interface FormContextType {
  data: AllSlides;
  updateSlide1: (d: Partial<Slide1Data>) => void;
  updateSlide2: (d: Partial<Slide2Data>) => void;
  updateSlide3: (d: Partial<Slide3Data>) => void;
  updateSlide4: (d: Partial<Slide4Data>) => void;
  updateSlide5: (d: Partial<Slide5Data>) => void;
}

const initial: AllSlides = {
  slide1: {
    title: 'MADHAV HIGHSTREET',
    subtitle: 'THE NEXT PREMIUM RETAIL DESTINATION',
    address: 'SINDHU BHAVAN ROAD,\nBODAKDEV, AHMEDABAD',
    companyName: 'AESTHETIC ARC',
    companyTagline: 'PROPERTY LEASING COMPANY',
    themeColor: '#3d1a6e',
    fontColor: '#FFFFFF',
    slideNumber: '01',
    logo: null,
    backgroundImage: null,
  },
  slide2: {
    cityName: 'AHMEDABAD',
    population: '90.6 Lakh+',
    gdp: '$135 Billion+',
    gdpGrowth: '6.7%+',
    worldFirst: "World's 1st Heritage City With BRTS",
    metroKm: '40 KM+',
    brtsKm: '160 KM+',
    dailyFlights: '130+',
    retailRank: 'Top 3 Fastest Growing Retail Market',
    infrastructure: 'Bullet Train Project\nDedicated Freight Corridor\nAhmedabad-Dholera Expressway\nSardar Patel Ring Road\nEvolving IT & Business Hubs\nExpanded Metro Network\nInternational Convention Centre',
    cityImage: null,
  },
  slide3: {
    locationTitle: 'PREMIUM LOCATION\nTHAT CONNECTS EVERYTHING',
    address: 'Sindhu Bhavan Road,\nBodakdev, Ahmedabad',
    point1Title: '2 Mins from SG Highway',
    point1Desc: 'Excellent Connectivity',
    point2Title: 'Easy Access to SP Ring Road',
    point2Desc: '',
    point3Title: 'Surrounded by Premium',
    point3Desc: 'Residential & Commercial Developments',
    mapsUrl: '',
    mapImage: null,
  },
  slide4: {
    feature1Title: 'Premium Corner Plot',
    feature1Desc: 'with Wide Frontage',
    feature2Title: 'Modern Retail Architecture',
    feature2Desc: 'with Maximum Visibility',
    feature3Title: 'Designed for Premium Brands',
    feature3Desc: '& High Footfall',
    possessionLabel: 'Possession',
    possessionDate: 'March 2027',
    projectImage: null,
  },
  slide5: {
    progress1Title: 'Foundation',
    progress1Status: 'Completed',
    progress2Title: 'Structure',
    progress2Status: 'In Progress',
    progress3Title: 'Finishing',
    progress3Status: 'Ahead',
    progress4Title: 'Possession',
    progress4Status: 'March 2027',
    currentStatus: 'JUNE 2026',
    constructionImage: null,
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AllSlides>(initial);

  const updateSlide1 = (d: Partial<Slide1Data>) =>
    setData(prev => ({ ...prev, slide1: { ...prev.slide1, ...d } }));
  const updateSlide2 = (d: Partial<Slide2Data>) =>
    setData(prev => ({ ...prev, slide2: { ...prev.slide2, ...d } }));
  const updateSlide3 = (d: Partial<Slide3Data>) =>
    setData(prev => ({ ...prev, slide3: { ...prev.slide3, ...d } }));
  const updateSlide4 = (d: Partial<Slide4Data>) =>
    setData(prev => ({ ...prev, slide4: { ...prev.slide4, ...d } }));
  const updateSlide5 = (d: Partial<Slide5Data>) =>
    setData(prev => ({ ...prev, slide5: { ...prev.slide5, ...d } }));

  return (
    <FormContext.Provider value={{ data, updateSlide1, updateSlide2, updateSlide3, updateSlide4, updateSlide5 }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};