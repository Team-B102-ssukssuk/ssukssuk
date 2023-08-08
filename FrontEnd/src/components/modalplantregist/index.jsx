import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalPlantRegist = ({
  isVisible,
  onClose,
  onRegist,
  title,
  placeholder,
  errormessage,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = async () => {
    if (inputValue.length > 0) {
      await onRegist(inputValue);
      setInputValue("");
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
        <CookieRunBold style={styles.modalText}>{title}</CookieRunBold>
        <TextInput
          style={styles.PotInputBox}
          onChangeText={handleInputChange}
          value={inputValue}
          placeholder={placeholder}
          maxLength={8}
        />
        {errormessage != null ? (
          <CookieRunBold style={styles.loginErrorMessageActive}>
            {errormessage}
          </CookieRunBold>
        ) : null}
        <View style={styles.modalButtonAlign}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.RegistButton,
              inputValue.length > 0
                ? styles.buttonActive
                : styles.buttonInactive,
            ]}
          >
            {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
            <CookieRunBold style={styles.RegisText}>등록</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantRegist;
