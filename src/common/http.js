import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if(token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if(config.url === '/logout') {
    localStorage.removeItem('token');
  }
  return config;
})

axios.interceptors.response.use(function (response) {
  const token = response.data.token;
  if(token) {
    localStorage.setItem('token', token);
  }
  return response;
}, function (error) {
  if(error.response.status === 401) {
    return axios.get('/refresh', DEFAULT_CONFIG).then(({data}) => {
      localStorage.setItem('token', data.token);
      return axios.request(error.config)
    })
  }
  return Promise.reject(error);
});

function post(url, body) {
  return axios.post(url, body, DEFAULT_CONFIG).then(({data}) => data);
}

function get(url) {
  return axios.get(url, DEFAULT_CONFIG).then(({data}) => data);
}

export default {
  get,
  post
}