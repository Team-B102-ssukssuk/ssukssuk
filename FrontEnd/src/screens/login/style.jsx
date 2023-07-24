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

  singInButton: {
    height: 40,
    width: 320,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#2DD0AF",
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
  singInButtonText: {
    color: "white",
    margin: 10,
  },
  loginErrorMessage: {
    textAlign: "center",
    color: "#FF2E2E",
    margin: 10,
  },
  divideLine: {
    height: 1,
    marginTop: 12,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    backgroundColor: "#2DD0AF",
    alignItems: "center",
  },
  kakaoLoginButton: {
    height: 40,
    width: 320,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F7E600",
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
  kakaoLoginButtonText: {
    color: "#3A1D1D",

    margin: 10,
  },
  verticalLine: {
    height: 15,
    width: 1,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#888888",
    alignItems: "center",
  },
  loginSubContainer: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subFind: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  loginSubText: {
    color: "#888888",
  },
});

export default styles;
