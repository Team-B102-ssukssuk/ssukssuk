import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalPlantPicking = ({ isVisible, onClose, onDelete, gardenId }) => {
  const handleDeleteAndClose = () => {
    onDelete(gardenId); // Perform the deletion action
    onClose(); // Close the modal
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
        <CookieRunBold style={styles.modalText}>식물 뽑기</CookieRunBold>
        <CookieRunRegular style={styles.modalTextContent}>
          화분에 키우는 식물이 있습니다.
        </CookieRunRegular>
        <CookieRunRegular style={styles.modalTextContent}>
          화분에서 식물을 제거하시겠습니까?
        </CookieRunRegular>
        <View style={styles.modalButtonAlign}>
          {/* Call the handleDeleteAndClose function */}
          <TouchableOpacity onPress={handleDeleteAndClose}>
            <CookieRunBold style={styles.closeButton}>뽑기</CookieRunBold>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <CookieRunBold style={styles.cancelButton}>취소</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantPicking;
