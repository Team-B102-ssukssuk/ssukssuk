import axios from "axios";

// 토큰이 필요한 API 요청을 보내는 axios 인스턴스
export const customAxios = axios.create({
  baseURL: `http://i9b102.p.ssafy.io:8080`,
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //   },
});

// 토큰 갱신 API
export async function postRefreshToken() {
  try {
    const response = await axios.post(
      "http://i9b102.p.ssafy.io:8080/api/v1/auth/refresh",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

// privateApi에 인터셉터를 적용하여 토큰을 함께 보냄
customAxios.interceptors.response.use(
  // 200번대 응답을 처리하는 부분
  (response) => {
    return response;
  },
  // 200번대 응답이 아닌 경우 처리하는 부분
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    // 토큰이 만료되었을 때
    if (status === 401) {
      if (error.response.data.message === "Unauthorized") {
        const originRequest = config;
        // 토큰 갱신 API 호출
        const response = await postRefreshToken();
        // 토큰 갱신 요청이 성공했을 때
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          customAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          // 진행 중인 요청을 이어서 처리
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return customAxios(originRequest);
        }
        // 토큰 갱신 요청이 실패했을 때 (토큰 갱신이 만료되었음 = 다시 로그인 안내)
        else if (response.status === 404) {
          alert("토큰만료.");
          window.location.replace("/sign-in");
        } else {
          alert("예기치 못한 이유.");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
