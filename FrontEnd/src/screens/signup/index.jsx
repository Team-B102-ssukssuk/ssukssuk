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
import ToastNotification from "../../components/toast";
import { setTokenExpiredCallback } from "../../utils/axios";
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
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastContent, setToastContent] = useState("");
  const [toastIconName, setToastIconName] = useState("");

  const isNextButtonDisabled = verifyNumber.length < 8;

  const sendVerificationCode = async () => {
    try {
      const requestData = {
        email: email,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/auth/join/email",
        requestData
      );
      console.log("인증번호 전송 성공:", response.data);
      showToast(
        "발송 완료",
        "인증번호가 발송되었습니다.",
        "checkmark-circle-sharp"
      );
      setVerificationResponse(response.data);
      setIsCodeVerified(true);
      setErrorOpacity(0);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status === 409) {
          console.error("인증번호 전송 실패 - 이미 존재하는 이메일", error);
          setErrorOpacity(100);
          setVerifyError("이미 존재하는 이메일입니다.");
          // } else if (error.response.status === 409) {
          //   console.error("인증번호 전송 실패 - 잘못된 이메일 형식", error);
          //   setErrorOpacity(100);
          //   setVerifyError("올바르지 않은 이메일 형식입니다.");
        } else {
          console.error("인증번호 전송 실패 - 기타 오류", error);
          setErrorOpacity(100);
          setVerifyError("올바르지 않은 이메일 형식입니다.");
        }
      }
    }
  };

  React.useEffect(() => {
    setTokenExpiredCallback(() => {
      console.log("토큰 만료 혹은 충돌");
      navigation.navigate("Login");
    });
  }, []);

  const showToast = (title, content, iconName) => {
    setIsToastVisible(true);
    setToastTitle(title);
    setToastContent(content);
    setToastIconName(iconName);

    // Start the timer to hide the toast after a few seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2000); // Set the duration for the toast to stay visible (2 seconds in this case)
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
        "http://i9b102.p.ssafy.io:8080/auth/join/emailcheck",
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
      if (error.response.status === "409") {
        console.error("인증번호 전송 실패 - 이미 존재하는 이메일", error);
        setErrorOpacity(100);
        setVerifyError("이미 존재하는 이메일입니다.");
      } else {
        setErrorOpacity(100);
        setVerifyError("인증번호가 일치하지 않습니다.");
        console.error("인증번호 전송 실패 - 기타 오류", error);
      }
    }
  };

  // 이메일을 작성하고 바꿀 수도 있으므로
  useEffect(() => {
    // 작성한 이메일 변경시 인증번호 상태가 false
    setIsCodeVerified(false);
  }, [email]);

  useEffect(() => {
    // verifyNumber의 길이가 7일 때 버튼 색상을 변경
    if (verifyNumber.length === 8) {
      setNextButtonColor("#2DD0AF");
      setVerifyError("");
      setErrorOpacity(0);
    } else if (verifyNumber === "") {
      setErrorOpacity(0);
    } else {
      setNextButtonColor("#CACACA");
      setErrorOpacity(100);
      setVerifyError("인증번호가 일치하지 않습니다.");
    }
  }, [verifyNumber]);

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
        <Image
          source={require("../../assets/img/LogoWhite.png")}
          style={styles.logoWhiteSize}
        />
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
          maxLength={8}
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
          onPress={goToSignUpPassword}
          disabled={isNextButtonDisabled}
        >
          <CookieRunRegular style={styles.emailNextButtonText}>
            다음
          </CookieRunRegular>
        </TouchableOpacity>
      </View>
      <View style={styles.toastnotice}>
        {isToastVisible && (
          <ToastNotification
            title={toastTitle}
            content={toastContent}
            iconName={toastIconName}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
