import { createSlice } from '@reduxjs/toolkit';
import { apiLoginUser, apiRefreshUser, apiRegisterUser } from './operations';

const INITIAL_STATE = {
  userData: null,
  token: null,
  isSignedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      //   REGISTER
      .addCase(apiRegisterUser.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiRegisterUser.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
      //   LOGIN
      .addCase(apiLoginUser.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiLoginUser.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
      //   REFRESH
      .addCase(apiRefreshUser.pending, state => {
        state.isRefreshing = true;
        state.isError = false;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.userData = action.payload;
        state.isSignedIn = true;
      })
      .addCase(apiRefreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isError = true;
      }),
});

export const authReducer = authSlice.reducer;
