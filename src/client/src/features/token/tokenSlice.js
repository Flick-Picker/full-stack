import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        uid: null,
        email: null,
        accessToken: null,
        refreshToken: null,
        expirationTime: null,
    },
    reducers: {
        init: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expirationTime = action.payload.expirationTime;
        },
        remove: (state) => {
            state.uid = null;
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.expirationTime = null;
        }
    },
})

export const { init, remove } = tokenSlice.actions;

export const selectUid = (state) => state.token.uid;
export const selectEmail = (state) => state.token.email;
export const selectAccessToken = (state) => state.token.accessToken;
export const selectrefreshToken = (state) => state.token.refreshToken;
export const selectExpirationTime= (state) => state.token.expirationTime;

export default tokenSlice.reducer;
