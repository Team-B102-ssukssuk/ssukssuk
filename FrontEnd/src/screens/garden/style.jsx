import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

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
    marginTop: "12%",
    color: COLORS.lightYellow,
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
    marginTop: 95,
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
  imgSize: {
    width: 100,
    height: 80,
  },
  alignCenterContainer: {
    alignItems: "center",
  },
  plantContainer: {
    height: SIZES.height - 20,
  },
  gardenEmptyResize: {
    width: 130,
    height: 170,
    opacity: 0.7,
  },
  trashCanClicked: {
    opacity: 0.5, // Change the opacity when the trashcan is clicked
  },
});

export default styles;
