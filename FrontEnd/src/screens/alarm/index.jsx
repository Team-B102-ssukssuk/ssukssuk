import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CookieRunBold from "../../components/common/CookieRunBold";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import AlertWaterComponent from "../../components/alertwater";
import AlertTankComponent from "../../components/alerttank";
import customAxios from "../../utils/axios";
import LoadingScreen from "../loading";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const AlarmScreen = ({ navigation }) => {
  const [isNotificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotificationData();
  }, []);

  const getNotificationData = () => {
    customAxios
      .get("/notification")
      .then((response) => {
        setNotificationData(response.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("센서 불러오기 오류");
      });
  };

  const deleteNotification = (notificationId) => {
    console.log(notificationId);
    customAxios
      .put(`/notification/${notificationId}`)
      .then(() => {
        console.log("성공");
        // navigation.navigate("Main");
      })
      .catch(() => {
        console.log("삭제 성공");
      });
  };

  const renderNotificationItem = ({ item }) => {
    const uniqueKey = item.notificationId;

    const onDelete = () => {
      deleteNotification(item.notificationId);
      const updatedData = isNotificationData.filter(
        (notification) => notification.notificationId !== item.notificationId
      );
      setNotificationData(updatedData);
    };

    return (
      <Swipeable
        renderLeftActions={() => (
          <TouchableOpacity onPress={onDelete}>
            <View style={styles.deleteButton}>
              <Icon name="arrow-back-ios" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
        overshootLeft={false}
      >
        <TouchableOpacity
          onPress={() => {
            // Handle navigation or other actions when clicking on the notification item
          }}
        >
          {item.notificationType === "W" ? (
            <AlertWaterComponent
              date={item.notification_date}
              nickname={item.ninckName}
            />
          ) : item.notificationType === "T" ? (
            <AlertTankComponent date={item.notification_date} />
          ) : null}
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (isLoading) {
    // Render the loading screen here
    return <LoadingScreen />;
  }

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
            {isNotificationData.length !== 0 ? (
              <View style={styles.notificationCircle}>{/* Red circle */}</View>
            ) : null}
            <Icon name="bell-fill" size={28} color="#FBFFE5" />
          </View>
        </View>
      </View>
      <FlatList
        data={isNotificationData}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.notificationId.toString()} // Assuming notificationId is a number
      />
    </ImageBackground>
  );
};

export default AlarmScreen;
