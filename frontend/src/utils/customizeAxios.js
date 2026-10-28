import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Kiểm tra mã lỗi từ response và xử lý:
    if (error.response) {
      if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
        const refresh_token = Cookies.get("refreshToken");
        if (refresh_token) {
          try {
            const res = await refreshToken(refresh_token);
            Cookies.set("accessToken", res.accessToken);

            error.config.headers.Authorization = `Bearer ${res.accessToken}`;
            return instance(error.config);
          } catch (error) {
            console.log(error);

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("user");
            // window.location.href = '/login';
            return Promise.reject(error);
          }
        }
      }
      // Trả về thông báo lỗi cho client
      const message =
        error.response.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Lỗi do không có phản hồi (thường gặp khi mất kết nối mạng)
      return Promise.reject(new Error("Không có phản hồi từ server"));
    } else {
      // Lỗi khác
      return Promise.reject(new Error(error.message));
    }
  },
);

export default instance;
