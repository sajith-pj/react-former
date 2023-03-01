import axios from "axios";

// axios instance for making requests
const axiosInstance = axios.create();
// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  config.baseURL = `https://data.relivaglobal.com/api`;
  config.headers = Object.assign(
    {
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    config.headers
  );
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const config = { axios: axiosInstance };
export default config;
