// let index = import.meta.url.replace("file:///", "").split("/").indexOf("src");
// let path =
//   import.meta.url.replace("file:///", "").split("/").slice(0, index).join("/") +
//   "/former.config.js";
// console.log(path);
// import(path)
//   .then((config) => {
//     // Use the imported config module here
//     axios = config.axios;
//     console.log(config);
//   })
//   .catch((error) => {
//     console.log(error);
//     // Handle any errors that occur during the import
//   });

let axios = {};
export const getAxiosConfig = (axiosConfig) => {
  axios = axiosConfig;
};
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
