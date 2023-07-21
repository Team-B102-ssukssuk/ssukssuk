import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";

const SignUpScreen = () => {
  const [text, onChangeText] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/img/LoginBackground.png")}
      style={styles.container}
    >
      <View>
        <Image source={require("../../assets/img/LogoWhite.png")} />
      </View>
      <View style={styles.logincontainer}>
        <View style={styles.loginInlineBlock}>
          <TextInput
            style={styles.loginIDInputBox}
            onChangeText={onChangeText}
            value={text}
            placeholder="email"
          ></TextInput>
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyText}>인증</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
