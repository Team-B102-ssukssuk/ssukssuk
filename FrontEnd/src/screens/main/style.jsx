import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  characterSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  nameTagSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  wateringCanSection: {
    position: "absolute",
    right: 20,
    bottom: 30,
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
    color: COLORS.brown,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 12.5,
    paddingHorizontal: 7.5,
    paddingVertical: 10,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 2,
    borderColor: "#896A50",
    marginLeft: 10,
  },
  tmpText: {
    fontSize: 11,
  },
  sensorSize: {
    width: 15,
    height: 15,
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
    width: 350,
    height: 350,
  },
  nameTagSize: {
    width: 150,
    height: 150,
  },
  wateringCanSize: {
    width: 93,
    height: 84,
  },
});

export default styles;
