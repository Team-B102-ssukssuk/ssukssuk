import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import ModalInfo from "../modalInfo";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";
import customAxios from "../../utils/axios";
import plantImages from "../../assets/img/plantImages";

const ModalDictionary = ({ isVisible, onClose }) => {
  const [isContentModalVisible, setContentModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("채소");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isDictionaryData, setDictionaryData] = useState([]);
  const [isSelectedPlantImg, setSelectedPlantImg] = useState(null);

  const getPlantImageSource = (plantId, index) => {
    const imageName = `${plantId}_${index + 1}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    return resolvedImage;
  };

  const getDictionaryData = () => {
    customAxios
      .get("/plantinfo")
      .then((res) => {
        // console.log(JSON.stringify(res.data.data));
        setDictionaryData(res.data.data);
      })
      .catch(() => {
        console.log("도감 전체 관련 오류");
      });
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 getUserData 함수 호출
    getDictionaryData();
  }, [isVisible]);

  const toggleContentModal = (plant, plantImg) => {
    setSelectedPlant(plant);
    setSelectedPlantImg(plantImg);
    setContentModalVisible(!isContentModalVisible);
  };

  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderEmptyImageRows = (plants, plantId) => {
    const numColumns = 3;
    const emptyImageSize = 75; // Define the size of each emptyImage
    const gapSize = 5; // Define the gap between emptyImage elements

    // console.log(plantId);

    return plants.map((plant, index) => (
      <View
        key={`${plant.level}_${plant.plantId}`}
        style={styles.emptyImageContainer}
      >
        <TouchableOpacity
          onPress={() =>
            toggleContentModal(plant, getPlantImageSource(plantId, index))
          }
        >
          {plant.createdDate != null ? (
            <Image
              // source={require(`../../assets/img/${plantId}_${index + 1}.png`)}
              source={getPlantImageSource(plantId, index)}
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
          ) : (
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
          )}
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
          {isDictionaryData.map((category) => (
            <View key={`category_${category.categoryId}`}>
              {console.log("여기 : " + JSON.stringify(category))}
              {category.categoryName === selectedCategory &&
                category.plants.map((plant) => (
                  <View key={`category_plant_${plant.plantId}`}>
                    <View style={styles.content}>
                      <CookieRunBold style={styles.dictionaryText}>
                        {plant.plantName}
                      </CookieRunBold>
                      {plant.isDone ? (
                        <View style={styles.dictionaryContainer}>
                          {renderEmptyImageRows(
                            plant.plantInfos,
                            plant.plantId
                          )}
                        </View>
                      ) : (
                        <Image
                          source={require("../../assets/img/ComingSoon.png")}
                          style={styles.comingsoon}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  </View>
                ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <ModalInfo
        isVisible={isContentModalVisible}
        onClose={() => setContentModalVisible(false)}
        plant={selectedPlant}
        plantImg={isSelectedPlantImg}
      ></ModalInfo>
    </Modal>
  );
};

export default ModalDictionary;
