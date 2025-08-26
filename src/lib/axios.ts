import { envConfig } from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response.status === 401 &&
      error.response.data.message === "Token has expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh-token");

        processQQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error refreshing token:", error);
        processQQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);
