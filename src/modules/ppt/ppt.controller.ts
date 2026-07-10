/**
 * ppt.controller.ts — Express controller for PPT generation.
 *
 * Follows Aesthetic Arc patterns:
 * - Uses catchAsync wrapper (no raw try/catch)
 * - Throws ApiError for validation/generation failures
 * - Returns standardized responses via res.success() or binary streams
 */
import type { Request, Response } from 'express';
import catchAsync from '@/shared/utils/catchAsync';
import ApiError from '@/shared/utils/errors/ApiError';
import PptService from './ppt.service';
import type { IAllSlides } from './ppt.interfaces';

/**
 * POST /api/v1/ppt/generate
 *
 * Accepts the full AllSlides payload, generates a PPTX file, and returns
 * it as a downloadable binary attachment.
 */
export const generate = catchAsync(async (req: Request, res: Response) => {
  const slidesData: IAllSlides = req.body;

  if (!slidesData || !slidesData.slide1) {
    throw new ApiError(400, 'Invalid request: slide data is required');
  }

  if (!slidesData.slide1.title || !slidesData.slide1.title.trim()) {
    throw new ApiError(400, 'Cover slide title is required');
  }

  if (!slidesData.slide1.companyName || !slidesData.slide1.companyName.trim()) {
    throw new ApiError(400, 'Company name is required');
  }

  // Generate the PPTX
  const pptBase64 = await PptService.generate(slidesData);

  // Convert base64 to Buffer for binary response
  const pptBuffer = Buffer.from(pptBase64, 'base64');

  const fileName = `${slidesData.slide1.companyName || 'Presentation'}_Marketing_Deck.pptx`;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Length', pptBuffer.length.toString());
  res.send(pptBuffer);
});

/**
 * POST /api/v1/ppt/preview
 *
 * Returns a JSON response with the generated file URL (for async generation).
 * Uses the res.success() response extension.
 */
export const preview = catchAsync(async (req: Request, res: Response) => {
  const slidesData: IAllSlides = req.body;

  if (!slidesData || !slidesData.slide1) {
    throw new ApiError(400, 'Invalid request: slide data is required');
  }

  // Generate PPTX and return as base64 (for preview/embedding)
  const pptBase64 = await PptService.generate(slidesData);

  // Use the Aesthetic Arc response utility
  (res as any).success(
    { base64: pptBase64, fileName: `${slidesData.slide1.companyName || 'Presentation'}_Preview.pptx` },
    200,
    'PPT preview generated successfully'
  );
});
