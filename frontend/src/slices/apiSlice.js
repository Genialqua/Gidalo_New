import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PROPERTIES_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Property', 'Favourite', 'User'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => PROPERTIES_URL,
      providesTags: ['Property'],
    }),
    // Additional endpoints can be defined here
  }),
});

export const { useGetPropertiesQuery } = apiSlice;








// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL, PROPERTIES_URL } from '../constants.js';

// const baseQuery = fetchBaseQuery({ 
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userInfo?.token;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ['Property', 'Favourite', 'User'],
//   endpoints: (builder) => ({
//     getProperties: builder.query({
//       query: () => PROPERTIES_URL,
//       providesTags: ['Property'],
//     }),
//     // Additional endpoints can be defined here
//   }),
// });

// export const { useGetPropertiesQuery } = apiSlice;





// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL, PROPERTIES_URL } from '../constants.js';

// const baseQuery = fetchBaseQuery({ 
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userInfo?.token;
//     headers.set('Access-Control-Allow-Origin', '*');
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ['Property', 'Favourite', 'User'],
//   endpoints: (builder) => ({
//     getProperties: builder.query({
//       query: () => PROPERTIES_URL,
//       providesTags: ['Property'],
//     }),
//     // Additional endpoints can be defined here
//   }),
// });

// export const { useGetPropertiesQuery } = apiSlice;






// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL, PROPERTIES_URL } from '../constants.js';

// const baseQuery = fetchBaseQuery({ 
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userInfo?.token;
//     headers.set('Access-Control-Allow-Origin', '*');
//     return {
//      ...headers,
//       Authorization: `Bearer ${token}`,
//     };
//   },
//  });

// export const apiSlice = createApi({
//     baseQuery,
  
//     tagTypes: ['Property', 'Favourite', 'User'],
//     endpoints: (builder) => ({
//       getProperties: builder.query({
//         query: () => PROPERTIES_URL,
//         providesTags: ['Property'],
//       }),
//       // Additional endpoints can be defined here
//     }),
//   });
  
//   export const { useGetPropertiesQuery } = apiSlice;
  

// // export const apiSlice = createApi({
// //     baseQuery,
// //     tagTypes: ['Property','Favourite', 'User'],
// //     endpoints: (builder) => ({}),
// // });