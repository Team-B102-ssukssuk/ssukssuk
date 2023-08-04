import { useState, useEffect } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import ModalPlantDelete from "../../components/modalplantdelete";
import ModalPlantRegist from "../../components/modalplantregist";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import customAxios from "../../utils/axios";
import { connect } from "react-redux";
import { storePotID, setGardenID } from "../../redux/action";

const PotScreen = (props) => {
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isRegistModalVisible, setRegistModalVisible] = useState(false);
  const [isDeleteIconVisible, setDeleteIconVisible] = useState(false);
  const [isPotId, setPotID] = useState(0);

  const [isPotData, setPotData] = useState([]);

  const getPotData = () => {
    customAxios.get("/pot").then((res) => {
      console.log(res.data);
      setPotData(res.data);
    });
  };

  useEffect(() => {
    getPotData();
  }, []);

  const toggleDeleteModal = (potId) => {
    setPotID(potId);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleRegistModal = () => {
    setRegistModalVisible(!isRegistModalVisible);
  };

  const visibleIcon = () => {
    setDeleteIconVisible(!isDeleteIconVisible);
  };

  const GoMain = (potId, gardenId) => {
    // Store the potID in Redux using the action
    props.storePotID(potId);
    props.setGardenID(gardenId);
    navigation.push("Slider");
  };

  const renderPotsOnShelve = (startIndex, endIndex) => {
    const pots = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < isPotData.length) {
        const plant = isPotData[i];
        const potId = plant.potId;
        pots.push(
          <View
            key={`pot_${plant.potId}`}
            style={styles[`absoultPosition${i + 1}`]}
          >
            {plant.isUse ? (
              <>
                {isDeleteIconVisible ? (
                  <Animatable.View
                    animation="pulse"
                    duration={700}
                    iterationCount="infinite"
                  >
                    <TouchableOpacity
                      style={styles.potSign}
                      onPress={() => toggleDeleteModal(plant.potId)}
                    >
                      <View style={styles.potName}>
                        <CookieRunBold style={styles.potText}>
                          {plant.nickname}
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
                        {plant.nickname}
                      </CookieRunBold>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <>
                {isDeleteIconVisible ? (
                  <Animatable.View
                    animation="pulse"
                    duration={700}
                    iterationCount="infinite"
                  >
                    <TouchableOpacity
                      style={styles.potSign}
                      onPress={() =>
                        toggleDeleteModal(plant.potId, plant.gardenId)
                      }
                    >
                      <View style={styles.potEmptyDelete}>
                        <View>
                          <Icon2 name="close" style={styles.emptyDeleteIcon} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                ) : null}
              </>
            )}

            {plant.isUse ? (
              <TouchableOpacity
                style={styles.gardenCharacter}
                onPress={() => GoMain(potId, plant.gardenId)}
              >
                <Image
                  source={require("../../assets/img/characterBaechoo.png")}
                  resizeMode="contain"
                  style={styles.potResize}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.gardenCharacter}
                onPress={() => GoMain(potId, plant.gardenId)}
              >
                <Image
                  source={require("../../assets/img/pot.png")}
                  resizeMode="contain"
                  style={styles.potResize}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      } else if (i === isPotData.length) {
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

  const handleDelete = (potID) => {
    // Log the potID before deleting
    const data = {
      potId: potID,
    };
    customAxios.put("/pot", data).then(() => {
      getPotData();
    });
    setDeleteModalVisible(false);
  };

  const handleRegist = (inputValue) => {
    const serialNumber = {
      serialNumber: inputValue,
    };

    // 등록 관련 로직
    console.log("Plant registered with ID: " + inputValue);
    customAxios
      .post("/pot", serialNumber)
      .then(() => {
        console.log("등록 성공");
        getPotData();
      })
      .catch((err) => {
        console.log(err);
      });
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
        potID={isPotId}
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

const mapStateToProps = (state) => {
  return {
    potID: state.potID,
    gardenID: state.gardenID,
  };
};

export default connect(mapStateToProps, { storePotID, setGardenID })(PotScreen);
