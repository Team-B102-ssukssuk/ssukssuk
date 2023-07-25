import { ImageBackground, View, Image } from "react-native";
import styles from "./style";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";

const PotScreen = () => {
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
                      <TouchableOpacity>
                        <Icon2 name="close" style={styles.deleteIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.gardenCharacter}>
                    <Image
                      source={require("../../assets/img/pot.png")}
                      resizeMode="contain"
                      style={styles.potResize}
                    />
                  </View>
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
    </View>
  );
};

export default PotScreen;
