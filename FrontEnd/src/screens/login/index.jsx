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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);

  return (
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View>
        <Image source={require("../../assets/img/LogoWhite.png")} />
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
        ></TextInput>
        <TouchableOpacity
          style={styles.singInButton}
          activeOpacity={0.3}
          onPress={() => {
            setErrorOpacity(100);
          }}
        >
          <Text style={styles.singInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
        <View style={styles.divideLine}></View>
        <TouchableOpacity
          style={styles.kakaoLoginButton}
          activeOpacity={0.3}
          onPress={() => {
            setErrorOpacity(100);
          }}
        >
          <Text style={styles.kakaoLoginButtonText}>카카오 로그인</Text>
        </TouchableOpacity>
        <View style={styles.loginSubContainer}>
          <View style={styles.subJoin}>
            <Text style={styles.loginSubText}>회원가입</Text>
          </View>
          <View style={styles.subFind}>
            <Text style={styles.loginSubText}>아이디 찾기</Text>
            <View style={styles.verticalLine}></View>
            <Text style={styles.loginSubText}>비밀번호 찾기</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
