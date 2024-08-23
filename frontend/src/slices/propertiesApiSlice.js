import { PROPERTIES_URL, UPLOADS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";


export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PROPERTIES_URL,
        params: { pageNumber, keyword },
        method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Properties'],
    }),
    getPropertiesByCategory: builder.query({
      query: (category) => ({
        url: `${PROPERTIES_URL}/category/${category}`,
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Properties'],
    }),
    getPropertyDetails: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTIES_URL}/${propertyId}`,
        method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
      }),
      keepUnusedDataFor: 5,
      //providesTags: ['Properties'],
    }),
    createProperty: builder.mutation({
      query: () => ({
        url: `${PROPERTIES_URL}`,
        method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
      }),
      invalidatesTags: ['Property'],
    }),
    updateProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTIES_URL}/${data.propertyId}`,
        method: 'PUT',
        body: data,
         credentials: 'include',
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
        credentials: 'include',
        
      }),
    }),
    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTIES_URL}/${propertyId}`,
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Properties'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PROPERTIES_URL}/${data.propertyId}/reviews`,
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Property'],
    }),
    getTopProperties: builder.query({
      query: () => ({
        url: `${PROPERTIES_URL}/top`,
         method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
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
