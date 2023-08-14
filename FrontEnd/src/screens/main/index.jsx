import React, { useState, useEffect } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
// import * as MediaLibrary from "expo-media-library";

import CookieRunRegular from "../../components/common/CookieRunRegular";
import ModalSetting from "../../components/modalsetting";
import ModalPlantSeed from "../../components/modalplantseed";
import ModalMap from "../../components/modalmap";
import ModalDictionary from "../../components/modaldictionary";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import customAxios from "../../utils/axios";
import LoadingScreen from "../loading";
import axios from "axios";
import plantImages from "../../assets/img/plantImages";
import CookieRunBold from "../../components/common/CookieRunBold";
import { setGardenID } from "../../redux/action";
import ModalSensor from "../../components/SensorModal";
import { useIsFocused } from "@react-navigation/native";
import ModalPlantRegist from "../../components/modalplantregist";

const MainScreen = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isSettingModalVisible, setSettingModalVisible] = useState(false);
  const [isCharacterModalVisible, setCharacterModalVisible] = useState(false);
  const [isOpenMapModalVisible, setIsOpenMapModalVisible] = useState(false);
  const [isDictionaryModalVisible, setIsDictionaryModalVisible] =
    useState(false);
  const [isCharacterTrue, setCharacterTrue] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(
    require("../../assets/img/ProfileBackground.png")
  );
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isNotificationData, setNotificationData] = useState([]);

  const [isCharacterData, setCharacterData] = useState({
    plantNickname: null,
  });
  const [isHeartVisible, setHeartVisible] = useState(false);
  const [selectedSensorType, setSelectedSensorType] = useState(null);
  const [isOpenSensorModalVisible, setOpenSensorModalVisible] = useState(false);

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    return resolvedImage;
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const handleSensorPress = (sensorType) => {
    setSelectedSensorType(sensorType);
    toggleOpenSensorModal();
  };

  const changeBackgroundImage = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 6 && currentHour < 18) {
      setBackgroundImage(require("../../assets/img/ProfileBackground.png"));
    } else {
      setBackgroundImage(require("../../assets/img/ProfileBackgroundDark.png"));
    }
  };

  const getNotificationData = () => {
    customAxios
      .get("/notification")
      .then((response) => {
        setIsLoading(false);

        setNotificationData(response.data.data);
      })
      .catch(() => {
        console.log("센서 불러오기 오류");
      });
  };

  const registNotification = () => {
    axios
      .post("http://i9b102.p.ssafy.io:8080/notification", {
        fcm_token: props.notificationToken,
      })
      .then(() => {
        console.log("성공");
      });
  };

  const getUserData = () => {
    customAxios
      .get(`/sensor/${props.potID}`)
      .then((res) => {
        console.log("여기", res.data);

        const temperatureData = res.data.find(
          (sensor) => sensor.sensorType === "T"
        );
        const moistureData = res.data.find(
          (sensor) => sensor.sensorType === "M"
        );
        const humidityData = res.data.find(
          (sensor) => sensor.sensorType === "H"
        );

        if (temperatureData) {
          setTemperature(temperatureData.measurementValue);
        }

        if (moistureData) {
          setMoisture(moistureData.measurementValue);
        }

        if (humidityData) {
          setHumidity(humidityData.measurementValue);
        }
      })
      .catch(() => {
        console.log("문제");
      });
  };

  const getPlantData = (gardenId) => {
    if (gardenId === 999) {
      customAxios
        .get(`/plant/${props.gardenID}`)
        .then((res) => {
          console.log(res.data);
          setCharacterData(res.data.data);
          setCharacterTrue(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      customAxios
        .get(`/plant/${gardenId}`)
        .then((res) => {
          console.log(res.data);
          setCharacterData(res.data.data);
          setCharacterTrue(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log("정원ID : " + props.gardenID);
      getNotificationData();
      getUserData();
      getPlantData(999);
      changeBackgroundImage();
      registNotification();

      setTimeout(() => {
        setIsLoading(false);
      }, 500);

      // 30초마다 getUserData 함수 호출하는 interval 설정
      const sensorInterval = setInterval(() => {
        getUserData();
      }, 30000); // 30초를 밀리초로 변환

      const interval = setInterval(() => {
        changeBackgroundImage();
      }, 3600000); // 매 시간마다 호출 (밀리초 단위)

      return () => {
        clearInterval(sensorInterval);
        clearInterval(interval);
      };
    }
  }, [isFocused]);

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 getUserData 함수 호출
  //   getUserData();
  //   getPlantData(999);
  //   changeBackgroundImage();
  //   registNotification();

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);

  //   // 30초마다 getUserData 함수 호출하는 interval 설정
  //   const sensorInterval = setInterval(() => {
  //     getUserData();
  //   }, 30000); // 30초를 밀리초로 변환

  //   const interval = setInterval(() => {
  //     changeBackgroundImage();
  //   }, 3600000); // 매 시간마다 호출 (밀리초 단위)

  //   // 컴포넌트가 언마운트될 때 interval 정리
  //   return () => {
  //     clearInterval(sensorInterval);
  //     clearInterval(interval);
  //   };
  // }, []);

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

  const toggleOpenSensorModal = () => {
    setOpenSensorModalVisible(!isOpenSensorModalVisible);
  };

  const handleSeedPlant = (plantId, plantName, nickname) => {
    // 씨앗 심기 관련 로직
    // customr

    customAxios
      .post("/plant", {
        plantId: plantId,
        potId: props.potID,
        nickname: nickname,
      })
      .then((res) => {
        console.log("식물 등록 성공");
        props.setGardenID(res.data.data.gardenId);
        getPlantData(res.data.data.gardenId);
      })
      .catch(() => {
        navigation.navigate("Error");
      });

    console.log("Planting seed with nickname: " + nickname);
    console.log("Selected plantId: " + plantId);
    console.log("Selected plantName: " + plantName);
  };

  const handleEdit = (inputValue) => {
    customAxios
      .put("/plant", {
        gardenId: props.gardenID,
        nickname: inputValue,
      })
      .then((res) => {
        console.log(res.data);
        getPlantData(999);
      });
    setEditModalVisible(false);
  };

  const handleWateringPlant = () => {
    customAxios
      .get(`/sensor/water/${props.potID}`)
      .then(() => {
        console.log("성공");
        setHeartVisible(true);

        setTimeout(() => {
          setHeartVisible(false);
        }, 3000);
      })
      .catch(() => {
        console.log("물 급수 관련 오류");
      });
  };

  if (isLoading) {
    // Render the loading screen here
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={styles.SensorContainer}>
            <TouchableOpacity
              onPress={() => handleSensorPress("temperature")}
              style={styles.tmp}
            >
              <Image
                source={require("../../assets/img/tmpSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />

              <CookieRunRegular style={styles.tmpText}>
                {temperature} C°
              </CookieRunRegular>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSensorPress("humidity")}
              style={styles.tmp}
            >
              <Image
                source={require("../../assets/img/humiditySensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />

              <CookieRunRegular style={styles.tmpText}>
                {humidity} %
              </CookieRunRegular>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSensorPress("ground")}
              style={styles.tmp}
            >
              <Image
                source={require("../../assets/img/moistureSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />

              <CookieRunRegular style={styles.tmpText}>
                {moisture} %
              </CookieRunRegular>
            </TouchableOpacity>
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
              {isNotificationData.length !== 0 ? (
                <View style={styles.notificationCircle}>
                  {/* Red circle */}
                </View>
              ) : null}
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
        {isCharacterData.plantNickname != null ? (
          <TouchableOpacity
            style={styles.nameTagSection}
            onPress={toggleEditModal}
          >
            <Image
              source={require("../../assets/img/nameTag.png")}
              resizeMode="contain"
              style={styles.nameTagSize}
            ></Image>
            <CookieRunBold style={styles.characterName}>
              {isCharacterData.plantNickname}
            </CookieRunBold>
          </TouchableOpacity>
        ) : (
          <View style={styles.nameTagSection}></View>
        )}
        {isCharacterTrue ? (
          <View style={styles.characterSection}>
            <Image
              source={getPlantImageSource(
                isCharacterData.plantId,
                isCharacterData.level
              )}
              resizeMode="contain"
              style={styles.characterSize}
            />
            {isHeartVisible && (
              <Image
                source={require("../../assets/img/Heart.gif")}
                resizeMode="contain"
                style={styles.Heart}
              ></Image>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.characterSection}
            onPress={toggleCharacterModal}
          >
            <Image
              source={require("../../assets/img/silhouette.png")}
              resizeMode="contain"
              style={styles.characterSize}
            />
          </TouchableOpacity>
        )}
        <View style={styles.wateringCanSection}>
          <TouchableOpacity onPress={handleWateringPlant}>
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
      <ModalSensor
        isVisible={isOpenSensorModalVisible}
        onClose={() => setOpenSensorModalVisible(false)}
        navigation={navigation}
        selectedSensorType={selectedSensorType} // 선택한 센서 종류 전달
        selectedPotId={props.potID}
      />
      <ModalPlantRegist
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onRegist={handleEdit}
        title="애칭 수정"
        placeholder="변경하시려는 애칭을 말씀해주세요"
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    potID: state.app.potID,
    gardenID: state.app.gardenID,
    notificationToken: state.app.notificationToken,
  };
};

export default connect(mapStateToProps, { setGardenID })(MainScreen);
