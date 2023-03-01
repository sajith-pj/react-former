var config = require("config-file");
var axios = config("former.config.js");
console.log(axios);
const get = (api, config) => {
  return axios.get(api, config);
};

const post = (api, body, config) => {
  return axios.post(api, body, config);
};

export const axiosInstance = { get, post };

export const getAxios = (method) => {
  switch (method.toLowerCase()) {
    case "get":
      return get;
    case "post":
      return post;
    default:
      return get;
  }
};
