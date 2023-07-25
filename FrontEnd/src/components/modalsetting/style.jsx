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
  CloseButton: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 5,
    backgroundColor: COLORS.Coral,
    marginTop: 10,
  },
  CloseText: { color: COLORS.white },
  modalButtonAlign: {
    marginTop: 10,
  },
  settingSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: SIZES.h3,
    width: 100,
    color: COLORS.brown,
  },
  onText: {
    color: COLORS.brown,
    marginRight: 10,
    width: 30,
  },
  offText: {
    color: COLORS.Grey,
    marginRight: 10,
    width: 30,
  },
});

export default styles;
