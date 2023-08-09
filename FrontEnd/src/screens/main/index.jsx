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

const MainScreen = (props) => {
  const navigation = useNavigation();
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

  const changeBackgroundImage = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 6 && currentHour < 18) {
      setBackgroundImage(require("../../assets/img/ProfileBackground.png"));
    } else {
      setBackgroundImage(require("../../assets/img/ProfileBackgroundDark.png"));
    }
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

  useEffect(() => {
    changeBackgroundImage();
    registNotification();

    const interval = setInterval(() => {
      changeBackgroundImage();
    }, 3600000); // 매 시간마다 호출 (밀리초 단위)

    return () => {
      clearInterval(interval);
    };
  }, []);

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
          setCharacterTrue(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 getUserData 함수 호출
    getUserData();
    getPlantData(999);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // 30초마다 getUserData 함수 호출하는 interval 설정
    const interval = setInterval(() => {
      getUserData();
    }, 30000); // 30초를 밀리초로 변환

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getPlantData(999);
  }, []);

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
        getPlantData(res.data.data.gardenId);
      })
      .catch(() => {
        navigation.navigate("Error");
      });

    console.log("Planting seed with nickname: " + nickname);
    console.log("Selected plantId: " + plantId);
    console.log("Selected plantName: " + plantName);
  };

  const handleWateringPlant = () => {
    customAxios
      .get(`/sensor/water/${props.potID}`)
      .then(() => {
        console.log("성공");
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
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/tmpSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                {temperature} C°
              </CookieRunRegular>
            </View>
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/humiditySensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                {humidity} %
              </CookieRunRegular>
            </View>
            <View style={styles.tmp}>
              <Image
                source={require("../../assets/img/moistureSensor.png")}
                resizeMode="contain"
                style={styles.sensorSize}
              />
              <CookieRunRegular style={styles.tmpText}>
                {moisture} %
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
            <TouchableOpacity style={styles.iconBackground}>
              <Image
                source={require("../../assets/img/boardIIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity>
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
        {isCharacterTrue ? (
          <View style={styles.characterSection}>
            <Image
              source={require("../../assets/img/lettuce_3.gif")}
              resizeMode="contain"
              style={styles.characterSize}
            />
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

export default connect(mapStateToProps)(MainScreen);
