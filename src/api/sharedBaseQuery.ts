import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * sharedBaseQuery — Base query configuration for RTK Query.
 * STUB: In the main Aesthetic Arc codebase, this is imported from '@/shared/api/sharedBaseQuery'.
 */
export const sharedBaseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers) => {
    // Add default authorization headers or other headers if required
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
