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
import CookieRunRegular from "../../components/common/CookieRunRegular";

const SignUpPasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  // const [nickname] = useState("");
  const [PasswordRe, setPasswordRe] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");

  const { SignUpData } = route.params;
  // const { email } = SignUpData;

  // 세팅된 비밀번호 값이 동일하면 서버로 데이터 보내주기

  const checkPassword = () => {
    if (password === PasswordRe && password !== "") {
      const updatedSignUpData = {
        ...SignUpData,
        password: password,
      };
      navigation.navigate("SignUpNickname", {
        SignUpData: updatedSignUpData,
      });
      console.log(SignUpData);
    } else {
      setErrorOpacity(100);
      console.log(SignUpData);
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
            <CookieRunRegular style={styles.headerPageNumber}>
              회원가입 ( 2 / 3 )
            </CookieRunRegular>
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
            placeholder="비밀번호"
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
          onPress={checkPassword}
        >
          <CookieRunRegular style={styles.emailNextButtonText}>
            다음
          </CookieRunRegular>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpPasswordScreen;
