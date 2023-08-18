import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

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
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: { height: 500, marginTop: 40 },
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
  },
  skipTextStyle: {
    color: "#D9D9D9",
    textAlign: "right",
    fontSize: 18,
    justifyContent: "flex-end",
  },
  subfontcolor: {
    color: COLORS.Grey,
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});

export default styles;
