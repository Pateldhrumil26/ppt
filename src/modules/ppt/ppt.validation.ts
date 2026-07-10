/**
 * ppt.validation.ts — Joi validation schemas for PPT generation API.
 *
 * Uses the Aesthetic Arc `generateJoiValidation` helper for consistency.
 * Each slide's fields are validated with appropriate string/array constraints.
 */
import Joi from 'joi';
import { generateJoiValidation } from '@/shared/validations/generateJoiValidation';

// ─────────────────────── REUSABLE SUB-SCHEMAS ───────────────────────────────

const imageField = Joi.alternatives().try(
  Joi.string().allow('', null),
  Joi.any() // Allows base64 data URLs or null
).optional().allow(null);

const slideNumberField = Joi.string().trim().max(5).optional().allow('');

const labelValuePair = (labelDefault?: string, valueDefault?: string) => ({
  label: Joi.string().trim().optional().allow('').default(labelDefault || ''),
  value: Joi.string().trim().optional().allow('').default(valueDefault || ''),
});

// ─────────────────────── SLIDE SCHEMAS ──────────────────────────────────────

const slide1Schema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Cover slide title is required',
    'any.required': 'Cover slide title is required',
  }),
  subtitle: Joi.string().trim().optional().allow(''),
  address: Joi.string().trim().optional().allow(''),
  companyName: Joi.string().trim().required().messages({
    'string.empty': 'Company name is required',
  }),
  companyTagline: Joi.string().trim().optional().allow(''),
  themeColor: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/).default('#3d1a6e'),
  fontColor: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/).default('#FFFFFF'),
  slideNumber: slideNumberField,
  logo: imageField,
  backgroundImage: imageField,
  categoryIcon1: imageField,
  categoryIcon2: imageField,
  categoryIcon3: imageField,
  categoryIcon4: imageField,
  categoryIcon5: imageField,
  categoryIcon6: imageField,
  categoryIcon7: imageField,
  categoryIcon8: imageField,
  categoryName1: Joi.string().trim().optional().allow(''),
  categoryName2: Joi.string().trim().optional().allow(''),
  categoryName3: Joi.string().trim().optional().allow(''),
  categoryName4: Joi.string().trim().optional().allow(''),
  categoryName5: Joi.string().trim().optional().allow(''),
  categoryName6: Joi.string().trim().optional().allow(''),
  categoryName7: Joi.string().trim().optional().allow(''),
  categoryName8: Joi.string().trim().optional().allow(''),
  selectedCategories: Joi.array().items(Joi.string()).default([]),
});

const slide2Schema = Joi.object({
  cityName: Joi.string().trim().required(),
  population: Joi.string().trim().optional().allow(''),
  gdp: Joi.string().trim().optional().allow(''),
  gdpGrowth: Joi.string().trim().optional().allow(''),
  worldFirst: Joi.string().trim().optional().allow(''),
  metroKm: Joi.string().trim().optional().allow(''),
  brtsKm: Joi.string().trim().optional().allow(''),
  dailyFlights: Joi.string().trim().optional().allow(''),
  retailRank: Joi.string().trim().optional().allow(''),
  infrastructure: Joi.string().trim().optional().allow(''),
  cityImage: imageField,
});

const slide3Schema = Joi.object({
  locationTitle: Joi.string().trim().optional().allow(''),
  address: Joi.string().trim().optional().allow(''),
  point1Title: Joi.string().trim().optional().allow(''),
  point1Desc: Joi.string().trim().optional().allow(''),
  point2Title: Joi.string().trim().optional().allow(''),
  point2Desc: Joi.string().trim().optional().allow(''),
  point3Title: Joi.string().trim().optional().allow(''),
  point3Desc: Joi.string().trim().optional().allow(''),
  mapsUrl: Joi.string().trim().uri().optional().allow(''),
  mapImage: imageField,
});

