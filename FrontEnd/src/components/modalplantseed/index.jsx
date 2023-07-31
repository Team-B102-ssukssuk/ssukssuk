import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalPlantSeed = ({ isVisible, onClose, onSeedPlant }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSeedPlant = () => {
    // Call the onSeedPlant function and pass the input value as a parameter
    onSeedPlant(inputValue);
    // Reset the input value and close the modal
    setInputValue("");
    onClose();
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
        <CookieRunBold style={styles.modalText}>씨앗 심기</CookieRunBold>
        <View style={styles.characterSection}>
          <Image
            source={require("../../assets/img/lettuce_3.gif")}
            resizeMode="contain"
            style={styles.characterSize}
          />
        </View>
        <CookieRunBold style={styles.characterText}>상추</CookieRunBold>
        <View style={styles.modalButtonAlign}>
          <TextInput
            style={styles.PotInputBox}
            onChangeText={handleInputChange}
            value={inputValue}
            placeholder="애칭을 입력해주세요"
          />
          <TouchableOpacity
            style={[styles.SeedButton]}
            onPress={handleSeedPlant}
          >
            <CookieRunBold style={styles.plantText}>심기</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantSeed;
