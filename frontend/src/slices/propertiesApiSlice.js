import { PROPERTIES_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: PROPERTIES_URL,
        method: 'GET',
        // Include credentials to support cookies
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      keepUnusedDataFor: 5
    }),
    getPropertyDetails: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTIES_URL}/${propertyId}`,
        method: 'GET',
        // Include credentials to support cookies
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),

});

export const { 
  useGetPropertiesQuery,
  useGetPropertyDetailsQuery,
 } = propertiesApiSlice;