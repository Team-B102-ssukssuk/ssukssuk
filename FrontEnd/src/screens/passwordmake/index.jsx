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
  const [verifyError, setVerifyError] = useState(
    "최소 8글자 대소문자, 특수문자, 숫자 포함"
  );
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { SignUpData } = route.params;

  // const isNextButtonDisabled = PasswordRe.length < 8 && password.length < 8;

  const isNextButtonDisabled = PasswordRe.length < 8 || password.length < 8;

  const makeNewPassword = async () => {
    try {
      if (password === PasswordRe && password !== "" && isPasswordValid) {
        setErrorOpacity(0);
        setNextButtonColor("#2DD0AF");
        console.log("만들어~ : " + isPasswordValid);
        {
          const requestData = {
            email: SignUpData.email,
            password: password,
          };
          const response = await axios.put(
            "http://i9b102.p.ssafy.io:8080/auth/password",
            requestData
          );
          console.log(response.message);
          console.log("로긴 갔지롱");
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.error("에러날 게 있나", error);
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
      setIsPasswordValid(false);
    } else if (password === PasswordRe && password !== "" && isPasswordValid) {
      setNextButtonColor("#2DD0AF");
      setErrorOpacity(0);
      setVerifyError("");
      setIsPasswordValid(true);
    } else if (password === PasswordRe && password !== "" && !isPasswordValid) {
      setErrorOpacity(100);
      setNextButtonColor("#CACACA");
      setVerifyError("최소 8글자 대소문자, 특수문자, 숫자 포함");
      setIsPasswordValid(false);
    } else {
      setNextButtonColor("#CACACA");
      setErrorOpacity(100);
      setVerifyError("비밀번호가 일치하지 않습니다.");
      setIsPasswordValid(false);
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
            <Text style={styles.headerPageNumber}>비밀번호 찾기 ( 2 / 2 )</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoPadding}>
        <Image
          source={require("../../assets/img/LogoWhite.png")}
          style={styles.logoWhiteSize}
        />
      </View>
      <View style={styles.logincontainer}>
        <View style={styles.loginInlineBlock}>
          <TextInput
            style={styles.passwordInputBox}
            onChangeText={setPassword}
            value={password}
            placeholder="새로운 비밀번호"
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
          style={[
            styles.emailNextButton,
            { backgroundColor: nextButtonColor },
            isNextButtonDisabled ? { opacity: 0.5 } : {},
          ]}
          activeOpacity={0.3}
          onPress={makeNewPassword}
          disabled={isNextButtonDisabled}
        >
          <Text style={styles.emailNextButtonText}>변경</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PasswordMakeScreen;
