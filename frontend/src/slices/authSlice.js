import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {

            state.userInfo = action.payload;
            // state.userInfo = {
            //     ...action.payload.userInfo,
            //     token: action.payload.token, // Add the token here
            // };
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;