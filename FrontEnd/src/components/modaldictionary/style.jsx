import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  emptyImg: {
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
    borderRadius: 20,
    backgroundColor: "rgba(137, 106, 80, 0.2)",
  },
  dictionaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    width: 250,
    marginBottom: 20,
  },
  dictionaryText: {
    margin: 10,
    fontSize: 16,
  },
});

export default styles;
