import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'}
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
          credentials: 'include',
        headers: { 'Content-Type': 'application/json'}
        }),
      }),
   
  }),

});

export const { 
  useLoginMutation,
  useLogoutMutation,
 } = usersApiSlice;