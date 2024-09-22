import { apiSlice } from './apiSlice';
import { FAVOURITES_URL } from '../constants';

export const favouriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFavourite: builder.mutation({
      query: (favourite) => ({
        url: FAVOURITES_URL,
        method: 'POST',
        body: favourite,
      }),
      invalidatesTags: ['Favourite'], // Invalidate Favourite tag to refresh data
    }),
    getFavouriteDetails: builder.query({
      query: (id) => ({
        url: `${FAVOURITES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5, // Cache duration in seconds
      providesTags: (result, error, id) => [{ type: 'Favourite', id }],
    }),
    getMyFavourites: builder.query({
      query: () => ({
        url: `${FAVOURITES_URL}/mine`,
      }),
      keepUnusedDataFor: 5, // Cache duration in seconds
      providesTags: ['Favourite'],
    }),
    getFavourites: builder.query({
      query: () => ({
        url: FAVOURITES_URL,
      }),
      keepUnusedDataFor: 5, // Cache duration in seconds
      providesTags: ['Favourite'],
    }),
    removeFavourite: builder.mutation({
      query: (id) => ({
        url: `${FAVOURITES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favourite'], // Invalidate Favourite tag to refresh data
    }),
  }),
});

export const {
  useCreateFavouriteMutation,
  useGetFavouriteDetailsQuery,
  useGetMyFavouritesQuery,
  useGetFavouritesQuery,
  useRemoveFavouriteMutation,
} = favouriteApiSlice;
