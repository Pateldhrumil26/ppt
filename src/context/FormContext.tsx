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
  selectedCategories: string[];
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

export interface Slide6Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  floorHeightLabel: string;
  floorHeightValue: string;
  frontageLabel: string;
  frontageValue: string;
  parkingLabel: string;
  parkingValue: string;
  roadAccessLabel: string;
  roadAccessValue: string;
  planImage: File | null;
}

export interface Slide7Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  floorHeightLabel: string;
  floorHeightValue: string;
  bestForLabel: string;
  bestForValue: string;
  terraceLabel: string;
  terraceValue: string;
  liftStaircaseLabel: string;
  liftStaircaseValue: string;
  planImage: File | null;
}

export interface Slide8Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  brandList: string;
  mapImage: File | null;
}

export interface Slide9Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  label1: string;
  img1: File | null;
  label2: string;
  img2: File | null;
  label3: string;
  img3: File | null;
  label4: string;
  img4: File | null;
  label5: string;
  img5: File | null;
}

export interface Slide10Data {
  slideNumber: string;
  title: string;
  spec1Label: string;
  spec1Value: string;
  spec2Label: string;
  spec2Value: string;
  spec3Label: string;
  spec3Value: string;
  spec4Label: string;
  spec4Value: string;
  spec5Label: string;
  spec5Value: string;
  spec6Label: string;
  spec6Value: string;
  spec7Label: string;
  spec7Value: string;
  spec8Label: string;
  spec8Value: string;
  spec9Label: string;
  spec9Value: string;
  spec10Label: string;
  spec10Value: string;
  qrUrl: string;
  qrImage: File | null;
}

export interface Slide11Data {
  slideNumber: string;
  title: string;
  card1Label: string;
  card2Label: string;
  card3Label: string;
  card4Label: string;
  card5Label: string;
  card6Label: string;
  card7Label: string;
}

// ─────────────────────── MAIN REMOTE SLIDES DATA ──────────────────────────────

export interface SlideSiteVisibilityData {
  slideNumber: string;
  title: string;
  subtitle: string;
  leftViewImage: File | null;
  frontViewImage: File | null;
  rightViewImage: File | null;
}

export interface SlideFirstFloorPlanData {
  slideNumber: string;
  title: string;
  subtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  floorPlanImage: File | null;
}

export interface SlideNearbyCommercialData {
  slideNumber: string;
  title: string;
  subtitle: string;
  building1Name: string;
  building1Distance: string;
  building1Image: File | null;
  building2Name: string;
  building2Distance: string;
  building2Image: File | null;
  building3Name: string;
  building3Distance: string;
  building3Image: File | null;
  building4Name: string;
  building4Distance: string;
  building4Image: File | null;
  building5Name: string;
  building5Distance: string;
  building5Image: File | null;
  building6Name: string;
  building6Distance: string;
  building6Image: File | null;
  building7Name: string;
  building7Distance: string;
  building7Image: File | null;
  building8Name: string;
  building8Distance: string;
  building8Image: File | null;
  ecosystemImage: File | null;
}

export interface SlideContactData {
  slideNumber: string;
  heading: string;
  companyName: string;
  companyTagline: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  address: string;
  companyLogo: File | null;
}

export interface AllSlides {
  slide1: Slide1Data;
  slide2: Slide2Data;
  slide3: Slide3Data;
  slide4: Slide4Data;
  slide5: Slide5Data;
  slide6: Slide6Data;
  slide7: Slide7Data;
  slide8: Slide8Data;
  slide9: Slide9Data;
  slide10: Slide10Data;
  slide11: Slide11Data;
  slideSiteVisibility: SlideSiteVisibilityData;
  slideFirstFloorPlan: SlideFirstFloorPlanData;
  slideNearbyCommercial: SlideNearbyCommercialData;
  slideContact: SlideContactData;
}

