import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalPlantRegist = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [trueMessage, setTrueMessage] = useState(false);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    alert("Input value submitted: " + inputValue);
    setTrueMessage(true);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const isButtonEnabled = inputValue.length > 0;

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
          <CookieRunBold style={styles.modalText}>화분 등록</CookieRunBold>
          <TextInput
            style={styles.PotInputBox}
            onChangeText={handleInputChange}
            value={inputValue}
            placeholder="화분 고유 ID를 입력해주세요"
          ></TextInput>
          <CookieRunBold
            style={
              trueMessage
                ? styles.loginErrorMessageActive
                : styles.loginErrorMessageInactive
            }
          >
            아이디 혹은 비밀번호가 올바른지 확인해주세요
          </CookieRunBold>
          <View style={styles.modalButtonAlign}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.RegistButton,
                isButtonEnabled ? styles.buttonActive : styles.buttonInactive,
              ]}
            >
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <CookieRunBold style={styles.RegisText}>등록</CookieRunBold>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPlantRegist;
