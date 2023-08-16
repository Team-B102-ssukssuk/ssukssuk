import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let tokenExpiredCallback = null;

// Set a callback function to be called when token expires
export function setTokenExpiredCallback(callback) {
  tokenExpiredCallback = callback;
}

// 로컬 스토리지에 accessToken 값 추출
export async function getAccessToken() {
  const value = await AsyncStorage.getItem("accessToken");
  return value;
}

// baseURL 설정
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

// refreshtoken을 통한 accessToken 재발급
export async function postRefreshToken() {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const response = await axios.post(
      "http://i9b102.p.ssafy.io:8080/user/token",
      {},
      {
        headers: {
          // 헤더값 추가
          Authorization: refreshToken,
        },
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

    console.log("응답 : " + status);
    console.log(error.response.data.statusName);

    if (status === 400 || status === 409) {
      if (
        error.response.data.statusName === "EXPIRED_AUTH_TOKEN" ||
        error.response.data.statusName === "NOT_FOUND_AUTH_TOKEN"
      ) {
        if (tokenExpiredCallback) {
          const response = await postRefreshToken();
          console.log(response.status);
          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            AsyncStorage.setItem("accessToken", newAccessToken);
            AsyncStorage.setItem("refreshToken", response.data.refreshToken);
            console.log("성공");
            customAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return customAxios(config);
          } else if (response.status === 409) {
            tokenExpiredCallback(); // Call the callback to handle token expiration
          } else {
            // alert("Unexpected reason.");
            tokenExpiredCallback();
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