const slide4Schema = Joi.object({
  feature1Title: Joi.string().trim().optional().allow(''),
  feature1Desc: Joi.string().trim().optional().allow(''),
  feature2Title: Joi.string().trim().optional().allow(''),
  feature2Desc: Joi.string().trim().optional().allow(''),
  feature3Title: Joi.string().trim().optional().allow(''),
  feature3Desc: Joi.string().trim().optional().allow(''),
  possessionLabel: Joi.string().trim().optional().allow(''),
  possessionDate: Joi.string().trim().optional().allow(''),
  projectImage: imageField,
});

const slide5Schema = Joi.object({
  progress1Title: Joi.string().trim().optional().allow(''),
  progress1Status: Joi.string().trim().optional().allow(''),
  progress2Title: Joi.string().trim().optional().allow(''),
  progress2Status: Joi.string().trim().optional().allow(''),
  progress3Title: Joi.string().trim().optional().allow(''),
  progress3Status: Joi.string().trim().optional().allow(''),
  progress4Title: Joi.string().trim().optional().allow(''),
  progress4Status: Joi.string().trim().optional().allow(''),
  currentStatus: Joi.string().trim().optional().allow(''),
  constructionImage: imageField,
});

const slide6Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  floorHeightLabel: Joi.string().trim().optional().allow(''),
  floorHeightValue: Joi.string().trim().optional().allow(''),
  frontageLabel: Joi.string().trim().optional().allow(''),
  frontageValue: Joi.string().trim().optional().allow(''),
  parkingLabel: Joi.string().trim().optional().allow(''),
  parkingValue: Joi.string().trim().optional().allow(''),
  roadAccessLabel: Joi.string().trim().optional().allow(''),
  roadAccessValue: Joi.string().trim().optional().allow(''),
  planImage: imageField,
});

const slide7Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  floorHeightLabel: Joi.string().trim().optional().allow(''),
  floorHeightValue: Joi.string().trim().optional().allow(''),
  bestForLabel: Joi.string().trim().optional().allow(''),
  bestForValue: Joi.string().trim().optional().allow(''),
  terraceLabel: Joi.string().trim().optional().allow(''),
  terraceValue: Joi.string().trim().optional().allow(''),
  liftStaircaseLabel: Joi.string().trim().optional().allow(''),
  liftStaircaseValue: Joi.string().trim().optional().allow(''),
  planImage: imageField,
});

const slide8Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  brandList: Joi.string().trim().optional().allow(''),
  mapImage: imageField,
});

const slide9Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  label1: Joi.string().trim().optional().allow(''),
  img1: imageField,
  label2: Joi.string().trim().optional().allow(''),
  img2: imageField,
  label3: Joi.string().trim().optional().allow(''),
  img3: imageField,
  label4: Joi.string().trim().optional().allow(''),
  img4: imageField,
  label5: Joi.string().trim().optional().allow(''),
  img5: imageField,
});

const slide10Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  spec1Label: Joi.string().trim().optional().allow(''),
  spec1Value: Joi.string().trim().optional().allow(''),
  spec2Label: Joi.string().trim().optional().allow(''),
  spec2Value: Joi.string().trim().optional().allow(''),
  spec3Label: Joi.string().trim().optional().allow(''),
  spec3Value: Joi.string().trim().optional().allow(''),
  spec4Label: Joi.string().trim().optional().allow(''),
  spec4Value: Joi.string().trim().optional().allow(''),
  spec5Label: Joi.string().trim().optional().allow(''),
  spec5Value: Joi.string().trim().optional().allow(''),
  spec6Label: Joi.string().trim().optional().allow(''),
  spec6Value: Joi.string().trim().optional().allow(''),
  spec7Label: Joi.string().trim().optional().allow(''),
  spec7Value: Joi.string().trim().optional().allow(''),
  spec8Label: Joi.string().trim().optional().allow(''),
  spec8Value: Joi.string().trim().optional().allow(''),
  spec9Label: Joi.string().trim().optional().allow(''),
  spec9Value: Joi.string().trim().optional().allow(''),
  spec10Label: Joi.string().trim().optional().allow(''),
  spec10Value: Joi.string().trim().optional().allow(''),
  qrUrl: Joi.string().trim().optional().allow(''),
  qrImage: imageField,
});

