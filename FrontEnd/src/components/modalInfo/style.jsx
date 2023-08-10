import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#F8F3EB",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
  },
  emptyImg: {
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
    borderRadius: 20,
    backgroundColor: "rgba(137, 106, 80, 0.2)",
  },
  emptyImgTest: {
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
    borderRadius: 20,
    backgroundColor: "rgba(137, 106, 80, 0.2)",
    width: 75,
    height: 75,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    padding: 15,
  },
  plantName: {
    fontSize: 20,
    margin: 5,
  },
  plantLevel: {
    fontSize: 14,
    margin: 5,
  },
  voiceText: {
    fontSize: 14,
    marginTop: 50,
  },
  guideText: {
    fontSize: 14,
    marginTop: 18,
  },
});

export default styles;
