import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#4FAB3C",
    fontWeight: 800,
    fontSize: 20,
  },
  loadingDotImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  loadingImg: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default styles;
