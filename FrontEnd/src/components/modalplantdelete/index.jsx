import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
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
        <Text style={styles.openButton}>모달창</Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.7}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
      >
        <View style={styles.modalContainer}>
          {/* 모달 내용 */}
          <Text style={styles.modalText}>식물 삭제</Text>
          <Text>
            화분을 삭제하시면 모든 데이터가 사라지며 복구가 불가합니다.
          </Text>
          <View style={styles.modalButtonAlign}>
            <TouchableOpacity onPress={toggleModal}>
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <Text style={styles.closeButton}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              {/* 모달 내용 외의 영역을 클릭하면 모달이 닫히도록 설정 */}
              <Text style={styles.closeButton}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPlantDelete;
