import React from "react";
import { View, Image } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalInfo = ({ isVisible, onClose, plant, plantImg }) => {
  // console.log(plantImg);
  if (!plant) {
    return null;
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={300}
      backdropPressToClose={true} // This line allows closing the modal when tapping outside
    >
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          {plant.createdDate != null ? (
            <Image
              source={plantImg}
              resizeMode="contain"
              style={styles.emptyImgTest}
            />
          ) : (
            <Image
              source={require("../../assets/img/silhouette.png")}
              resizeMode="contain"
              style={styles.emptyImgTest}
            />
          )}
          <View style={styles.titleText}>
            <CookieRunBold style={styles.plantName}>
              {plant.characterName}
            </CookieRunBold>
            <CookieRunRegular style={styles.plantLevel}>
              {plant.level}단계 식물
            </CookieRunRegular>
          </View>
        </View>
        <CookieRunRegular style={styles.guideText}>
          {plant.plantGuide}
        </CookieRunRegular>
        <CookieRunBold style={styles.voiceText}>
          &apos;{plant.characterComment}&apos;
        </CookieRunBold>
      </View>
    </Modal>
  );
};

export default ModalInfo;
