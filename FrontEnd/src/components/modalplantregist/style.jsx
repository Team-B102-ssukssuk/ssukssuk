import { StyleSheet } from "react-native";

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
  RegistButton: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 5,
    backgroundColor: "#469C4A",
  },
  RegisText: { color: "white" },
  modalButtonAlign: {
    marginTop: 10,
  },
  PotInputBox: {
    height: 40,
    width: 260,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    fontWeight: "700",
    color: "#4C0C0C",
    borderWidth: 1,
    borderColor: "#C0AE9D", // Set the border color here
  },
  buttonActive: {
    backgroundColor: "#469C4A",
  },
  buttonInactive: {
    backgroundColor: "#CACACA",
  },
  loginErrorMessageActive: {
    textAlign: "center",
    color: "#FF2E2E",
    margin: 5,
    fontSize: 12,
  },
  loginErrorMessageInactive: {
    textAlign: "center",
    opacity: 0,
    fontSize: 2,
  },
});

export default styles;
