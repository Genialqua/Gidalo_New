import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import favouritesSliceReducer from "./slices/favouritesSlice.js";
import authSliceReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    favourite: favouritesSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;
