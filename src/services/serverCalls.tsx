import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "http://localhost:8080/api";
const authToken = localStorage.getItem("authToken");

const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${authToken}`, // Include authorization token in the header
  },
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  // You can modify the request here if needed
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  if (response.status === 401 || response.status === 403) {
    // Redirect or handle unauthorized/forbidden responses
  }
  return response;
};

const requestErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      // Redirect or handle unauthorized/forbidden responses
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error),
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => responseErrorHandler(error),
);

export default customAxios;
