import React from "react";
import { View, StyleSheet } from "react-native";
import CustomDropdown from "./index"; // Adjust the import path based on the file structure

const options = [
  { id: 1, label: "장미" },
  { id: 2, label: "배추" },
  { id: 3, label: "선인장" },
];

const ParentComponent = () => {
  const handleDropdownSelect = (item) => {
    console.log("Selected item:", item);
    // Perform any actions based on the selected item
  };

  return (
    <View style={styles.container}>
      <CustomDropdown
        data={options}
        placeholder="심을 종류를 선택해주세요"
        onSelect={handleDropdownSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ParentComponent;
