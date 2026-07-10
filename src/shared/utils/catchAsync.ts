/**
 * catchAsync — Wraps an async Express handler to forward errors to next().
 * STUB: Replace with the real Aesthetic Arc implementation during integration.
 */
import type { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
