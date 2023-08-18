import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add other container styles as needed
  },
  swipeableContainer: {
    width: "100%", // Customize the width as needed
  },
  userInfoSection: {
    // Add styles for the user info section as needed
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
    // Add other header styles as needed
  },
  alarmSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    // Add other alarm section styles as needed
  },
  alarmText: {
    fontSize: 20,
    color: COLORS.lightYellow,
    marginRight: 8,
    // Add other alarm text styles as needed
  },
  notificationCircle: {
    width: 16,
    height: 16,
    backgroundColor: COLORS.Coral,
    borderRadius: 8,
    position: "absolute",
    top: -4,
    right: -4,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  // Add other styles as needed
});

export default styles;
