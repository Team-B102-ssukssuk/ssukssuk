import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalPlantDelete = ({
  isVisible,
  onClose,
  onDelete,
  potID,
  typeName,
}) => {
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
        <CookieRunBold style={styles.modalText}>{typeName} 삭제</CookieRunBold>
        <CookieRunRegular style={styles.modalTextContent}>
          {typeName}을 삭제하시면 모든 데이터가
        </CookieRunRegular>
        <CookieRunRegular style={styles.modalTextContent}>
          사라지며 복구가 불가합니다.
        </CookieRunRegular>
        <View style={styles.modalButtonAlign}>
          {/* Pass the potID to the onDelete function */}
          <TouchableOpacity onPress={() => onDelete(potID)}>
            <CookieRunBold style={styles.closeButton}>삭제</CookieRunBold>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <CookieRunBold style={styles.cancelButton}>닫기</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantDelete;
