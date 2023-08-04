import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import axios from "axios";

const PasswordMakeScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [PasswordRe, setPasswordRe] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");

  const { SignUpData } = route.params;

  const makeNewPassword = async () => {
    try {
      if (password === PasswordRe && password !== "") {
        const requestData = {
          email: SignUpData.email,
          password: password,
        };
        const response = await axios.put(
          "http://i9b102.p.ssafy.io:8080/user/password",
          requestData
        );
        navigation.navigate("Login");
        console.log(response);
      } else {
        setErrorOpacity(100);
        return;
      }
    } catch (error) {
      console.error("에러날 게 있나", error);
    }
  };

  useEffect(() => {
    if (password === "" && PasswordRe === "") {
      setNextButtonColor("#CACACA");
    } else {
      setNextButtonColor("#2DD0AF");
    }
  }, [password, PasswordRe]);

  return (
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.arrowTextContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerPageNumber}>비밀번호 찾기 ( 2 / 2 )</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoPadding}>
        <Image source={require("../../assets/img/LogoWhite.png")} />
      </View>
      <View style={styles.logincontainer}>
        <View style={styles.loginInlineBlock}>
          <TextInput
            style={styles.passwordInputBox}
            onChangeText={setPassword}
            value={password}
            placeholder="새로운 비밀번호"
          ></TextInput>
        </View>
        <TextInput
          style={styles.passwordInputBox}
          onChangeText={setPasswordRe}
          value={PasswordRe}
          placeholder="비밀번호 확인"
        ></TextInput>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          비밀번호가 일치하지 않습니다.
        </Text>
        <TouchableOpacity
          style={[styles.emailNextButton, { backgroundColor: nextButtonColor }]}
          activeOpacity={0.3}
          onPress={makeNewPassword}
        >
          <Text style={styles.emailNextButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PasswordMakeScreen;
