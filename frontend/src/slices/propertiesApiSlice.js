import { PROPERTIES_URL, UPLOADS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PROPERTIES_URL,
        params: { pageNumber, keyword },
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Properties'],
    }),
    getPropertiesByCategory: builder.query({
      query: (category) => ({
        url: `${PROPERTIES_URL}/category/${category}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Properties'],
    }),
    getPropertyDetails: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTIES_URL}/${propertyId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    createProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTIES_URL}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Properties'],
    }),
    updateProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTIES_URL}/${data.propertyId}`,
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Properties'],
    }),
    uploadPropertyImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data, // `data` should be an instance of FormData
      }),
    }),
    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTIES_URL}/${propertyId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Properties'],
    }),
    createReview: builder.mutation({
      query: ({ propertyId, rating, comment }) => ({
        url: `${PROPERTIES_URL}/${propertyId}/reviews`,
        method: 'POST',
        body: { rating, comment },
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth.userInfo?.token;
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
      }),
      invalidatesTags: ['Property'],
    }),
    getTopProperties: builder.query({
      query: () => ({
        url: `${PROPERTIES_URL}/top`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Properties'],
    }),
  }),
});

export const { 
  useGetPropertiesQuery,
  useGetPropertiesByCategoryQuery,
  useGetPropertyDetailsQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useUploadPropertyImageMutation,
  useDeletePropertyMutation,
  useCreateReviewMutation,
  useGetTopPropertiesQuery,
} = propertiesApiSlice;
