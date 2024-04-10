import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const requestSignUp = async formData => {
  const { data } = await instance.post('/users/signup', formData);
  setToken(data.token);

  return data;
};

export const requestSignIn = async formData => {
  const { data } = await instance.post('/users/login', formData);
  setToken(data.token);

  return data;
};

export const requestGetCurrentUser = async () => {
  const { data } = await instance.get('/users/current');

  return data;
};

export const requestLogOut = async () => {
  const { data } = await instance.post('/users/logout');

  return data;
};

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
    try {
      await axios.post('/users/logout');
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
