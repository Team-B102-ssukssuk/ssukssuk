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

const PasswordFindScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("존재하지 않는 이메일입니다.");
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastContent, setToastContent] = useState("");
  const [toastIconName, setToastIconName] = useState("");

  const isNextButtonDisabled = verifyNumber.length < 8;

  const sendVerificationCode = async () => {
    try {
      console.log(verificationResponse);
      console.log(email);
      const requestData = {
        email: email,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/auth/password/email",
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
      setNextButtonColor("#CACACA");
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        if (error.response.status === 400) {
          console.error("인증번호 전송 실패 - 이미 존재하는 이메일", error);
          setErrorOpacity(100);
          setVerifyError("이메일 형식을 확인하세요.");
        } else {
          console.error("인증번호 전송 실패 - 기타 오류", error);
          setErrorOpacity(100);
          setVerifyError("이메일이 존재하지 않습니다.");
        }
      }
    }
  };

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
    if (isCodeVerified === false) {
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
        code: verifyNumber,
      };
      const response = await axios.post(
        "http://i9b102.p.ssafy.io:8080/auth/password/emailcheck",
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

export default PasswordFindScreen;
