import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const CustomDropdown = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryPress = (subcategory) => {
    setSelectedSubcategory(subcategory);
    onSelect(subcategory);
    toggleModal();
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <CookieRunRegular
          style={{
            width: 200,
            borderWidth: 2,
            borderColor: "#896A50", // Set the border color here
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginRight: 10,
            color: "#4C0C0C",
            textAlign: "center",
          }}
        >
          {selectedSubcategory
            ? selectedSubcategory
            : selectedCategory
            ? `${selectedCategory.name}`
            : "심을 식물을 선택해주세요"}
        </CookieRunRegular>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                margin: 20,
                borderWidth: 2,
                borderColor: "#896A50", // Set the border color here
              }}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.name}
                  onPress={() => handleCategoryPress(option)}
                >
                  <CookieRunRegular style={styles.categoryText}>
                    {option.name}
                  </CookieRunRegular>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                margin: 20,
              }}
            >
              {selectedCategory &&
                selectedCategory.subcategories.map((subcategory) => (
                  <TouchableOpacity
                    key={subcategory}
                    onPress={() => handleSubcategoryPress(subcategory)}
                  >
                    <CookieRunRegular style={styles.subCategoryItem}>
                      {subcategory}
                    </CookieRunRegular>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CustomDropdown;
