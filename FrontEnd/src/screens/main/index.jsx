import { useState } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import CookieRunRegular from "../../components/common/CookieRunRegular";
import ModalSetting from "../../components/modalsetting";
import ModalPlantSeed from "../../components/modalplantseed";
import ModalMap from "../../components/modalmap";
import ModalDictionary from "../../components/modaldictionary";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const navigation = useNavigation();
  const [isSettingModalVisible, setSettingModalVisible] = useState(false);
  const [isCharacterModalVisible, setCharacterModalVisible] = useState(false);
  const [isOpenMapModalVisible, setIsOpenMapModalVisible] = useState(false);
  const [isDictionaryModalVisible, setIsDictionaryModalVisible] =
    useState(false);

  const toggleSettingModal = () => {
    setSettingModalVisible(!isSettingModalVisible);
  };

  const toggleCharacterModal = () => {
    setCharacterModalVisible(!isCharacterModalVisible);
  };

  const toggleOpenMap = () => {
    setIsOpenMapModalVisible(!isOpenMapModalVisible);
  };

  const toggleOpenDictionary = () => {
    setIsDictionaryModalVisible(!isDictionaryModalVisible);
  };

  const handleSeedPlant = (nickname, option) => {
    // 씨앗 심기 관련 로직
    console.log("Planting seed with nickname: " + nickname);
    console.log("Selected option: " + option);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/ProfileBackground.png")}
        style={styles.container}
      >
        <View style={styles.userInfoSection}>
          <View style={styles.SensorContainer}>
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/tmpSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                26.3 C°
              </CookieRunRegular>
            </View>
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/humiditySensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                26.3 C°
              </CookieRunRegular>
            </View>
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/moistureSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                26.3 C°
              </CookieRunRegular>
            </View>
            <TouchableOpacity onPress={toggleOpenMap}>
              <Image
                source={require("../../assets/img/map.png")}
                resizeMode="contain"
                style={styles.mapSize}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.IconContainer}>
            <TouchableOpacity
              style={styles.iconBackground}
              onPress={() => navigation.navigate("Alarm")}
            >
              <Image
                source={require("../../assets/img/alarmIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconBackground}>
              <Image
                source={require("../../assets/img/boardIIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.iconBackground}
              onPress={toggleOpenDictionary}
            >
              <Image
                source={require("../../assets/img/dictionaryIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBackground}
              onPress={toggleSettingModal}
            >
              <Image
                source={require("../../assets/img/settingIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nameTagSection}>
          <Image
            source={require("../../assets/img/nameTag.png")}
            resizeMode="contain"
            style={styles.nameTagSize}
          />
        </View>
        <TouchableOpacity
          style={styles.characterSection}
          onPress={toggleCharacterModal}
        >
          <Image
            source={require("../../assets/img/lettuce_3.gif")}
            resizeMode="contain"
            style={styles.characterSize}
          />
        </TouchableOpacity>
        <View style={styles.wateringCanSection}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/img/wateringCanIcon.png")}
              resizeMode="contain"
              style={styles.wateringCanSize}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ModalSetting
        isVisible={isSettingModalVisible}
        onClose={toggleSettingModal}
      />
      <ModalPlantSeed
        isVisible={isCharacterModalVisible}
        onClose={() => setCharacterModalVisible(false)}
        onSeedPlant={handleSeedPlant}
      />
      <ModalMap
        isVisible={isOpenMapModalVisible}
        onClose={() => setIsOpenMapModalVisible(false)}
        navigation={navigation}
      />
      <ModalDictionary
        isVisible={isDictionaryModalVisible}
        onClose={toggleOpenDictionary}
        navigation={navigation}
      />
    </View>
  );
};

export default MainScreen;
