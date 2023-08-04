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
import axios from "axios";
// import axios from "axios";

// navigation 등록
const SignUpScreen = ({ navigation }) => {
  // 이메일, 인증번호, 에러메시지 투명도, 버튼 컬러 변경, 인증상태
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [nickname] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("이미 존재하는 이메일입니다.");
  const [verificationResponse, setVerificationResponse] = useState(null);

  const sendVerificationCode = async () => {
    try {
      const requestData = {
        email: email,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/user/join/email",
        requestData
      );
      console.log("인증번호 전송 성공:", response.data);
      setVerificationResponse(response.data);
      setIsCodeVerified(true);
      setErrorOpacity(0);
    } catch (error) {
      console.error("인증번호 전송 실패", error);
      setIsCodeVerified(false);
      setErrorOpacity(100);
      setVerifyError("이미 존재하는 이메일입니다.");
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
      console.log(verificationResponse);
      console.log(email);
      const requestData = {
        email: email,
        code: verifyNumber,
      };
      console.log(requestData.verificationCode);
      console.log("222");
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/user/join/emailcheck",
        requestData
      );
      console.log("인증번호 확인 성공:", response.data);

      // 서버에서 인증번호 확인이 성공한 경우 다음 페이지로 이동하도록 수정
      navigation.navigate("SignUpPassword", {
        SignUpData: {
          email: email,
          password: password,
          nickname: nickname,
        },
      });
      // console.log(SignUpData);
    } catch (error) {
      console.error("인증번호 확인 실패", error);
      setErrorOpacity(100);
      setVerifyError("인증번호가 일치하지 않습니다.");
    }
  };

  // // 비밀번호 설정으로 가기 위한 페이지
  // const goToSignUpPassword = () => {
  //   const SignUpData = {
  //     email: email,
  //     password: password,
  //     nickname: nickname,
  //   };
  //   // 인증완료 & 인증번호가 데이터와 같다면
  //   if (
  //     isCodeVerified &&
  //     verifyNumber === verificationResponse?.data[0]?.code
  //   ) {
  //     // 페이지 이동
  //     navigation.navigate("SignUpPassword", {
  //       SignUpData: SignUpData,
  //     });
  //   } else {
  //     // 오류 메세지
  //     setErrorOpacity(100);
  //     setVerifyError("인증번호가 일치하지 않습니다.");
  //     console.log("인증번호가 일치하지 않습니다.");
  //   }
  // };

  // 이메일을 작성하고 바꿀 수도 있으므로
  useEffect(() => {
    // 작성한 이메일 변경시 인증번호 상태가 false
    setIsCodeVerified(false);
  }, [email]);

  return (
    // 배경
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.arrowTextContainer}>
            {/* 뒤로가기 */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={28} color="#fff" />
            </TouchableOpacity>
            <CookieRunRegular style={styles.headerPageNumber}>
              회원가입 ( 1 / 3 )
            </CookieRunRegular>
          </View>
        </View>
      </View>
      {/* 쑥쑥 로고 */}
      <View style={styles.logoPadding}>
        <Image source={require("../../assets/img/LogoWhite.png")} />
      </View>
      <View style={styles.logincontainer}>
        <View style={styles.loginInlineBlock}>
          {/* 이메일 입력 칸 */}
          <TextInput
            style={styles.emailJoinInputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="email"
          ></TextInput>
          {/* 인증 버튼 보내기 */}
          <TouchableOpacity
            onPress={() => {
              setNextButtonColor("#2DD0AF");
              sendVerificationCode();
            }}
            style={styles.verifyButton}
          >
            <CookieRunRegular style={styles.verifyText}>인증</CookieRunRegular>
          </TouchableOpacity>
        </View>
        {/* 인증번호 입력 칸 */}
        <TextInput
          style={styles.loginIDInputBox}
          onChangeText={setVerifyNumber}
          value={verifyNumber}
          placeholder="인증번호를 입력해주세요."
        ></TextInput>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          {verifyError}
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

export default SignUpScreen;
