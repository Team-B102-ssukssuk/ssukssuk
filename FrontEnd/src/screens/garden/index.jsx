import { ImageBackground, Text, View, Image } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const GardenScreen = () => {
  const [gardenName] = useState("지민이네");

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
              <Text style={styles.gardenWoodText}>{gardenName}</Text>
            </View>
          </View>
          <View style={styles.alignCenterContainer}>
            {/* 한 줄 시작 */}
            <View style={styles.reContainer}>
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <TouchableOpacity
                      style={styles.gardenCharacterName}
                      onPress={() => console.log("시작")}
                    >
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <TouchableOpacity>
                        <Icon2 name="closecircle" style={styles.deleteIcon} />
                      </TouchableOpacity>
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
            {/* 한 줄 끝 */}
            {/* 한 줄 시작 */}
            <View style={styles.reContainer}>
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <TouchableOpacity style={styles.gardenCharacterName}>
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
            {/* 한 줄 끝 */}
            {/* 한 줄 시작 */}
            <View style={styles.reContainer}>
              {/* 한칸 시작 */}
              <View style={styles.gardenContainer}>
                <View style={styles.absoultPosition}>
                  <View style={styles.gardenCharacterSign}>
                    <TouchableOpacity style={styles.gardenCharacterName}>
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
                      <Text style={styles.gardenCharacterNameText}>
                        식물애칭
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.gardenCharacterDelete}>
                      <Icon2 name="closecircle" style={styles.deleteIcon} />
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
            {/* 한 줄 끝 */}
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

export default GardenScreen;
