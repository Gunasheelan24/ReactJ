import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://indianairways_route.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
