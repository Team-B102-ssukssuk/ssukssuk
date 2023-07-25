import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gardenWood: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 40,
  },
  gardenWoodGroup: {
    alignItems: "center",
  },
  gardenWoodText: {
    position: "absolute",
    marginTop: 15,
    color: "white",
    fontSize: 18,
  },
  gardenContainer: {
    alignItems: "center",
    margin: 5,
  },
  gardenCharacterResize: {
    width: 110,
    height: 110,
  },
  gardenCharacterSign: {
    flexDirection: "row",
  },
  gardenCharacterDelete: {
    position: "absolute",
  },
  deleteIcon: {
    color: COLORS.white,
    padding: 3,
    backgroundColor: COLORS.Coral,
    borderRadius: 100,
    marginLeft: 65,
  },
  gardenCharacterName: {
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
  gardenCharacterNameText: {
    fontSize: 12,
    color: COLORS.brown,
  },
  absoultPosition: {
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  gardenGround: {
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
