import React, { useEffect } from "react";
import { View, Alert, BackHandler } from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const REST_API_KEY = "a12d292510e3111fe093a99ff91e118b";
const URI = "http://i9b102.p.ssafy.io:8080/auth/kakao/login";
const REDIRECT_URI = "http://i9b102.p.ssafy.io:8080/auth/kakao";

const KakaoLoginScreen = () => {
  const navigation = useNavigation();

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  const LogInProgress = (data) => {
    const exp = "code=";
    var condition = data.indexOf(exp);

    if (condition !== -1) {
      console.log("Extract Code");
      const request_code = data.substring(condition + exp.length);
      console.log("Authorization code: " + request_code);

      setTimeout(function () {
        requestToken(request_code);
      }, 1500);
    }
  };

  const requestToken = async (request_code) => {
    try {
      console.log("Issue Token");
      const response = await axios.post(URI, {
        code: request_code,
      });

      console.log("response.data:", response.data);

      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      navigation.navigate("Pot"); // Go to MainScreen after successful login
    } catch (error) {
      console.error("Token request failed:", error);
      Alert.alert("Login failed", "Kakao login failed");
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [navigation])
  );

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
      />
    </View>
  );
};

export default KakaoLoginScreen;
