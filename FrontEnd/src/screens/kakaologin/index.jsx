// 컴포넌트 생성
// KAKAOLOGINSCREEN 컴포
// 웹뷰로 카카오 로그인 페이지 로드

// 사용자가 로그인 인증 완료시 해당 결과를 받아오는 로직 작성
// 웹뷰에서 인증 완료 >> 콜백 활용 >>
// >> 토큰 정보 받아옴 >> ASYNCSTORAGE 저장
// >> 성공 : LOGINSCREEN 컴포로 돌아감 ( 우리는 POT으로 하면 되지 않을까.. )

// 네비게이션 구조 조정
// >> 기존 LOGINSCREEN 컴포넌트에서 로그인 처리한것을
// >> 카카오 로그인은 웹뷰므로 별도 컴포넌트 분리
// >> 따라서 loginscreen과 kakaologinscreen컴포를 네비게이션 구조에 추가
// >> loginscreen 에서는 카카오 로그인 화면으로 이동하는 버튼 추가

import { View, Alert } from "react-native";
import React, { useState } from "react";
// import styles from "./style";
import WebView from "react-native-webview";
import axios from "axios";

// other import settings...

const REST_API_KEY = "a12d292510e3111fe093a99ff91e118b";
const REDIRECT_URI = "http://localhost:8080/user/kakao/callback";

const KakaoLoginScreen = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState(null);

  console.log(accessToken);

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
  const LogInProgress = (data) => {
    // access code는 url에 붙어 장황하게 날아온다.

    // substringd으로 url에서 code=뒤를 substring하면 된다.

    const exp = "code=";

    const condition = data.indexOf(exp);

    if (condition != -1) {
      const request_code = data.substring(condition + exp.length);

      // console.log("access code :: " + request_code);

      // 토큰값 받기

      requestToken(request_code);
    }
  };

  const requestToken = async (request_code) => {
    const request_token_url = "https://kauth.kakao.com/oauth/token";

    try {
      const response = await axios.post(request_token_url, {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: request_code,
      });

      const token = response.data.access_token;
      setAccessToken(token);
      navigation.navigate("Pot"); // 로그인 성공 후 MainScreen으로 이동
    } catch (error) {
      console.error("토큰 요청에 실패했습니다:", error);
      Alert.alert("로그인 실패", "카카오 로그인에 실패했습니다.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LogInProgress(event.nativeEvent["url"]);
        }}

        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};

export default KakaoLoginScreen;
