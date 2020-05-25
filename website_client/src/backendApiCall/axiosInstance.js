import axios from 'axios';
const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    authorization: '',
  },
});
export default axiosInstance;