const slide11Schema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  buildingImage: imageField,
  selectedCategories: Joi.array().items(Joi.string()).default([]),
});

const slideSiteVisibilitySchema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  leftViewImage: imageField,
  frontViewImage: imageField,
  rightViewImage: imageField,
});

const slideFirstFloorPlanSchema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  feature1Title: Joi.string().trim().optional().allow(''),
  feature1Desc: Joi.string().trim().optional().allow(''),
  feature2Title: Joi.string().trim().optional().allow(''),
  feature2Desc: Joi.string().trim().optional().allow(''),
  feature3Title: Joi.string().trim().optional().allow(''),
  feature3Desc: Joi.string().trim().optional().allow(''),
  feature4Title: Joi.string().trim().optional().allow(''),
  feature4Desc: Joi.string().trim().optional().allow(''),
  floorPlanImage: imageField,
});

const slideNearbyCommercialSchema = Joi.object({
  slideNumber: slideNumberField,
  title: Joi.string().trim().optional().allow(''),
  subtitle: Joi.string().trim().optional().allow(''),
  building1Name: Joi.string().trim().optional().allow(''),
  building1Distance: Joi.string().trim().optional().allow(''),
  building1Image: imageField,
  building2Name: Joi.string().trim().optional().allow(''),
  building2Distance: Joi.string().trim().optional().allow(''),
  building2Image: imageField,
  building3Name: Joi.string().trim().optional().allow(''),
  building3Distance: Joi.string().trim().optional().allow(''),
  building3Image: imageField,
  building4Name: Joi.string().trim().optional().allow(''),
  building4Distance: Joi.string().trim().optional().allow(''),
  building4Image: imageField,
  building5Name: Joi.string().trim().optional().allow(''),
  building5Distance: Joi.string().trim().optional().allow(''),
  building5Image: imageField,
  building6Name: Joi.string().trim().optional().allow(''),
  building6Distance: Joi.string().trim().optional().allow(''),
  building6Image: imageField,
  building7Name: Joi.string().trim().optional().allow(''),
  building7Distance: Joi.string().trim().optional().allow(''),
  building7Image: imageField,
  building8Name: Joi.string().trim().optional().allow(''),
  building8Distance: Joi.string().trim().optional().allow(''),
  building8Image: imageField,
  ecosystemImage: imageField,
});

const slideContactSchema = Joi.object({
  slideNumber: slideNumberField,
  heading: Joi.string().trim().optional().allow(''),
  companyName: Joi.string().trim().required(),
  companyTagline: Joi.string().trim().optional().allow(''),
  phone1: Joi.string().trim().optional().allow(''),
  phone2: Joi.string().trim().optional().allow(''),
  email: Joi.string().trim().email({ tlds: false }).optional().allow(''),
  website: Joi.string().trim().optional().allow(''),
  address: Joi.string().trim().optional().allow(''),
  companyLogo: imageField,
});

// ─────────────────────── EXPORTED VALIDATION ────────────────────────────────

export const pptValidation = {
  generatePpt: {
    body: generateJoiValidation({
      slide1: slide1Schema.required(),
      slide2: slide2Schema.required(),
      slide3: slide3Schema.required(),
      slide4: slide4Schema.required(),
      slide5: slide5Schema.required(),
      slide6: slide6Schema.required(),
      slide7: slide7Schema.required(),
      slide8: slide8Schema.required(),
      slide9: slide9Schema.required(),
      slide10: slide10Schema.required(),
      slide11: slide11Schema.required(),
      slideSiteVisibility: slideSiteVisibilitySchema.required(),
      slideFirstFloorPlan: slideFirstFloorPlanSchema.required(),
      slideNearbyCommercial: slideNearbyCommercialSchema.required(),
      slideContact: slideContactSchema.required(),
    }),
  },
};
