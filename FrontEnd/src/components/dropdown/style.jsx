// style.js
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#F8F3EB",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#896A50", // Set the border color here
    justifyContent: "center",
    width: SIZES.width - 40,
    maxHeight: 400,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
});

export default styles;
