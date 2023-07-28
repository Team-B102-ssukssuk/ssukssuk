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
import Icon2 from "react-native-vector-icons/AntDesign";
import styles from "./style";

const SignUpNicknameScreen = () => {
  const [nickname, setNickname] = useState("");
  const [errorOpacity, setErrorOpacity] = useState(0);
  const [showCheckcircle, setShowCheckcircle] = useState(0);
  const [nextButtonColor, setNextButtonColor] = useState("#CACACA");

  return (
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.arrowTextContainer}>
            <Icon name="arrow-back-ios" size={28} color="#fff" />
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
          <TouchableOpacity
            onPress={() => {
              setErrorOpacity(100);
              setNextButtonColor("#2DD0AF");
              setShowCheckcircle(100);
            }}
            style={styles.verifyButton}
          >
            <Text style={styles.verifyText}>중복체크</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.verifyErrorMessage, { opacity: errorOpacity }]}>
          이미 가입한 사용자입니다.
        </Text>
        <TouchableOpacity
          style={[styles.emailNextButton, { backgroundColor: nextButtonColor }]}
          activeOpacity={0.3}
        >
          <Text style={styles.emailNextButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpNicknameScreen;
