import axios from "axios";
import { QueryClient } from "react-query";

let language = localStorage.getItem('Lang_Pay')


let token =
typeof window !== "undefined" && localStorage.getItem("JWT_Pay");

window.addEventListener('storage', (event) => {
  if (event.key === 'JWT_Pay') {
    window.location.reload()   
  }
});

export const requestPayzone = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BASE_URL_PAYZONE,
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : undefined),
    'lang': language || 'en',
  },
});

const errorHandler = (error) => {
  return Promise.reject(error.response);
};

requestPayzone.interceptors.response.use(
  (response) => response.data,
  errorHandler
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});


// export const requestPayzone = axios.create({
//   baseURL: process.env.REACT_APP_PUBLIC_BASE_URL_PAYZONE,
// });

// requestPayzone.interceptors.request.use((config) => {
//   const updatedToken = localStorage.getItem('JWT_Pay');
//   if (updatedToken) {
//     config.headers.Authorization = `Bearer ${updatedToken}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
