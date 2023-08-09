import React, { useState, useEffect } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import ModalPlantDelete from "../../components/modalplantdelete";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import customAxios from "../../utils/axios";
import ModalPlantSeed from "../../components/modalplantseed";
import LoadingScreen from "../loading";

const GardenScreen = () => {
  const navigation = useNavigation();
  const [gardenName] = useState("내 정원");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleteIconVisible, setDeleteIconVisible] = useState(false);
  const [isCharacterModalVisible, setCharacterModalVisible] = useState(false);
  const [isDeleteGardenId, setDeleteGardenId] = useState(0);
  const [isPlantData, setPlantData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSeedPlant = (nickname, option) => {
    // 씨앗 심기 관련 로직
    console.log("Planting seed with nickname: " + nickname);
    console.log("Selected option: " + option);
  };

  const getPotData = () => {
    customAxios
      .get("/plant/all")
      .then((res) => {
        setPlantData(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch(() => {
        console.log("정원 데이터 불러오기 오류");
      });
  };

  useEffect(() => {
    getPotData();
  }, []);

  const visibleIcon = () => {
    setDeleteIconVisible(!isDeleteIconVisible);
  };

  const toggleDeleteModal = (garden) => {
    setDeleteModalVisible(!isDeleteModalVisible);
    setDeleteGardenId(garden.gardenId);
  };

  const handleDelete = () => {
    // 삭제 관련 로직
    console.log("식물 삭제 인덱스 넣으면 바로 작동");
    customAxios
      .put(`plant/delete/${isDeleteGardenId}`)
      .then(() => {
        console.log("삭제성공");
        getPotData();
        visibleIcon();
      })
      .catch(() => {
        console.log("정원 식물 삭제 관련 오류");
      });
    setDeleteModalVisible(false);
  };

  const gardenPlants = isPlantData; // Use all the garden data from the response

  // Function to divide the gardenPots into rows
  const divideIntoRows = (arr, size) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += size) {
      const row = arr.slice(i, i + size);
      rows.push(row);
    }
    return rows;
  };

  const rows = divideIntoRows(gardenPlants, 3);

  if (isLoading) {
    // Render the loading screen here
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/ProfileBackground.png")}
        style={styles.container}
      >
        <View style={styles.userInfoSection}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push("Slider")}>
              <Icon name="arrow-back-ios" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.gardenWood}>
          <View style={styles.gardenWoodGroup}>
            <Image source={require("../../assets/img/gardenWood.png")} />
            <CookieRunBold style={styles.gardenWoodText}>
              {gardenName}
            </CookieRunBold>
          </View>
        </View>
        <ScrollView style={styles.plantContainer}>
          <View style={styles.alignCenterContainer}>
            {/* Map through the rows */}
            {rows.map((row, rowIndex) => (
              <View style={styles.reContainer} key={`row_${rowIndex}`}>
                {/* Map through the pots in each row */}
                {row.map((garden, potIndex) => (
                  <View
                    style={styles.gardenContainer}
                    key={`garden_${potIndex}`}
                  >
                    {isDeleteIconVisible ? (
                      <View style={styles.absoultPosition}>
                        <Animatable.View
                          animation="pulse"
                          duration={700}
                          iterationCount="infinite"
                        >
                          <TouchableOpacity
                            style={styles.gardenCharacterSign}
                            onPress={() => toggleDeleteModal(garden)}
                          >
                            <View style={styles.gardenCharacterName}>
                              <CookieRunBold
                                style={styles.gardenCharacterNameText}
                              >
                                {garden.plantNickname}
                                {/* Display the plant name */}
                              </CookieRunBold>
                            </View>
                            <View style={styles.gardenCharacterDelete}>
                              <Icon2 name="close" style={styles.deleteIcon} />
                            </View>
                          </TouchableOpacity>
                        </Animatable.View>
                        <View style={styles.gardenCharacter}>
                          {/* Transparent character image */}
                          <Image
                            source={require("../../assets/img/characterBaechoo.png")}
                            resizeMode="contain"
                            style={styles.gardenCharacterResize}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.absoultPosition}>
                        <View style={styles.gardenCharacterSign}>
                          <View style={styles.gardenCharacterName}>
                            <CookieRunBold
                              style={styles.gardenCharacterNameText}
                            >
                              {garden.plantNickname}
                              {/* Display the plant name */}
                            </CookieRunBold>
                          </View>
                        </View>
                        <View style={styles.gardenCharacter}>
                          {/* Transparent character image */}
                          <Image
                            source={require("../../assets/img/characterBaechoo.png")}
                            resizeMode="contain"
                            style={styles.gardenCharacterResize}
                          />
                        </View>
                      </View>
                    )}

                    <View style={styles.gardenGround}>
                      {/* Garden ground image */}
                      <Image
                        source={require("../../assets/img/gardenGround.png")}
                        resizeMode="cover"
                        style={styles.imgSize}
                      />
                    </View>
                  </View>
                ))}
                {/* Add transparent pots to fill the remaining spaces */}
                {Array(3 - row.length)
                  .fill()
                  .map((_, emptyIndex) => (
                    <View
                      style={styles.gardenContainer}
                      key={`empty_${emptyIndex}`}
                    >
                      <View style={styles.gardenGround}>
                        {/* Garden ground image */}
                        <Image
                          source={require("../../assets/img/gardenGround.png")}
                          resizeMode="cover"
                          style={styles.imgSize}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            ))}
            {/* Add one extra row with the transparent character */}
            <View style={styles.reContainer}>
              {Array(3)
                .fill()
                .map((_, emptyIndex) => (
                  <View
                    style={styles.gardenContainer}
                    key={`empty_garden_${emptyIndex}`}
                  >
                    <View style={styles.absoultPosition}>
                      <View style={styles.gardenCharacter}>
                        {/* Transparent character image */}
                      </View>
                    </View>
                    <View style={styles.gardenGround}>
                      {/* Garden ground image */}
                      <Image
                        source={require("../../assets/img/gardenGround.png")}
                        resizeMode="cover"
                        style={styles.imgSize}
                      />
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.trashCanMargin} onPress={visibleIcon}>
          <Image
            source={require("../../assets/img/trashCan.png")}
            style={styles.trashCan}
          />
        </TouchableOpacity>
      </ImageBackground>
      <ModalPlantSeed
        isVisible={isCharacterModalVisible}
        onClose={() => setCharacterModalVisible(false)}
        onSeedPlant={handleSeedPlant}
      />
      <ModalPlantDelete
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default GardenScreen;
