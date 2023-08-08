import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Router from "./src/router/router.jsx";
import store from "./src/redux/store.jsx";

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("푸시 알림을 위한 토큰을 얻을 수 없습니다!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token); // This is the push notification token
    // Send this token to your server to send push notifications to this device.
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Router />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
