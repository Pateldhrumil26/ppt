/**
 * Express Response augmentation — adds `res.success()` method.
 * STUB: Replace with the real Aesthetic Arc declaration during integration.
 */

declare namespace Express {
  interface Response {
    success(data: any, code?: number, message?: string): void;
  }
}

export {};
