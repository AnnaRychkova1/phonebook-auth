import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://phonebook-auth-api.onrender.com/api',
});

const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

const requestSignUp = async formData => {
  const { data } = await instance.post('/users/signup', formData);
  setToken(data.token);
  return data;
};

const requestSignIn = async formData => {
  const { data } = await instance.post('/users/login', formData);
  setToken(data.token);
  return data;
};

const requestLogOut = async () => {
  await instance.post('/users/logout');
};

const requestGetCurrentUser = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

export {
  instance,
  setToken,
  requestSignUp,
  requestSignIn,
  requestLogOut,
  requestGetCurrentUser,
  clearToken,
};
