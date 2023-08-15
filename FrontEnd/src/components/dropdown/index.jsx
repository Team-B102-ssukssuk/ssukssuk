import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Image } from "react-native";
import CookieRunRegular from "../common/CookieRunRegular";
import CookieRunBold from "../common/CookieRunBold";
import { ScrollView } from "react-native-gesture-handler";
import plantImages from "../../assets/img/plantImages";
import styles from "./style";

const CustomDropdown = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: options[0].name,
    subcategories: options[0].subcategories,
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    if (resolvedImage == null) {
      return require("../../assets/img/silhouette.png");
    }

    return resolvedImage;
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryPress = (subcategory) => {
    setSelectedSubcategory(subcategory.plantName);
    onSelect(subcategory.plantId, subcategory.plantName);
    toggleModal();
  };

  const renderEmptyImageRows = (subcategories) => {
    const numColumns = 3;

    // Group the subcategories into rows with three items per row
    const rows = [];
    for (let i = 0; i < subcategories.length; i += numColumns) {
      const row = subcategories.slice(i, i + numColumns);
      rows.push(row);
    }

    console.log(rows);

    return rows.map((row, rowIndex) => (
      <View key={`dropdown_${rowIndex}`} style={styles.rowContainer}>
        {row.map((subcategory, columnIndex) => (
          <View key={`dropdown_${columnIndex}`} style={styles.rowItem}>
            <TouchableOpacity
              onPress={() => handleSubcategoryPress(subcategory)}
            >
              <Image
                source={getPlantImageSource(subcategory.plantId, 1)}
                resizeMode="contain"
                style={[
                  styles.emptyImg,
                  {
                    width: 75,
                    height: 75,
                  },
                ]}
              />
            </TouchableOpacity>
            <CookieRunBold style={{ textAlign: "center", color: "#4D0C0C" }}>
              {subcategory.plantName}
            </CookieRunBold>
          </View>
        ))}
      </View>
    ));
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
            : "심을 식물을 선택해주세요"}
        </CookieRunRegular>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent={true}>
        {/* Add a TouchableOpacity to cover the entire screen and close the modal */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.category}>
              {/* 각 카테고리의 TouchableOpacity에 선택 상태에 따라 스타일 적용 */}
              <TouchableOpacity
                onPress={() => handleCategoryPress(options[0])}
                activeOpacity={1}
              >
                <CookieRunBold
                  style={
                    selectedCategory.name === "채소"
                      ? styles.categoryActiveText
                      : styles.categoryInactiveText
                  }
                >
                  채소
                </CookieRunBold>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress(options[1])}
                activeOpacity={1}
              >
                <CookieRunBold
                  style={
                    selectedCategory.name === "꽃"
                      ? styles.categoryActiveText
                      : styles.categoryInactiveText
                  }
                >
                  꽃
                </CookieRunBold>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCategoryPress(options[2])}
                activeOpacity={1}
              >
                <CookieRunBold
                  style={
                    selectedCategory.name === "선인장"
                      ? styles.categoryActiveText
                      : styles.categoryInactiveText
                  }
                >
                  선인장
                </CookieRunBold>
              </TouchableOpacity>
            </View>
            {/* 모달 내용 */}
            <CookieRunBold style={styles.modalText}>
              식물을 선택해주세요
            </CookieRunBold>
            <ScrollView>
              {selectedCategory &&
                renderEmptyImageRows(selectedCategory.subcategories)}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomDropdown;
