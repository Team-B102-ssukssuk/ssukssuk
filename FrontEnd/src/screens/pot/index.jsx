import { useState } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import ModalPlantDelete from "../../components/modalplantdelete";
import ModalPlantRegist from "../../components/modalplantregist";

const PotScreen = () => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isRegistModalVisible, setRegistModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleRegistModal = () => {
    setRegistModalVisible(!isRegistModalVisible);
  };

  const handleDelete = () => {
    // 삭제 관련 로직
    console.log("식물 삭제 인덱스 넣으면 바로 작동");
    setDeleteModalVisible(false);
  };

  const handleRegist = (inputValue) => {
    // 등록 관련 로직
    console.log("Plant registered with ID: " + inputValue);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/ProfileBackground.png")}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.potWood}>
            <View style={styles.potWoodGroup}>
              <Image source={require("../../assets/img/potTag.png")} />
              <CookieRunBold style={styles.PotWoodText}>내 화분</CookieRunBold>
            </View>
          </View>
          <View style={styles.alignCenterContainer}>
            <View style={styles.reContainer}>
              <View>
                <View style={styles.absoultPosition1}>
                  <View style={styles.potSign}>
                    <TouchableOpacity style={styles.potName}>
                      <CookieRunBold style={styles.potText}>
                        식물애칭
                      </CookieRunBold>
                    </TouchableOpacity>
                    <View style={styles.potDelete}>
                      <TouchableOpacity onPress={toggleDeleteModal}>
                        <Icon2 name="close" style={styles.deleteIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.gardenCharacter}
                    onPress={toggleRegistModal}
                  >
                    <Image
                      source={require("../../assets/img/pot.png")}
                      resizeMode="contain"
                      style={styles.potResize}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>

            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>
            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
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
      <ModalPlantRegist
        isVisible={isRegistModalVisible}
        onClose={() => setRegistModalVisible(false)}
        onRegist={handleRegist}
        title="화분 등록"
        placeholder="화분 고유 ID를 입력해주세요"
      />
    </View>
  );
};

export default PotScreen;
