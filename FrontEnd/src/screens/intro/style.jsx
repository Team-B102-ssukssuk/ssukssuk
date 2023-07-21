import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: { height: 500 },
  introTextStyle: {
    fontSize: 18,
    color: "#2B2B2B",
    textAlign: "center",
    paddingBottom: 10,
  },
  introTitleStyle: {
    fontSize: 25,
    color: "#31D7B6",
    textAlign: "center",
    fontWeight: "bold",
  },
  skipTextStyle: {
    color: "#D9D9D9",
    textAlign: "right",
    fontSize: 18,
    justifyContent: "flex-end",
  },
});

export default styles;
