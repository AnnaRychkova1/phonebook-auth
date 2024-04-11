import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setToken,
  clearToken,
  requestGetCurrentUser,
  requestLogOut,
  requestSignIn,
  requestSignUp,
} from '../../services/userApi';

const apiRegisterUser = createAsyncThunk(
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

const apiLoginUser = createAsyncThunk(
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

const apiLogoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await requestLogOut();
    clearToken();
    return;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const apiRefreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    setToken(token);
    try {
      const data = await requestGetCurrentUser();

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true;
    },
  }
);

export { apiLoginUser, apiLogoutUser, apiRegisterUser, apiRefreshUser };
