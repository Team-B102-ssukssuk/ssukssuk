import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import CookieRunBold from "../../components/common/CookieRunBold";
import Icon2 from "react-native-vector-icons/MaterialIcons";

import styles from "./style";
import AlertWaterComponent from "../../components/alertwater";
import AlertTankComponent from "../../components/alerttank";
import { ScrollView } from "react-native-gesture-handler";

const AlarmScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/img/ProfileBackground.png")}
      style={styles.container}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.mapMainLocation}
            onPress={() => navigation.goBack()}
          >
            <Icon2 name="arrow-back-ios" size={28} color="#FBFFE5" />
          </TouchableOpacity>
          <View style={styles.alarmSection}>
            <CookieRunBold style={styles.alarmText}>알림</CookieRunBold>
            <View style={styles.notificationCircle}>{/* Red circle */}</View>
            <Icon name="bell-fill" size={28} color="#FBFFE5" />
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <AlertWaterComponent />
          <AlertWaterComponent />
          <AlertTankComponent />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AlarmScreen;
