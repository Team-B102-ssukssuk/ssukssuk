import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme.jsx";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  alertContainer: {
    width: 350,
    height: 100,
    backgroundColor: COLORS.beige,
    borderRadius: 20,
    borderColor: COLORS.lightBrown,
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontBrown: {
    color: COLORS.brown,
    fontSize: 15,
  },
  fontRed: {
    color: COLORS.Red,
  },
  waterIcon: {
    width: 75,
    height: 75,
    margin: 20,
  },
  textBlock: {
    width: 210,
    marginRight: 20,
  },
  fontGreen: {
    color: "#52C756",
  },
  alignLeft: {
    justifyContent: "flex-start",
  },
  minuteStyle: {
    lex: 1,
    alignItems: "flex-end",
  },
  minuteColor: {
    color: COLORS.Grey,
  },
  fontBlue: {
    color: "#0FA9FF",
  },
});

export default styles;
