import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./style";
import Modal from "react-native-modal";
// import CookieRunBold from "../common/CookieRunBold";
// import { COLORS } from "../../constants/theme";

const ModalChart = ({ isVisible, onClose }) => {
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

          <TouchableOpacity onPress={onClose}></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalChart;
