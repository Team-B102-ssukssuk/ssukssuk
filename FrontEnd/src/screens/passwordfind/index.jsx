import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import CookieRunRegular from "../../components/common/CookieRunRegular";
import axios from "axios";

const PasswordFindScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("존재하지 않는 이메일입니다.");
  const [verificationResponse, setVerificationResponse] = useState(null);

  const sendVerificationCode = async () => {
    try {
      console.log(verificationResponse);
      console.log(email);
      const requestData = {
        email: email,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/user/password/email",
        requestData
      );
      console.log("인증번호 전송 성공:", response.data);
      setVerificationResponse(response.data);
      setIsCodeVerified(true);
      setErrorOpacity(0);
      setNextButtonColor("#2DD0AF");
    } catch (error) {
      console.error("인증번호 전송 실패", error);
      setIsCodeVerified(false);
      setErrorOpacity(100);
      console.log(verifyError);
      setVerifyError("존재하지 않는 이메일입니다.");
    }
  };

  const goToSignUpPassword = () => {
    if (!isCodeVerified) {
      setErrorOpacity(100);
      setVerifyError("인증번호가 일치하지 않습니다.");
      console.log("인증번호가 일치하지 않습니다.");
      return;
    }

    // 인증되었으면 인증번호 확인 요청 보내기
    checkVerificationCode();
  };

  const checkVerificationCode = async () => {
    try {
      const requestData = {
        email: email,
        verificationCode: verifyNumber,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/user/password/emailcheck",
        requestData
      );
      console.log("인증번호 확인 성공:", response.data);

      // 서버에서 인증번호 확인이 성공한 경우 다음 페이지로 이동하도록 수정
      navigation.navigate("PasswordMake", {
        SignUpData: {
          email: email,
          password: password,
        },
      });
      // console.log(SignUpData);
    } catch (error) {
      console.error("인증번호 확인 실패", error);
      setErrorOpacity(100);
      setVerifyError("인증번호가 일치하지 않습니다.");
    }
  };

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
              비밀번호 찾기 ( 1 / 2 )
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
            style={styles.emailJoinInputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="email"
          ></TextInput>
          <TouchableOpacity
            onPress={sendVerificationCode}
            style={styles.verifyButton}
          >
            <CookieRunRegular style={styles.verifyText}>인증</CookieRunRegular>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.loginIDInputBox}
          onChangeText={setVerifyNumber}
          value={verifyNumber}
          placeholder="인증번호를 입력해주세요."
        ></TextInput>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          인증번호가 일치하지 않습니다.
        </Text>
        <TouchableOpacity
          style={[styles.emailNextButton, { backgroundColor: nextButtonColor }]}
          activeOpacity={0.3}
          onPress={goToSignUpPassword}
        >
          <CookieRunRegular style={styles.emailNextButtonText}>
            다음
          </CookieRunRegular>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PasswordFindScreen;
