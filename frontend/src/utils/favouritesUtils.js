// export const updateFavourite = (state) => {
//     // Save the cart to localStorage
//     localStorage.setItem('favourites', JSON.stringify(state));
  
//     return state;
//   };
  

// export const updateFavourite = (favouriteItems) => {
//     localStorage.setItem('favourites', JSON.stringify(favouriteItems));
//   };


export const updateFavourite = (favouriteItems) => {
    localStorage.setItem('favourites', JSON.stringify(favouriteItems));
  };