import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import CustomDropdown from ".";

const ParentComponent = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setModalVisible(false);
  };

  // Sample data for the dropdown
  const dropdownData = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
    { id: 5, label: "Option 5" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedItem ? selectedItem.label : "Open Modal"}
        </Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close Modal</Text>
          </TouchableOpacity>
          <CustomDropdown
            data={dropdownData}
            placeholder="Select an option"
            onSelect={handleSelect}
          />
        </View>
        <Text>안녕</Text>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  openModalButton: {
    backgroundColor: "#C0AE9D",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeModalButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#C0AE9D",
    alignItems: "center",
  },
});

export default ParentComponent;
