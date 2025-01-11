import axios from "axios";

export const backend = axios.create({
  baseURL: "https://json-api.uz/api/project/blog-api/articles",
});

backend.interceptors.request.use((config) => {
  let userData = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : "";
  let authToken = userData?.access_token;
  if (authToken) {
    config.headers.Authoriation = `Bearer ${authToken}`;
  }
  return config;
});

backend.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status == 401) {
      // handle unauthorized acces
    } else if (status == 400) {
      // handle not found errors
    } else {
      // handle other errors
    }
    return Promise.reject(error);
  }
);
