import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import CookieRunBold from "../../components/common/CookieRunBold";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import AlertWaterComponent from "../../components/alertwater";
import AlertTankComponent from "../../components/alerttank";
import customAxios from "../../utils/axios";

const AlarmScreen = ({ navigation, route }) => {
  const deleteNotification = (notificationId) => {
    console.log(notificationId);
    customAxios
      .put(`/notification/${notificationId}`)
      .then(() => {
        console.log("성공");
        navigation.navigate("Main");
      })
      .catch(() => {
        console.log("삭제 성공");
      });
  };

  const renderNotificationItem = ({ item }) => {
    const uniqueKey = item.notificationId;
    if (item.notificationType === "W") {
      return (
        <TouchableOpacity
          key={`water_need_${uniqueKey}`}
          onPress={() => deleteNotification(item.notificationId)}
        >
          <AlertWaterComponent
            date={item.notification_date}
            nickname={item.ninckName}
          />
        </TouchableOpacity>
      );
    } else if (item.notificationType === "T") {
      return (
        <TouchableOpacity
          key={`water_tank_${uniqueKey}`}
          onPress={() => deleteNotification(item.notificationId)}
        >
          <AlertTankComponent date={item.notification_date} />
        </TouchableOpacity>
      );
    }
    return null;
  };

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
            {route.params.NotificationData.length !== 0 ? (
              <View style={styles.notificationCircle}>{/* Red circle */}</View>
            ) : null}
            <Icon name="bell-fill" size={28} color="#FBFFE5" />
          </View>
        </View>
      </View>
      <FlatList
        data={route.params.NotificationData}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.notificationId.toString()} // Assuming notificationId is a number
      />
    </ImageBackground>
  );
};

export default AlarmScreen;
