import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import styles from "./style"; // Import your styles
import AlertWaterComponent from "../../components/alertwater";
import AlertTankComponent from "../../components/alerttank";
import customAxios from "../../utils/axios";
import LoadingScreen from "../loading";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";
import CookieRunBold from "../../components/common/CookieRunBold";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import LevelUpComponent from "../../components/levelup";
import BadgeComponent from "../../components/badge";
import { connect } from "react-redux";
import { storePotID, setGardenID } from "../../redux/action";

const AlarmScreen = ({ navigation, storePotID, setGardenID }) => {
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
        console.log("알림 -> " + JSON.stringify(response.data.data));
        setIsLoading(false);
      })
      .catch(() => {
        console.log("센서 불러오기 오류");
      });
  };

  const deleteNotification = (notificationId) => {
    customAxios
      .put(`/notification/${notificationId}`)
      .then(() => {
        console.log("성공");
        const updatedData = isNotificationData.filter(
          (notification) => notification.notificationId !== notificationId
        );
        setNotificationData(updatedData);
      })
      .catch(() => {
        console.log("삭제 성공");
      });
  };

  const renderSwipeableContent = (item) => {
    console.log(item);
    const onSwipeableLeftOpen = () => {
      deleteNotification(item.notificationId);
      const updatedData = isNotificationData.filter(
        (notification) => notification.notificationId !== item.notificationId
      );
      setNotificationData(updatedData);
    };

    return (
      <Swipeable
        renderRightActions={() => (
          <View style={styles.deleteButton}>
            <TouchableOpacity onPress={onSwipeableLeftOpen}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="trash-bin"
                  size={36}
                  color="#fff"
                  style={{ margin: 15 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        onSwipeableRightOpen={onSwipeableLeftOpen}
      >
        {item.notificationType === "W" ? (
          <TouchableOpacity
            onPress={() => {
              deleteNotification(item.notificationId);
              storePotID(item.potId);
              setGardenID(item.gardenId);
              navigation.navigate("Main");
            }}
          >
            <AlertWaterComponent
              date={item.notification_date}
              nickname={item.ninckName}
            />
          </TouchableOpacity>
        ) : item.notificationType === "T" ? (
          <AlertTankComponent
            date={item.notification_date}
            nickname={item.ninckName}
          />
        ) : item.notificationType === "L" ? (
          <TouchableOpacity
            onPress={() => {
              deleteNotification(item.notificationId);
              navigation.navigate("Garden");
            }}
          >
            <LevelUpComponent
              date={item.notification_date}
              nickname={item.ninckName}
              gardenId={item.gardenId}
            />
          </TouchableOpacity>
        ) : item.notificationType === "B" ? (
          <TouchableOpacity
            onPress={() => {
              deleteNotification(item.notificationId);
              navigation.navigate("Profile");
            }}
          >
            <BadgeComponent
              date={item.notification_date}
              title={item.title}
              badgeId={item.badgeId}
            />
          </TouchableOpacity>
        ) : null}
      </Swipeable>
    );
  };

  if (isLoading) {
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
            <Icon3 name="bell" size={28} color="#FBFFE5" />
          </View>
        </View>
      </View>

      <FlatList
        data={isNotificationData}
        renderItem={({ item }) => renderSwipeableContent(item)}
        keyExtractor={(item) => item.notificationId.toString()}
      />
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    potID: state.app.potID,
    gardenID: state.app.gardenID,
  };
};

export default connect(mapStateToProps, { storePotID, setGardenID })(
  AlarmScreen
);
