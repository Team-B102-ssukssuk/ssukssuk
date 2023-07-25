import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import CookieRunRegular from "../../components/common/CookieRunRegular";
import styles from "./style";

const MainScreen = () => {
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
            <TouchableOpacity>
              <Image
                source={require("../../assets/img/map.png")}
                resizeMode="contain"
                style={styles.mapSize}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.IconContainer}>
            <TouchableOpacity style={styles.iconBackground}>
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
            <TouchableOpacity style={styles.iconBackground}>
              <Image
                source={require("../../assets/img/dictionaryIcon.png")}
                resizeMode="contain"
                style={styles.iconSize}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBackground}>
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
        <View style={styles.characterSection}>
          <Image
            source={require("../../assets/img/lettuce_3.gif")}
            resizeMode="contain"
            style={styles.characterSize}
          />
        </View>
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
    </View>
  );
};

export default MainScreen;
