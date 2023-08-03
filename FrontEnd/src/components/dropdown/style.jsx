// style.js
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.beige,
    height: SIZES.height / 2,
    width: SIZES.width - 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
  },
  rowContainer: {
    flexDirection: "row",
  },
  rowItem: {
    margin: 10,
  },
  modalText: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 5,
    padding: 20,
    color: COLORS.brown,
  },
  characterSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  characterSize: {
    width: 100,
    height: 100,
  },
  modalButtonAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SeedButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  plantText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // New styles for CustomizableDropdown
  dropdownLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: 200,
    width: "80%",
  },
  categoryItem: {
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 20,
    color: COLORS.brown,
    padding: 10,
  },
  // Styles for subcategories
  subCategoryItem: {
    fontSize: 15,
    color: COLORS.brown,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  subCategoryText: {
    fontSize: 14, // Adjust the font size for subcategories
    color: "#333", // Change the text color for subcategories
  },
  resetButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: "#007BFF",
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
    width: 270,
    flexDirection: "row",
    justifyContent: "flex-start",
    top: -38.7,
    zIndex: 2,
  },
  categoryActiveText: {
    backgroundColor: COLORS.lightBrown,
    textAlign: "center",
    width: 60,
    paddingTop: 10,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
    color: COLORS.beige,
    marginHorizontal: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryInactiveText: {
    backgroundColor: COLORS.beige,
    textAlign: "center",
    width: 60,
    paddingTop: 10,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: COLORS.lightBrown, // Set the border color here
    color: COLORS.brown,
    marginHorizontal: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default styles;
