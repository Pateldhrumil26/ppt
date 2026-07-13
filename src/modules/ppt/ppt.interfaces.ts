/**
 * ppt.interfaces.ts — TypeScript typings for PPT generation request/response.
 *
 * These interfaces mirror the AllSlides shape from FormContext but are
 * decoupled for the backend module. During integration, these become
 * the source of truth for the Express API contract.
 */

// ─────────────────────── INDIVIDUAL SLIDE DATA SHAPES ──────────────────────

export interface ISlide1Data {
  title: string;
  subtitle: string;
  address: string;
  companyName: string;
  companyTagline: string;
  themeColor: string;
  fontColor: string;
  slideNumber: string;
  logo: string | null;
  backgroundImage: string | null;
  categoryIcon1: string | null;
  categoryIcon2: string | null;
  categoryIcon3: string | null;
  categoryIcon4: string | null;
  categoryIcon5: string | null;
  categoryIcon6: string | null;
  categoryIcon7: string | null;
  categoryIcon8: string | null;
  categoryName1: string;
  categoryName2: string;
  categoryName3: string;
  categoryName4: string;
  categoryName5: string;
  categoryName6: string;
  categoryName7: string;
  categoryName8: string;
  selectedCategories: string[];
}

export interface ISlide2Data {
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
  cityImage: string | null;
}

export interface ISlide3Data {
  locationTitle: string;
  address: string;
  point1Title: string;
  point1Desc: string;
  point2Title: string;
  point2Desc: string;
  point3Title: string;
  point3Desc: string;
  mapsUrl: string;
  mapImage: string | null;
}

export interface ISlide4Data {
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  possessionLabel: string;
  possessionDate: string;
  projectImage: string | null;
}

export interface ISlide5Data {
  progress1Title: string;
  progress1Status: string;
  progress2Title: string;
  progress2Status: string;
  progress3Title: string;
  progress3Status: string;
  progress4Title: string;
  progress4Status: string;
  currentStatus: string;
  constructionImage: string | null;
}

export interface ISlide6Data {
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
  planImage: string | null;
}

export interface ISlide7Data {
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
  planImage: string | null;
}

export interface ISlide8Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  brandList: string;
  mapImage: string | null;
}

export interface ISlide9Data {
  slideNumber: string;
  title: string;
  subtitle: string;
  label1: string;
  img1: string | null;
  label2: string;
  img2: string | null;
  label3: string;
  img3: string | null;
  label4: string;
  img4: string | null;
  label5: string;
  img5: string | null;
}

export interface ISlide10Data {
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
  qrImage: string | null;
}

export interface ISlide11Data {
  slideNumber: string;
  title: string;
  buildingImage: string | null;
  selectedCategories: string[];
}

export interface ISlideSiteVisibilityData {
  slideNumber: string;
  title: string;
  subtitle: string;
  leftViewImage: string | null;
  frontViewImage: string | null;
  rightViewImage: string | null;
}

export interface ISlideFirstFloorPlanData {
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
  floorPlanImage: string | null;
}

export interface ISlideNearbyCommercialData {
  slideNumber: string;
  title: string;
  subtitle: string;
  building1Name: string;
  building1Distance: string;
  building1Image: string | null;
  building2Name: string;
  building2Distance: string;
  building2Image: string | null;
  building3Name: string;
  building3Distance: string;
  building3Image: string | null;
  building4Name: string;
  building4Distance: string;
  building4Image: string | null;
  building5Name: string;
  building5Distance: string;
  building5Image: string | null;
  building6Name: string;
  building6Distance: string;
  building6Image: string | null;
  building7Name: string;
  building7Distance: string;
  building7Image: string | null;
  building8Name: string;
  building8Distance: string;
  building8Image: string | null;
  ecosystemImage: string | null;
}

export interface ISlideContactData {
  slideNumber: string;
  heading: string;
  companyName: string;
  companyTagline: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  address: string;
  companyLogo: string | null;
}

// ─────────────────────── AGGREGATE TYPES ────────────────────────────────────

export interface IAllSlides {
  slide1: ISlide1Data;
  slide2: ISlide2Data;
  slide3: ISlide3Data;
  slide4: ISlide4Data;
  slide5: ISlide5Data;
  slide6: ISlide6Data;
  slide7: ISlide7Data;
  slide8: ISlide8Data;
  slide9: ISlide9Data;
  slide10: ISlide10Data;
  slide11: ISlide11Data;
  slideSiteVisibility: ISlideSiteVisibilityData;
  slideFirstFloorPlan: ISlideFirstFloorPlanData;
  slideNearbyCommercial: ISlideNearbyCommercialData;
  slideContact: ISlideContactData;
}

// ─────────────────────── REQUEST / RESPONSE ─────────────────────────────────

export interface IPptGeneratePayload {
  slides: IAllSlides;
}

export interface IPptGenerateResponse {
  success: boolean;
  message: string;
  fileUrl?: string;
}
