import React from "react";
import { View, Image } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalInfo = ({ isVisible, onClose }) => {
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
    >
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <Image
            source={require("../../assets/img/silhouette.png")}
            resizeMode="contain"
            style={styles.emptyImg}
          />
          <View style={styles.titleText}>
            <CookieRunBold style={styles.plantName}>상추</CookieRunBold>
            <CookieRunRegular style={styles.plantLevel}>
              1단계 씨앗
            </CookieRunRegular>
          </View>
        </View>
        <CookieRunRegular style={styles.guideText}>
          물주는법 : 우루룰루라라라 라라라라라라나우ㅜ우우우우
          ㄴㅁㄴㅇ머ㅏㅓㅏㅇㅁ
        </CookieRunRegular>
        <CookieRunBold style={styles.voiceText}>
          &apos;나는 잎이 여리다추~!!&apos;
        </CookieRunBold>
      </View>
    </Modal>
  );
};

export default ModalInfo;
