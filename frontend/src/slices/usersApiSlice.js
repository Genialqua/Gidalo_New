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
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
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
    profile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
          credentials: 'include',
        }),
      }),
    getUserDetails: builder.query({
        query: (id) => ({
          url: `${USERS_URL}/${id}`,
        }),
        keepUnusedDataFor: 5,
      }),
    updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/${data.userId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['User'],
      }),
      getUsers: builder.query({
        query: () => ({
          url: USERS_URL,
        }),
        providesTags: ['User'],
        keepUnusedDataFor: 5,
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`,
          method: 'DELETE',
        }),
      }),
   
  }),

});

export const { 
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
 
 } = usersApiSlice;