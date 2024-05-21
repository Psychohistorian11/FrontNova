import axios from 'axios';

export const baseUrl = 'http://127.0.0.1:8000'

export const imageUrlApi = `${baseUrl}/static/images`

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

export default api;