// ModalSetting.js

import React, { useState } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";
import { COLORS } from "../../constants/theme";

const ModalSetting = ({ isVisible, onClose }) => {
  const [toggleSoundValue, setSoundToggleValue] = useState(false);
  // const [toggleEffectValue, setToggleEffectValue] = useState(false);

  const handleSoundToggle = () => {
    setSoundToggleValue(!toggleSoundValue);
  };

  // const handleEffectToggle = () => {
  //   setToggleEffectValue(!toggleEffectValue);
  // };

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
          {toggleSoundValue ? (
            <CookieRunBold style={styles.onText}>ON</CookieRunBold>
          ) : (
            <CookieRunBold style={styles.offText}>OFF</CookieRunBold>
          )}
          <Switch
            value={toggleSoundValue}
            onValueChange={handleSoundToggle}
            trackColor={{ false: COLORS.lightGrey, true: COLORS.lightBrown }}
            thumbColor={toggleSoundValue ? COLORS.white : COLORS.white}
          />
        </View>
        {/* <View style={styles.settingSection}>
          <CookieRunBold style={styles.settingText}>효과음</CookieRunBold>
          {toggleEffectValue ? (
            <CookieRunBold style={styles.onText}>ON</CookieRunBold>
          ) : (
            <CookieRunBold style={styles.offText}>OFF</CookieRunBold>
          )}
          <Switch
            value={toggleEffectValue}
            onValueChange={handleEffectToggle}
            trackColor={{ false: COLORS.lightGrey, true: COLORS.lightBrown }}
            thumbColor={toggleEffectValue ? COLORS.white : COLORS.white}
          />
        </View> */}
        <View style={styles.modalButtonAlign}>
          <TouchableOpacity style={styles.CloseButton} onPress={onClose}>
            {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
            <CookieRunBold style={styles.CloseText}>닫기</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSetting;
