import React, { useState } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";
import { COLORS } from "../../constants/theme";
import { Audio } from "expo-av"; // Expo Audio 라이브러리를 추가

const ModalSetting = ({ isVisible, onClose }) => {
  const [toggleSoundValue, setSoundToggleValue] = useState(false);
  const [sound, setSound] = useState();

  const handleSoundToggle = async () => {
    setSoundToggleValue(!toggleSoundValue);

    // 소리를 켜거나 끌 때, 배경음악 재생 상태를 변경
    if (!toggleSoundValue) {
      if (sound) {
        await sound.playAsync();
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sound/귀여워.mp3")
        );
        setSound(sound);
        await sound.playAsync();
        sound.setIsLoopingAsync(true);
      }
    } else {
      if (sound) {
        await sound.stopAsync();
      }
    }
  };

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
        {/* 모달 내용 */}
        <CookieRunBold style={styles.modalText}>설정</CookieRunBold>
        <View style={styles.settingSection}>
          <CookieRunBold style={styles.settingText}>소리</CookieRunBold>
          <CookieRunBold style={styles.onText}>
            {toggleSoundValue ? "ON" : "OFF"}
          </CookieRunBold>
          <Switch
            value={toggleSoundValue}
            onValueChange={handleSoundToggle}
            trackColor={{ false: COLORS.lightGrey, true: COLORS.lightBrown }}
            thumbColor={toggleSoundValue ? COLORS.white : COLORS.white}
          />
        </View>
        <View style={styles.modalButtonAlign}>
          <TouchableOpacity style={styles.CloseButton} onPress={onClose}>
            <CookieRunBold style={styles.CloseText}>닫기</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSetting;
