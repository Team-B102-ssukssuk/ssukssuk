import { useState } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import ModalPlantDelete from "../../components/modalplantdelete";
import ModalPlantRegist from "../../components/modalplantregist";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const PotScreen = () => {
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isRegistModalVisible, setRegistModalVisible] = useState(false);
  const [isDeleteIconVisible, setDeleteIconVisible] = useState(false);

  const response = {
    message: "OK",
    status: "200",
    data: [
      {
        pot_plant_id: 232,
        plant_nickname: "Sprout1",
      },
      {
        pot_plant_id: 234,
        plant_nickname: "Sprout2",
      },
      {
        pot_plant_id: 236,
        plant_nickname: "Sprout4",
      },
      {
        pot_plant_id: 236,
        plant_nickname: "Sprout4",
      },
    ],
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleRegistModal = () => {
    setRegistModalVisible(!isRegistModalVisible);
  };

  const visibleIcon = () => {
    setDeleteIconVisible(!isDeleteIconVisible);
  };

  const GoMain = () => {
    navigation.push("Slider");
  };

  const renderPotsOnShelve = (startIndex, endIndex) => {
    const pots = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < response.data.length) {
        const plant = response.data[i];
        pots.push(
          <View
            key={`pot_${plant.pot_plant_id}`}
            style={styles[`absoultPosition${i + 1}`]}
          >
            {isDeleteIconVisible ? (
              <Animatable.View
                animation="pulse"
                duration={700}
                iterationCount="infinite"
              >
                <TouchableOpacity
                  style={styles.potSign}
                  onPress={toggleDeleteModal}
                >
                  <View style={styles.potName}>
                    <CookieRunBold style={styles.potText}>
                      {plant.plant_nickname}
                    </CookieRunBold>
                  </View>
                  <View style={styles.potDelete}>
                    <View>
                      <Icon2 name="close" style={styles.deleteIcon} />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ) : (
              <View style={styles.potSign}>
                <View style={styles.potName}>
                  <CookieRunBold style={styles.potText}>
                    {plant.plant_nickname}
                  </CookieRunBold>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.gardenCharacter} onPress={GoMain}>
              <Image
                source={require("../../assets/img/pot.png")}
                resizeMode="contain"
                style={styles.potResize}
              />
            </TouchableOpacity>
          </View>
        );
      } else if (i === response.data.length) {
        // If there are no more pots, display an empty transparent pot
        const transparentPotStyle = {
          ...styles[`absoultPosition${i + 1}`],
          opacity: 0.5, // Set opacity to make it transparent
        };
        pots.push(
          <View key={`empty_pot_${endIndex}`} style={transparentPotStyle}>
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
        );
      }
    }

    return pots;
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
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(0, 3)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>

            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(3, 6)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>
            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(6, 9)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.trashCanMargin}>
            <TouchableOpacity onPress={visibleIcon}>
              <Image
                source={require("../../assets/img/trashCan.png")}
                style={styles.trashCan}
              />
            </TouchableOpacity>
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