interface FormContextType {
  data: AllSlides;
  setData: (data: AllSlides) => void;
  updateSlide1: (d: Partial<Slide1Data>) => void;
  updateSlide2: (d: Partial<Slide2Data>) => void;
  updateSlide3: (d: Partial<Slide3Data>) => void;
  updateSlide4: (d: Partial<Slide4Data>) => void;
  updateSlide5: (d: Partial<Slide5Data>) => void;
  updateSlide6: (d: Partial<Slide6Data>) => void;
  updateSlide7: (d: Partial<Slide7Data>) => void;
  updateSlide8: (d: Partial<Slide8Data>) => void;
  updateSlide9: (d: Partial<Slide9Data>) => void;
  updateSlide10: (d: Partial<Slide10Data>) => void;
  updateSlide11: (d: Partial<Slide11Data>) => void;
  updateSlideSiteVisibility: (d: Partial<SlideSiteVisibilityData>) => void;
  updateSlideFirstFloorPlan: (d: Partial<SlideFirstFloorPlanData>) => void;
  updateSlideNearbyCommercial: (d: Partial<SlideNearbyCommercialData>) => void;
  updateSlideContact: (d: Partial<SlideContactData>) => void;
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
    selectedCategories: ['cat_1', 'cat_2', 'cat_3', 'cat_4', 'cat_5', 'cat_6', 'cat_7', 'cat_8'],
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
  slide6: {
    slideNumber: '07',
    title: 'GROUND FLOOR PLAN',
    subtitle: 'RETAIL SPACES',
    floorHeightLabel: 'Floor Height',
    floorHeightValue: "12'5\"",
    frontageLabel: 'Frontage',
    frontageValue: "20' to 35'",
    parkingLabel: 'Parking',
    parkingValue: 'Ample Two Wheeler\n& Four Wheeler',
    roadAccessLabel: 'Road Access',
    roadAccessValue: '30 MT Wide Road',
    planImage: null,
  },
  slide7: {
    slideNumber: '09',
    title: 'SECOND FLOOR PLAN',
    subtitle: 'RETAIL SPACES',
    floorHeightLabel: 'Floor Height',
    floorHeightValue: "9'5\"",
    bestForLabel: 'Best for',
    bestForValue: 'F&B / Lifestyle / Offices',
    terraceLabel: 'Open Terrace',
    terraceValue: 'Provision',
    liftStaircaseLabel: 'Lift & Staircase',
    liftStaircaseValue: 'Access',
    planImage: null,
  },
  slide8: {
    slideNumber: '11',
    title: 'BRAND LOCATION MAP',
    subtitle: 'BE IN THE COMPANY OF THE BEST',
    brandList: 'FASHION & APPAREL\nJEWELLERY\nFOOD & BEVERAGE\nLIFESTYLE & OTHERS\nCORPORATE OFFICES\nSHOPPING DESTINATIONS',
    mapImage: null,
  },
  slide9: {
    slideNumber: '12',
    title: 'LIFESTYLE AROUND YOU',
    subtitle: 'EVERYTHING NEARBY',
    label1: 'FINE DINING',
    img1: null,
    label2: 'SHOPPING',
    img2: null,
    label3: 'FITNESS',
    img3: null,
    label4: 'ENTERTAINMENT',
    img4: null,
    label5: 'RESIDENTIAL CATCHMENT',
    img5: null,
  },
  slide10: {
    slideNumber: '13',
    title: 'PROPERTY SPECIFICATIONS',
    spec1Label: 'Project Type',
    spec1Value: 'Commercial',
    spec2Label: 'Location',
    spec2Value: 'Sindhu Bhavan Road, Bodakdev, Ahmedabad',
    spec3Label: 'Jewellery Brands',
    spec3Value: 'Tanishq, Malabar, PC Jeweller & More',
    spec4Label: 'Apparel Brands',
    spec4Value: 'Zara, H&M, Trends, Lifestyle & More',
    spec5Label: 'F&B Outlets',
    spec5Value: "McDonald's, Starbucks, The White Crow & More",
    spec6Label: 'Ground Floor Height',
    spec6Value: '12\'5"',
    spec7Label: 'First Floor Height',
    spec7Value: '10\'5"',
    spec8Label: 'Second Floor Height',
    spec8Value: '9\'5"',
    spec9Label: 'Possession',
    spec9Value: 'March 2027',
    spec10Label: 'Google Maps',
    spec10Value: 'Scan QR Code',
    qrUrl: 'https://maps.google.com',
    qrImage: null,
  },
  slide11: {
    slideNumber: '14',
    title: 'WHY INVEST IN\nMADHAV HIGHSTREET?',
    card1Label: 'Prime Location\nHigh Visibility',
    card2Label: 'Surrounded by\nPremium Brands',
    card3Label: 'High Footfall\nCatchment',
    card4Label: 'Modern Architecture\n& Design',
    card5Label: 'Excellent\nConnectivity & Access',
    card6Label: 'Strong Investment\n& Returns',
    card7Label: 'Strong Investment\nPotential',
  },
  slideSiteVisibility: {
    slideNumber: '06',
    title: 'SITE VISIBILITY',
    subtitle: 'EXCELLENT FRONTAGE & ACCESS',
    leftViewImage: null,
    frontViewImage: null,
    rightViewImage: null,
  },
  slideFirstFloorPlan: {
    slideNumber: '08',
    title: 'FIRST FLOOR PLAN',
    subtitle: 'RETAIL SPACES',
    feature1Title: 'Floor Height',
    feature1Desc: '10\'5"',
    feature2Title: 'Frontage',
    feature2Desc: '18\' to 28\'',
    feature3Title: 'Parking',
    feature3Desc: 'Ample',
    feature4Title: 'Escalator & Lift',
    feature4Desc: 'For Easy Access',
    floorPlanImage: null,
  },
  slideNearbyCommercial: {
    slideNumber: '10',
    title: 'NEARBY COMMERCIAL',
    subtitle: 'ECOSYSTEM',
    building1Name: 'THE WHITE CROW',
    building1Distance: '150 M',
    building1Image: null,
    building2Name: 'STELLAR',
    building2Distance: '200 M',
    building2Image: null,
    building3Name: 'TWIN LILAC',
    building3Distance: '500 M',
    building3Image: null,
    building4Name: 'NOVA',
    building4Distance: '450 M',
    building4Image: null,
    building5Name: 'ARISTA',
    building5Distance: '500 M',
    building5Image: null,
    building6Name: 'DOM ETERNUS',
    building6Distance: '700 M',
    building6Image: null,
    building7Name: 'PALLADIUM',
    building7Distance: '900 M',
    building7Image: null,
    building8Name: 'PENTAGON',
    building8Distance: '1.2 KM',
    building8Image: null,
    ecosystemImage: null,
  },
  slideContact: {
    slideNumber: '15',
    heading: "LET'S BUILD SOMETHING ICONIC TOGETHER",
    companyName: 'AESTHETIC ARC',
    companyTagline: 'PROPERTY LEASING COMPANY',
    phone1: '+91 97129 06363',
    phone2: '+91 97129 06364',
    email: 'info@aestheticarc.com',
    website: 'www.aestheticarc.com',
    address: '418, 4th Floor, Shivalik Highstreet,\nNear Rajpath Club, Bodakdev,\nAhmedabad - 380054, Gujarat, India',
    companyLogo: null,
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
  const updateSlide6 = (d: Partial<Slide6Data>) =>
    setData(prev => ({ ...prev, slide6: { ...prev.slide6, ...d } }));
  const updateSlide7 = (d: Partial<Slide7Data>) =>
    setData(prev => ({ ...prev, slide7: { ...prev.slide7, ...d } }));
  const updateSlide8 = (d: Partial<Slide8Data>) =>
    setData(prev => ({ ...prev, slide8: { ...prev.slide8, ...d } }));
  const updateSlide9 = (d: Partial<Slide9Data>) =>
    setData(prev => ({ ...prev, slide9: { ...prev.slide9, ...d } }));
  const updateSlide10 = (d: Partial<Slide10Data>) =>
    setData(prev => ({ ...prev, slide10: { ...prev.slide10, ...d } }));
  const updateSlide11 = (d: Partial<Slide11Data>) =>
    setData(prev => ({ ...prev, slide11: { ...prev.slide11, ...d } }));
  const updateSlideSiteVisibility = (d: Partial<SlideSiteVisibilityData>) =>
    setData(prev => ({ ...prev, slideSiteVisibility: { ...prev.slideSiteVisibility, ...d } }));
  const updateSlideFirstFloorPlan = (d: Partial<SlideFirstFloorPlanData>) =>
    setData(prev => ({ ...prev, slideFirstFloorPlan: { ...prev.slideFirstFloorPlan, ...d } }));
  const updateSlideNearbyCommercial = (d: Partial<SlideNearbyCommercialData>) =>
    setData(prev => ({ ...prev, slideNearbyCommercial: { ...prev.slideNearbyCommercial, ...d } }));
  const updateSlideContact = (d: Partial<SlideContactData>) =>
    setData(prev => ({ ...prev, slideContact: { ...prev.slideContact, ...d } }));

  return (
    <FormContext.Provider value={{ data, setData, updateSlide1, updateSlide2, updateSlide3, updateSlide4, updateSlide5, updateSlide6, updateSlide7, updateSlide8, updateSlide9, updateSlide10, updateSlide11, updateSlideSiteVisibility, updateSlideFirstFloorPlan, updateSlideNearbyCommercial, updateSlideContact }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};