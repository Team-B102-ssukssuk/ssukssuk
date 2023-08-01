import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import ModalInfo from "../modalInfo";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";

const ModalDictionary = ({ isVisible, onClose }) => {
  const [isContentModalVisible, setContentModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("채소");
  const [selectedPlant, setSelectedPlant] = useState(null);

  

  const response = {
    message: "OK",
    data: {
      categories: [
        {
          categoryId: 3,
          categoryName: "선인장",
          plants: [
            {
              plantId: 3,
              plantName: "미니 선인장",
              tempMax: 33.3,
              tempMin: 33.0,
              moistureMax: 333.3,
              moistureMin: 333.0,
              plantInfos: [
                {
                  level: 1,
                  plantGuide: "잘 키워 주세요11",
                  waterTerm: 1,
                  waterAmount: 310,
                  characterName: "선인장1",
                  characterComment: "안녕하세요1",
                  characterImage: "img......",
                },
                {
                  level: 2,
                  plantGuide: "선인장 2222",
                  waterTerm: 2,
                  waterAmount: 200,
                  characterName: "선인장2",
                  characterComment: "22222",
                  characterImage: "사진...",
                },
                {
                  level: 3,
                  plantGuide: "잘 키워 주세요23",
                  waterTerm: 3,
                  waterAmount: 330,
                  characterName: "선인장3",
                  characterComment: "안녕하세요1",
                  characterImage: "img......",
                },
              ],
            },
          ],
        },
        {
          categoryId: 1,
          categoryName: "채소",
          plants: [
            {
              plantId: 1,
              plantName: "상추",
              tempMax: 11.1,
              tempMin: 11.0,
              moistureMax: 111.1,
              moistureMin: 111.0,
              plantInfos: [
                {
                  level: 1,
                  plantGuide: "잘 키워 주세요11",
                  waterTerm: 1,
                  waterAmount: 110,
                  characterName: "상추1",
                  characterComment: "안녕하세요1",
                  characterImage: "img......",
                },
                {
                  level: 2,
                  plantGuide: "잘 키워 주세요",
                  waterTerm: 2,
                  waterAmount: 220,
                  characterName: "상추2",
                  characterComment: "안녕하세요",
                  characterImage: "img......",
                },
                {
                  level: 3,
                  plantGuide: "잘 키워 주세요33",
                  waterTerm: 3,
                  waterAmount: 130,
                  characterName: "상추3",
                  characterComment: "안녕하세요1",
                  characterImage: "img......",
                },
              ],
            },
          ],
        },
      ],
    },
  };

  const toggleContentModal = (plant) => {
    setSelectedPlant(plant);
    setContentModalVisible(!isContentModalVisible);
  };

  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderEmptyImageRows = (plants) => {
    const numColumns = 3;
    const emptyImageSize = 75; // Define the size of each emptyImage
    const gapSize = 5; // Define the gap between emptyImage elements

    return plants.map((plant, index) => (
      <View key={plant.plantId} style={styles.emptyImageContainer}>
        <TouchableOpacity onPress={() => toggleContentModal(plant)}>
          <Image
            source={require("../../assets/img/silhouette.png")}
            resizeMode="contain"
            style={[
              styles.emptyImg,
              {
                marginLeft: index % numColumns !== 0 ? gapSize : 0,
                marginRight:
                  index % numColumns !== numColumns - 1 ? gapSize : 0,
                width: emptyImageSize,
                height: emptyImageSize,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={300}
    >
      <View style={styles.modalContainer}>
        <View style={styles.category}>
          {/* 각 카테고리의 TouchableOpacity에 선택 상태에 따라 스타일 적용 */}
          <TouchableOpacity
            onPress={() => toggleCategory("채소")}
            activeOpacity={1}
          >
            <CookieRunBold
              style={
                selectedCategory === "채소"
                  ? styles.categoryActiveText
                  : styles.categoryInactiveText
              }
            >
              채소
            </CookieRunBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory("꽃")}
            activeOpacity={1}
          >
            <CookieRunBold
              style={
                selectedCategory === "꽃"
                  ? styles.categoryActiveText
                  : styles.categoryInactiveText
              }
            >
              꽃
            </CookieRunBold>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory("선인장")}
            activeOpacity={1}
          >
            <CookieRunBold
              style={
                selectedCategory === "선인장"
                  ? styles.categoryActiveText
                  : styles.categoryInactiveText
              }
            >
              선인장
            </CookieRunBold>
          </TouchableOpacity>
        </View>
        {/* 모달 내용 */}
        <CookieRunBold style={styles.modalText}>도감</CookieRunBold>
        <ScrollView>
          {response.data.categories.map((category) =>
            category.categoryName === selectedCategory ? (
              <View key={category.categoryId}>
                {category.plants.map((plant) => (
                  <View key={plant.plantId}>
                    <View style={styles.content}>
                      <CookieRunBold style={styles.dictionaryText}>
                        {plant.plantName}
                      </CookieRunBold>
                      <View style={styles.dictionaryContainer}>
                        {renderEmptyImageRows(plant.plantInfos)}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : null
          )}
        </ScrollView>
      </View>

      <ModalInfo
        isVisible={isContentModalVisible}
        onClose={() => setContentModalVisible(false)}
        plant={selectedPlant}
      ></ModalInfo>
    </Modal>
  );
};

export default ModalDictionary;
