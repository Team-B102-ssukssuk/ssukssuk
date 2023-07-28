import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalPlantSeed = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        {/* 아이콘 또는 문구 클릭 시 모달 창이 열리도록 설정 */}
        <CookieRunBold style={styles.openButton}>모달창</CookieRunBold>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
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
            ></TextInput>
            <TouchableOpacity
              style={[styles.CloseButton]}
              onPress={toggleModal}
            >
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <CookieRunBold style={styles.CloseText}>심기</CookieRunBold>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPlantSeed;
