import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },

  emailJoinInputBox: {
    height: 40,
    width: 250,
    margin: 5,
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
  passwordInputBox: {
    height: 40,
    width: 320,
    margin: 5,
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
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 4,
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
    borderRadius: 10,
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContainer: {
    width: 320,
    height: 80,
    position: "absolute",
    top: 0,
  },
  verifyErrorMessage: {
    textAlign: "left",
    color: "#FF2E2E",
    margin: 5,
  },
  emailNextButton: {
    height: 40,
    width: 320,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  emailNextButtonText: {
    color: "white",

    margin: 10,
  },
  headerPageNumber: {
    color: "white",
    fontSize: 16,
  },
  arrowTextContainer: {
    flexDirection: "row",
  },
  logoPadding: {
    padding: 35,
  },
  logoWhiteSize: {
    resizeMode: "contain",
    width: 200,
    height: 150,
  },
});

export default styles;
