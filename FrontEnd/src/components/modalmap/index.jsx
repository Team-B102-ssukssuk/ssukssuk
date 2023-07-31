import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./style";
import Modal from "react-native-modal";
// import CookieRunBold from "../common/CookieRunBold";
// import { COLORS } from "../../constants/theme";

const ModalMap = ({ isVisible, onClose, navigation }) => {
  const GoMain = () => {
    navigation.navigate("Pot"); // 네비게이션을 이용하여 "Main" 화면으로 이동
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
          <TouchableOpacity
            style={styles.mapGardenLocation}
            onPress={() => navigation.navigate("Garden")}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapGarden.png")}
              style={styles.mapGarden}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mapProfileLocation}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapProfile.png")}
              style={styles.mapProfile}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapPotLocation} onPress={GoMain}>
            <Image
              resizeMode="contain"
              source={require("../../assets/img/mapPot.png")}
              style={styles.mapPot}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mapLogoutLocation}
            onPress={() => navigation.navigate("Login")}
          >
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
