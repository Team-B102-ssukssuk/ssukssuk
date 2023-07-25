import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import ModalPlantDelete from "../../components/modalplantdelete";
import CookieRunBold from "../../components/common/CookieRunBold";

const GardenScreen = () => {
  const [gardenName] = useState("지민이네");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleDelete = () => {
    // 삭제 관련 로직
    console.log("식물 삭제 인덱스 넣으면 바로 작동");
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/ProfileBackground.png")}
        style={styles.container}
      >
        <View style={styles.userInfoSection}>
          <View style={styles.header}>
            <Icon name="arrow-back-ios" size={28} color="#fff" />
          </View>
        </View>
        <ScrollView>
          <View style={styles.gardenWood}>
            <View style={styles.gardenWoodGroup}>
              <Image source={require("../../assets/img/gardenWood.png")} />
              <CookieRunBold style={styles.gardenWoodText}>
                {gardenName}
              </CookieRunBold>
            </View>
          </View>
          <View style={styles.alignCenterContainer}>
            {/* 한 줄 시작 */}
            <View style={styles.reContainer}>
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <View style={styles.gardenCharacterName}>
                      <CookieRunBold style={styles.gardenCharacterNameText}>
                        식물애칭
                      </CookieRunBold>
                    </View>
                    <TouchableOpacity
                      style={styles.gardenCharacterDelete}
                      onPress={toggleDeleteModal}
                    >
                      <Icon2 name="close" style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.gardenCharacter}>
                    <Image
                      source={require("../../assets/img/characterBaechoo.png")}
                      resizeMode="contain"
                      style={styles.gardenCharacterResize}
                    />
                  </View>
                </View>
                <View style={styles.gardenGround}>
                  <Image
                    source={require("../../assets/img/gardenGround.png")}
                  />
                </View>
              </View>
              {/* 한칸 끝 */}
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <TouchableOpacity style={styles.gardenCharacterName}>
                      <CookieRunBold style={styles.gardenCharacterNameText}>
                        식물애칭
                      </CookieRunBold>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="close" style={styles.deleteIcon} />
                    </View>
                  </View>

                  <View style={styles.gardenCharacter}>
                    <Image
                      source={require("../../assets/img/characterBaechoo.png")}
                      resizeMode="contain"
                      style={styles.gardenCharacterResize}
                    />
                  </View>
                </View>
                <View style={styles.gardenGround}>
                  <Image
                    source={require("../../assets/img/gardenGround.png")}
                  />
                </View>
              </View>
              {/* 한칸 끝 */}
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <TouchableOpacity style={styles.gardenCharacterName}>
                      <CookieRunBold style={styles.gardenCharacterNameText}>
                        식물애칭
                      </CookieRunBold>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="close" style={styles.deleteIcon} />
                    </View>
                  </View>

                  <View style={styles.gardenCharacter}>
                    <Image
                      source={require("../../assets/img/characterBaechoo.png")}
                      resizeMode="contain"
                      style={styles.gardenCharacterResize}
                    />
                  </View>
                </View>
                <View style={styles.gardenGround}>
                  <Image
                    source={require("../../assets/img/gardenGround.png")}
                  />
                </View>
              </View>
              {/* 한칸 끝 */}
            </View>
          </View>

          <View style={styles.trashCanMargin}>
            <Image
              source={require("../../assets/img/trashCan.png")}
              style={styles.trashCan}
            />
          </View>
        </ScrollView>
      </ImageBackground>
      <ModalPlantDelete
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default GardenScreen;
