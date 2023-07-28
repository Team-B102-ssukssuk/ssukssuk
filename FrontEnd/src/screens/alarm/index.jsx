import React from "react";
import { View, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import CookieRunBold from "../../components/common/CookieRunBold";
import Icon2 from "react-native-vector-icons/MaterialIcons";

import styles from "./style";

const AlarmScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/img/ProfileBackground.png")}
      style={styles.container}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.header}>
          <Icon2 name="arrow-back-ios" size={28} color="#FBFFE5" />
          <View style={styles.alarmSection}>
            <CookieRunBold style={styles.alarmText}>알림</CookieRunBold>
            <View style={styles.notificationCircle}>{/* Red circle */}</View>
            <Icon name="bell-fill" size={28} color="#FBFFE5" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AlarmScreen;
