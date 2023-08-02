import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  potWood: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 30,
  },
  potWoodGroup: {
    alignItems: "center",
  },
  PotWoodText: {
    position: "absolute",
    marginTop: 15,
    color: COLORS.brown,
    fontSize: 18,
  },
  potResize: {
    width: 110,
    height: 110,
  },
  potSign: {
    flexDirection: "row",
  },
  potDelete: {
    position: "absolute",
  },
  potEmptyDelete: {
    position: "absolute",
    bottom: 2,
    right: -13,
  },
  deleteIcon: {
    color: COLORS.white,
    padding: 5,
    backgroundColor: COLORS.Coral,
    borderRadius: 100,
    marginLeft: 65,
  },
  emptyDeleteIcon: {
    color: COLORS.white,
    padding: 5,
    backgroundColor: COLORS.Coral,
    borderRadius: 100,
  },
  potName: {
    width: 70,
    height: 27,
    backgroundColor: COLORS.beige,
    borderRadius: 5,
    borderColor: COLORS.lightBrown,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  potText: {
    fontSize: 12,
    color: COLORS.brown,
  },
  absoultPosition1: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "5%",
    zIndex: 1,
  },
  absoultPosition2: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "35%",
    zIndex: 1,
  },
  absoultPosition3: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "65%",
    zIndex: 1,
  },
  absoultPosition4: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "5%",
    zIndex: 1,
  },
  absoultPosition5: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "35%",
    zIndex: 1,
  },
  absoultPosition6: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "65%",
    zIndex: 1,
  },
  absoultPosition7: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "5%",
    zIndex: 1,
  },
  absoultPosition8: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "35%",
    zIndex: 1,
  },
  absoultPosition9: {
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: "65%",
    zIndex: 1,
  },
  shelve: {
    marginTop: 105,
  },
  reContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  trashCan: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  trashCanMargin: {
    alignItems: "flex-end",
  },
  alignCenterContainer: {
    alignItems: "center",
  },
});

export default styles;
