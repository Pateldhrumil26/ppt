import { createApi } from '@reduxjs/toolkit/query/react';
import { sharedBaseQuery } from './sharedBaseQuery';
import type { IAllSlides } from '../modules/ppt/ppt.interfaces';

export const pptApi = createApi({
  reducerPath: 'pptApi',
  baseQuery: sharedBaseQuery,
  tagTypes: ['PPT'],
  endpoints: (builder) => ({
    generatePpt: builder.mutation<Blob, IAllSlides>({
      query: (body) => ({
        url: '/ppt/generate',
        method: 'POST',
        body,
        responseHandler: (response) => response.blob(), // For downloading file blobs
      }),
    }),
    previewPpt: builder.mutation<{ base64: string; fileName: string }, IAllSlides>({
      query: (body) => ({
        url: '/ppt/preview',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGeneratePptMutation, usePreviewPptMutation } = pptApi;
