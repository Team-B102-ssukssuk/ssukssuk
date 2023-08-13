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
  const [errorOpacity, setErrorOpacity] = useState(100);
  const [verifyError, setVerifyError] = useState(
    "최소 8글자 대소문자, 특수문자, 숫자 포함"
  );
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { SignUpData } = route.params;
  // const { email } = SignUpData;
  // 세팅된 비밀번호 값이 동일하면 서버로 데이터 보내주기

  const checkPassword = () => {
    if (password === PasswordRe && password !== "" && isPasswordValid) {
      setErrorOpacity(0);
      setNextButtonColor("#2DD0AF");
      const updatedSignUpData = {
        ...SignUpData,
        password: password,
      };
      navigation.navigate("SignUpNickname", {
        SignUpData: updatedSignUpData,
      });
      console.log(SignUpData);
    } else if (password === PasswordRe && password !== "" && !isPasswordValid) {
      setErrorOpacity(100);
      setNextButtonColor("#CACACA");
      setVerifyError("최소 8글자 대소문자, 특수문자, 숫자 포함");
    } else if (password !== PasswordRe && password !== "" && isPasswordValid) {
      setErrorOpacity(100);
      setNextButtonColor("#CACACA");
      setVerifyError("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorOpacity(100);
      setNextButtonColor("#CACACA");
      console.log(SignUpData);
    }
  };

  const validatePasswordComplexity = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 추가된 부분

    const isComplexEnough =
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecial; // 모든 조건을 충족해야 true가 됩니다

    setIsPasswordValid(isComplexEnough);

    if (isComplexEnough) {
      setErrorOpacity(0);
      setVerifyError("");
      setIsPasswordValid(true);
    } else {
      setErrorOpacity(100);
      setIsPasswordValid(false);
    }
  };

  useEffect(() => {
    if (password === "" && PasswordRe === "") {
      setNextButtonColor("#CACACA");
      setErrorOpacity(100);
      setVerifyError("최소 8글자 대소문자, 특수문자, 숫자 포함");
    } else if (password === PasswordRe && password !== "" && isPasswordValid) {
      setNextButtonColor("#CACACA");
      setErrorOpacity(100);
      setVerifyError("비밀번호가 일치하지 않습니다.");
    } else if (password === PasswordRe && password !== "" && !isPasswordValid) {
      setErrorOpacity(100);
      setNextButtonColor("#CACACA");
      setVerifyError("최소 8글자 대소문자, 특수문자, 숫자 포함");
    } else {
      setNextButtonColor("#CACACA");
      setErrorOpacity(100);
      setVerifyError("비밀번호가 일치하지 않습니다.");
    }
    validatePasswordComplexity();
  }, [password, PasswordRe, isPasswordValid]);

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
            secureTextEntry={true}
          ></TextInput>
        </View>
        <TextInput
          style={styles.passwordInputBox}
          onChangeText={setPasswordRe}
          value={PasswordRe}
          placeholder="비밀번호 확인"
          secureTextEntry={true}
        ></TextInput>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          {verifyError}
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
