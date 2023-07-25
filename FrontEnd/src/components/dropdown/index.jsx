import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const CustomDropdown = ({ data, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item); // Pass the selected item to the parent component
    setIsOpen(false);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Icon
          name="down"
          size={20}
          color="#C0AE9D"
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={data}
          renderItem={renderDropdownItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.dropdownList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderColor: "#C0AE9D",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#C0AE9D",
    marginLeft: 10,
  },
  dropdownList: {
    borderColor: "#C0AE9D",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#C0AE9D",
  },
  dropdownItemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#4C0C0C",
    fontWeight: "700",
  },
});

export default CustomDropdown;
