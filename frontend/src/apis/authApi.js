import instance from "../utils/customizeAxios.js";

const loginAPI = (email, password) => {
  const data = {
    email,
    password,
  };

  return instance.post("auth/login", data);
};

const registerAPI = (userName, email, password) => {
  const data = {
    userName,
    email,
    password,
  };

  return instance.post("auth/register", data);
};

const logoutAPI = () => {
  return instance.post("auth/logout");
};

const refreshAPI = (refreshToken = "") => {
  const data = {
    refreshToken: refreshToken,
  };

  return instance.post("auth/refreshtoken", data);
};

export { registerAPI, loginAPI, logoutAPI, refreshAPI };
