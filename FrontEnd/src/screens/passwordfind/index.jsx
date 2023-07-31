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

const PasswordFindScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");

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
            onPress={() => {
              setErrorOpacity(100);
              setNextButtonColor("#2DD0AF");
            }}
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
          인증번호를 잘 못 입력했습니다.
        </Text>
        <TouchableOpacity
          style={[styles.emailNextButton, { backgroundColor: nextButtonColor }]}
          activeOpacity={0.3}
          onPress={() => {
            setErrorOpacity(100);
            navigation.navigate("PasswordMake");
          }}
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
