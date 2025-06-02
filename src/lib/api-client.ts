import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.BACKEND_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      return Promise.reject(error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
