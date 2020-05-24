import axios from 'axios';
const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    authorization: '',
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    console.log('error');
    console.log(error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
