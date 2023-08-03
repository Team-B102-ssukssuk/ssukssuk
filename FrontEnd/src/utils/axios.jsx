import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get the access token from AsyncStorage
export async function getAccessToken() {
  const value = await AsyncStorage.getItem("accessToken");
  return value;
}

// Axios instance with baseURL and interceptor to add Authorization header
export const customAxios = axios.create({
  baseURL: `http://i9b102.p.ssafy.io:8080`,
});

// Add an interceptor to the request to set the Authorization header with the access token
customAxios.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Function to make a token renewal request
export async function postRefreshToken() {
  try {
    const response = await axios.post(
      "http://i9b102.p.ssafy.io:8080/api/v1/auth/refresh",
      {
        refreshToken: AsyncStorage.getItem("refreshToken"),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

// Add an interceptor to handle token expiration and renewal
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (error.response.data.message === "Unauthorized") {
        const originRequest = config;
        const response = await postRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          AsyncStorage.setItem("accessToken", newAccessToken);
          AsyncStorage.setItem("refreshToken", response.data.refreshToken);
          customAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return customAxios(originRequest);
        } else if (response.status === 404) {
          alert("Token expired.");
          // Perform any additional handling here, e.g., redirect to sign-in page
        } else {
          alert("Unexpected reason.");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
