import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 1,
    backgroundColor: COLORS.beige,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
  },
  modalText: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 5,
    color: COLORS.brown,
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
  category: {
    position: "absolute",
    width: 280,
    flexDirection: "row",
    justifyContent: "flex-start",
    top: -30,
    zIndex: 2,
  },
  categoryActiveText: {
    backgroundColor: COLORS.lightBrown,
    textAlign: "center",
    width: 60,
    top: -20,
    paddingTop: 10,
    paddingBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
    color: COLORS.beige,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryInactiveText: {
    backgroundColor: COLORS.beige,
    textAlign: "center",
    width: 60,
    paddingTop: 10,
    paddingBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
    color: COLORS.brown,
    marginHorizontal: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default styles;
