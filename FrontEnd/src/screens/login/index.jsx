import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import customAxios from "../../utils/axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);

  // useEffect(() => {
  //   // 컴포넌트가 로딩될 때 자동 로그인을 시도합니다.
  //   tryAutoLogin();
  // }, []);

  // const tryAutoLogin = async () => {
  //   // AsyncStorage에서 저장된 토큰 정보를 불러옵니다.
  //   const accessToken = await AsyncStorage.getItem("accessToken");
  //   const refreshToken = await AsyncStorage.getItem("refreshToken");

  //   console.log("accesstoken : " + accessToken);
  //   console.log("refreshToken : " + refreshToken);
  //   if (accessToken && refreshToken) {
  //     // 토큰이 유효한지 백엔드 서버로 확인 요청을 보냅니다.
  //     try {
  //       console.log("오나요?1");
  //       const response = await axios.post(
  //         "http://i9b102.p.ssafy.io:8080/auth",
  //         {
  //           accessToken,
  //           refreshToken,
  //         }
  //       );
  //       console.log("오나요?2");
  //       console.log("console1 :" + response.data);
  //       if (response.data.valid) {
  //         // 토큰이 유효하다면, 자동 로그인 처리를 진행합니다.
  //         navigation.navigate("Pot");
  //       } else {
  //         // 토큰이 유효하지 않다면, AsyncStorage에서 토큰을 제거합니다.
  //         await AsyncStorage.removeItem("accessToken");
  //         await AsyncStorage.removeItem("refreshToken");
  //       }
  //     } catch (error) {
  //       console.error("토큰 검증에 실패했습니다:", error);
  //     }
  //   }
  // };

  const handleSignIn = async () => {
    try {
      console.log("console2 :" + email, password);
      const requestData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/auth",
        requestData
      );

      console.log("console3 :" + response.data);
      const { accessToken, refreshToken } = response.data.data;

      // 받아온 토큰 정보를 AsyncStorage에 저장합니다.
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      const value = await AsyncStorage.getItem("accessToken");
      navigation.navigate("Pot");
      console.log("console4 :" + value);
    } catch (error) {
      console.error("서버에서 데이터를 받아오는데 실패했습니다:", error);
      console.log("console5 :" + error.data);
      setErrorOpacity(100);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View>
        <Image
          source={require("../../assets/img/LogoWhite.png")}
          style={styles.logoWhiteSize}
        />
      </View>
      <View style={styles.logincontainer}>
        <Text style={[styles.loginErrorMessage, { opacity: errorOpacity }]}>
          아이디 혹은 비밀번호가 올바른지 확인해주세요
        </Text>
        <TextInput
          style={styles.loginIDInputBox}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        ></TextInput>
        <TextInput
          style={styles.loginIDInputBox}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity
          style={styles.singInButton}
          activeOpacity={0.3}
          onPress={() => {
            setErrorOpacity(0);
            handleSignIn();
          }}
        >
          <Text style={styles.singInButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.divideLine}></View>
        <TouchableOpacity
          style={styles.kakaoLoginButton}
          activeOpacity={0.3}
          onPress={() => {
            navigation.navigate("KakaoLogin");
          }}
        >
          <Text style={styles.kakaoLoginButtonText}>카카오 로그인</Text>
        </TouchableOpacity>
        <View style={styles.loginSubContainer}>
          <View style={styles.subJoin}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.loginSubText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subFind}>
            <TouchableOpacity
              onPress={() => navigation.navigate("PasswordFind")}
            >
              <Text style={styles.loginSubText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
