import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    height: SIZES.height * 0.15,
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  characterSection: {
    height: SIZES.height * 0.45,
    flexDirection: "row",
    justifyContent: "center",
  },
  nameTagSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: SIZES.height * 0.12,
  },
  wateringCanSection: {
    alignItems: "flex-end",
    marginRight: 20,
    height: SIZES.height * 0.2,
  },
  SensorContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  IconContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tmp: {
    flexDirection: "row",
    width: "23%",
    color: COLORS.brown,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 12.5,
    paddingHorizontal: 7.5,
    paddingVertical: 10,
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#896A50",
    marginLeft: 10,
  },
  tmpText: {
    fontSize: 11,
  },
  sensorSize: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  mapSize: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  iconSize: {
    width: 24,
    height: 24,
  },
  iconBackground: {
    backgroundColor: COLORS.lightYellow,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.lightBrown,
    marginLeft: 7.5,
  },
  characterSize: {
    width: "100%",
    height: "100%",
  },
  nameTagSize: {
    width: "65%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  wateringCanSize: {
    width: 93,
    height: 84,
  },
  characterName: {
    position: "absolute",
    color: COLORS.lightYellow,
    fontSize: 20,
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
});

export default styles;
