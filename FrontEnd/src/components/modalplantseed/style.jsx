import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  openButton: {
    fontSize: 18,
    color: "blue",
  },
  modalContainer: {
    backgroundColor: "#F8F3EB",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
  },
  modalText: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 5,
    color: "#4C0C0C",
  },
  SeedButton: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightBrown,
  },
  plantText: { color: COLORS.white },
  modalButtonAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  characterSize: {
    width: 180,
    height: 180,
  },
  PotInputBox: {
    height: 40,
    width: 200,
    margin: 5,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8,
    backgroundColor: "white",
    fontWeight: "700",
    color: COLORS.lightBrown,
    borderWidth: 2,
    borderColor: "#C0AE9D", // Set the border color here
  },
  characterText: {
    color: COLORS.brown,
    fontSize: SIZES.h3,
    marginBottom: 10,
  },
});

export default styles;
