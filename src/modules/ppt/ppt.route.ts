/**
 * ppt.route.ts — Express Router for PPT generation endpoints.
 *
 * Follows Aesthetic Arc routing conventions:
 * - Validation middleware applied before controller
 * - RESTful naming with versioned base path
 */
import { Router } from 'express';
import * as pptController from './ppt.controller';

const router = Router();

/**
 * POST /generate — Generate and download a PPTX file
 * Body: IAllSlides (validated by ppt.validation.ts middleware)
 *
 * Usage in the main app router:
 *   app.use('/api/v1/ppt', pptRoute);
 *
 * NOTE: Validation middleware (using pptValidation.generatePpt)
 * should be applied at the app-level route registration, e.g.:
 *   router.post('/generate', validate(pptValidation.generatePpt), pptController.generate);
 *
 * For this stub, we wire the controller directly. The validate middleware
 * will be added during integration with the Aesthetic Arc validate utility.
 */
router.post('/generate', pptController.generate);

/**
 * POST /preview — Generate PPTX and return as base64 JSON response
 */
router.post('/preview', pptController.preview);

export default router;
