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
    marginVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
  },
  modalText: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 5,
    color: "#4C0C0C",
  },
  modalTextContent: {
    fontSize: 15,
    color: "#4C0C0C",
  },
  closeButton: {
    fontSize: 16,
    color: "white",
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#FF6F6F",
  },
  cancelButton: {
    fontSize: 16,
    color: "white",
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#cacaca",
  },
  modalButtonAlign: {
    flexDirection: "row",
    marginTop: 10,
  },
  notificationCircle: {
    width: 30,
    height: 30,
    backgroundColor: "#F8F3EB",
    borderRadius: 100,
    position: "absolute",
    bottom: -4,
    right: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#896A50", // Set the border color here
    zIndex: 1,
  },
});

export default styles;
