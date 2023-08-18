import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

const ToastNotification = ({ title, content, iconName }) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={styles.container}
    >
      <Icon name={iconName} size={30} color="#F6F4F4" />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{content}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "5%",
    left: "5%",
    backgroundColor: "#20639B",
    width: "90%",
    position: "absolute",
    borderRadius: 5,
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#003049",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  title: {
    color: "#F6F4F4",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  message: {
    color: "#F6F4F4",
    marginLeft: 10,
    fontSize: 14,
  },
});

export default ToastNotification;
