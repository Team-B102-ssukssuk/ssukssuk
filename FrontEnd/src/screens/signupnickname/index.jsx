import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import styles from "./style";
import axios from "axios";

const SignUpNicknameScreen = ({ navigation, route }) => {
  const [nickname, setNickname] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [showCheckcircle, setShowCheckcircle] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");
  const [nicknameVerify, setNicknameVerify] = useState(false);

  const { SignUpData } = route.params;

  // const response = {
  //   message: "OK",
  //   status: "200",
  //   data: [
  //     {
  //       nickname: "aaa",
  //     },
  //   ],
  // };

  const checkNickname = async () => {
    try {
      // console.log(nickname);
      const response = await axios.get(
        `http://i9b102.p.ssafy.io:8080/user/nickname/${nickname}`
      );
      // 서버에서 받은 응답 데이터를 기반으로 중복 여부 확인
      // console.log(response.status);
      // console.log(response.data);
      // 닉네임이 중복되지 않은 경우
      setErrorOpacity(0);
      setShowCheckcircle(100);
      setNicknameVerify(true);
      setNextButtonColor("#2DD0AF");
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 409) {
        console.log("중복된 닉네임:", error.response.data);
        setErrorOpacity(100);
        setShowCheckcircle(0);
        setNicknameVerify(false);
        setNextButtonColor("#CACACA");
      } else {
        console.log("알 수 없는 오류:", error);
      }
    }
  };

  // const checkNickname = () => {
  //   let isNicknameAvailable = true;
  //   for (let i = 0; i < response.data.length; i++) {
  //     if (nickname === response.data[i].nickname) {
  //       isNicknameAvailable = false;
  //       break;
  //     }
  //   }

  //   if (isNicknameAvailable && nickname !== "") {
  //     setErrorOpacity(0);
  //     setShowCheckcircle(100);
  //     setNicknameVerify(true);
  //     setNextButtonColor("#2DD0AF");
  //   } else {
  //     setErrorOpacity(100);
  //     setShowCheckcircle(0);
  //     setNicknameVerify(false);
  //     setNextButtonColor("#CACACA");
  //   }
  // };

  const signUpSuccess = async () => {
    try {
      if (nicknameVerify) {
        const updatedSignUpData = {
          ...SignUpData,
          nickname: nickname,
        };
        const response = await axios.post(
          "http://i9b102.p.ssafy.io:8080/user/join",
          updatedSignUpData
        );
        navigation.navigate("Login");
        console.log(response.data);
      } else {
        setErrorOpacity(100);
      }
    } catch (error) {
      console.error("회원가입 실패", error);
    }
    console.log(222);
  };

  useEffect(() => {
    if (nickname === "") {
      setNextButtonColor("#CACACA");
      setShowCheckcircle(0);
    } else {
      setNextButtonColor("#2DD0AF");
      setShowCheckcircle(100);
      setErrorOpacity(0);
    }
  }, [nickname]);

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
            <Text style={styles.headerPageNumber}>회원가입 ( 3 / 3 )</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoPadding}>
        <Image source={require("../../assets/img/LogoWhite.png")} />
      </View>
      <View style={styles.logincontainer}>
        <View style={styles.loginInlineBlock}>
          <View style={styles.iconPlaceholder}>
            <TextInput
              style={styles.emailJoinInputBox}
              onChangeText={setNickname}
              value={nickname}
              placeholder="닉네임"
            ></TextInput>
            <Icon2
              name="checkcircle"
              size={20}
              color="#2DD0AF"
              style={[styles.checkcircle, { opacity: showCheckcircle }]}
            />
          </View>
          <TouchableOpacity onPress={checkNickname} style={styles.verifyButton}>
            <Text style={styles.verifyText}>중복체크</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          이미 가입한 사용자입니다.
        </Text>
        <TouchableOpacity
          style={[styles.emailNextButton, { backgroundColor: nextButtonColor }]}
          activeOpacity={0.3}
          onPress={signUpSuccess}
        >
          <Text style={styles.emailNextButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpNicknameScreen;
