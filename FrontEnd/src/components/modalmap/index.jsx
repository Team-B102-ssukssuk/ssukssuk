import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./style";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import CookieRunBold from "../common/CookieRunBold";
// import { COLORS } from "../../constants/theme";

const ModalMap = ({ isVisible, onClose, navigation }) => {
  const goPot = () => {
    onClose(false);

    const delayNavigation = setTimeout(() => {
      // navigation.navigate("SliderPot"); // 네비게이션을 이용하여 "Pot" 화면으로 이동
      navigation.navigate("Pot");
    }, 300);

    return () => clearTimeout(delayNavigation);
  };

  const Logout = () => {
    onClose(false);
    deleteTokens();

    const delayNavigation = setTimeout(() => {
      navigation.navigate("Login");
    }, 300);

    return () => clearTimeout(delayNavigation);
  };

  const goGarden = () => {
    onClose(false);

    const delayNavigation = setTimeout(() => {
      // navigation.navigate("SliderGarden");
      navigation.navigate("Garden");
    }, 300);

    return () => clearTimeout(delayNavigation);
  };

  const goProfile = () => {
    onClose(false);

    const delayNavigation = setTimeout(() => {
      navigation.navigate("Profile");
    }, 300);

    return () => clearTimeout(delayNavigation);
  };

  const deleteTokens = async () => {
    try {
      await AsyncStorage.removeItem("accessToken"); // Replace 'accessToken' with your actual access token key
      await AsyncStorage.removeItem("refreshToken"); // Replace 'refreshToken' with your actual refresh token key
      console.log("Access token and refresh token deleted successfully.");
    } catch (error) {
      console.error("Error deleting tokens:", error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={300}
    >
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Image
            resizeMode="contain"
            source={require("../../assets/img/mapBoard.png")}
            style={styles.mapBoardSize}
          ></Image>
          <TouchableOpacity style={styles.mapMainLocation} onPress={onClose}>
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapMain.png")}
              style={styles.mapMain}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapGardenLocation} onPress={goGarden}>
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapGarden.png")}
              style={styles.mapGarden}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mapProfileLocation}
            onPress={goProfile}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapProfile.png")}
              style={styles.mapProfile}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapPotLocation} onPress={goPot}>
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapPot.png")}
              style={styles.mapPot}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapLogoutLocation} onPress={Logout}>
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapLogout.png")}
              style={styles.mapLogout}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMap;
