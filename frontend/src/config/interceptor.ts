import api from "./api";

api.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add an auth token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // You can handle successful responses here
    return response;
  },
  (error) => {
    // You can handle errors here
    if (error.response.status === 401) {
      // e.g., redirect to login
    }
    return Promise.reject(error);
  },
);
