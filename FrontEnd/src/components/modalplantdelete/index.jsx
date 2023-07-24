import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalPlantDelete = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
          <CookieRunBold style={styles.modalText}>식물 삭제</CookieRunBold>
          <CookieRunRegular style={styles.modalTextContent}>
            화분을 삭제하시면 모든 데이터가
          </CookieRunRegular>
          <CookieRunRegular style={styles.modalTextContent}>
            사라지며 복구가 불가합니다.
          </CookieRunRegular>
          <View style={styles.modalButtonAlign}>
            <TouchableOpacity onPress={toggleModal}>
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <CookieRunBold style={styles.closeButton}>삭제</CookieRunBold>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <CookieRunBold style={styles.cancelButton}>닫기</CookieRunBold>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPlantDelete;
