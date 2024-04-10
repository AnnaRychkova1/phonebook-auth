import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearToken,
  requestGetCurrentUser,
  requestLogOut,
  requestSignIn,
  requestSignUp,
  setToken,
} from '../../services/userApi';

export const apiRegisterUser = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignUp(formData);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignIn(formData);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (token === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    setToken(token);
    try {
      const data = await requestGetCurrentUser();
      console.log('data: ', data);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiLogOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    clearToken();
    try {
      const data = await requestLogOut();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
