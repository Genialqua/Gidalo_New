import { createSlice } from "@reduxjs/toolkit";
import { updateFavourite } from "../utils/favouritesUtils.js";

const initialState = localStorage.getItem('favourite') 
  ? JSON.parse(localStorage.getItem('favourite')) 
  : { favouriteItems: [] };

const favouritesSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const item = action.payload;

      const existItem = state.favouriteItems.find((x) => x._id === item._id);

      if (existItem) {
        state.favouriteItems = state.favouriteItems.map((x) => 
          x._id === existItem._id ? item : x
        );
      } else {
        state.favouriteItems = [...state.favouriteItems, item];
      }

      // Update the local storage after modifying the state
      updateFavourite(state.favouriteItems);
    },
    removeFromFavourites: (state, action) => {
      state.favouriteItems = state.favouriteItems.filter((x) => x._id !== action.payload);

      // Update the local storage after modifying the state
      updateFavourite(state.favouriteItems);
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";
// import { updateFavourite } from "../utils/favouritesUtils.js";

// const initialState = localStorage.getItem('favourites') 
//   ? JSON.parse(localStorage.getItem('favourites')) 
//   : { favouriteItems: [] };

// const favouritesSlice = createSlice({
//   name: 'favourites',
//   initialState,
//   reducers: {
//     addToFavourites: (state, action) => {
//       const item = action.payload;

//       const existItem = state.favouriteItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.favouriteItems = state.favouriteItems.map((x) => 
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.favouriteItems = [...state.favouriteItems, item];
//       }
//         return updateFavourite(state, item);
//       // localStorage.setItem('favourites', JSON.stringify(state));
//     },
//     removeFromFavourites: (state, action) => {
//       state.favouriteItems = state.favouriteItems.filter((x) => x._id !== action.payload);
//       localStorage.setItem('favourites', JSON.stringify(state.favouriteItems));
//     },
//   },
// });

// export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

// export default favouritesSlice.reducer;

