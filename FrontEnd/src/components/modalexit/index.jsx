import React from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import styles from "./style";

const ModalExit = ({ isVisible, onClose }) => {
  // Handle back button press when the modal is open
  const handleBackButton = () => {
    // Close the modal and prevent the default back functionality
    onClose();
    return true;
  };

  // Add event listener to handle back button press
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  // Function to handle deletion and app exit
  const handleDeleteAndExit = () => {
    // Close the modal
    BackHandler.exitApp(); // 앱 종료
    // Perform the deletion logic here (onDelete(potID))

    // Exit the app
    BackHandler.exitApp();
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
        <CookieRunBold style={styles.modalText}>앱 종료</CookieRunBold>
        <CookieRunRegular style={styles.modalTextContent}>
          정말 앱을 종료하시겠습니까?
        </CookieRunRegular>
        <CookieRunRegular style={styles.modalTextContent}>
          종료하시기전에 확인하세요!
        </CookieRunRegular>
        <View style={styles.modalButtonAlign}>
          {/* Delete and exit */}
          <TouchableOpacity onPress={handleDeleteAndExit}>
            <CookieRunBold style={styles.closeButton}>확인</CookieRunBold>
          </TouchableOpacity>
          {/* Close the modal */}
          <TouchableOpacity onPress={onClose}>
            <CookieRunBold style={styles.cancelButton}>취소</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalExit;
