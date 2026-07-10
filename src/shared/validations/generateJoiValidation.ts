/**
 * generateJoiValidation — Returns a Joi object schema from a shape definition.
 * STUB: Replace with the real Aesthetic Arc implementation during integration.
 */
import Joi from 'joi';

export const generateJoiValidation = (shape: Record<string, Joi.Schema>): Joi.ObjectSchema => {
  return Joi.object(shape);
};
