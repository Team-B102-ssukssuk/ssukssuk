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
import React from "react";
import WebView from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REST_API_KEY = "a12d292510e3111fe093a99ff91e118b";
const URI = "http://i9b102.p.ssafy.io:8082/kakao/code";
const REDIRECT_URI = "http://i9b102.p.ssafy.io:8082/kakao";

const KakaoLoginScreen = ({ navigation }) => {
  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
  const LogInProgress = (data) => {
    // access code는 url에 붙어 장황하게 날아온다.

    // substringd으로 url에서 code=뒤를 substring하면 된다.
    const exp = "code=";

    var condition = data.indexOf(exp);

    if (condition != -1) {
      console.log("코드 추출");
      const request_code = data.substring(condition + exp.length);
      console.log("인가 코드 : " + request_code);

      // 토큰값 받기
      setTimeout(function () {
        requestToken(request_code);
      }, 1500);
    }
  };

  const requestToken = async (request_code) => {
    try {
      console.log("토큰 발급");
      const response = await axios.post(URI, {
        code: request_code,
      });

      console.log("response.data : ", response.data);

      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

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
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          console.log(event.nativeEvent["url"]);
          LogInProgress(event.nativeEvent["url"]);
        }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};

export default KakaoLoginScreen;
