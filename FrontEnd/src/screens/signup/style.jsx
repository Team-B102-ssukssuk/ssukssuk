import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },

  loginIDInputBox: {
    height: 40,
    width: 230,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 4,
  },

  verifyButton: {
    backgroundColor: "#2DD0AF",
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  loginInlineBlock: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },

  verifyText: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
    width: "100%",
  },
});

export default styles;
