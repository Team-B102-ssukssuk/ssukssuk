import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import ModalInfo from "../modalInfo";
import styles from "./style";

const ModalDictionary = ({ isVisible, onClose }) => {
  const [isContentModalVisible, setContentModalVisible] = useState(false);

  const toggleContentModal = () => {
    setContentModalVisible(!isContentModalVisible);
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
        <CookieRunBold style={styles.modalText}>도감</CookieRunBold>
        <View>
          <View style={styles.content}>
            <CookieRunBold style={styles.dictionaryText}>상추</CookieRunBold>
            <View style={styles.dictionaryContainer}>
              <TouchableOpacity onPress={toggleContentModal}>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.content}>
            <CookieRunBold style={styles.dictionaryText}>비밀</CookieRunBold>
            <View style={styles.dictionaryContainer}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.content}>
            <CookieRunBold style={styles.dictionaryText}>비밀</CookieRunBold>
            <View style={styles.dictionaryContainer}>
              <TouchableOpacity onPress={toggleContentModal}>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/img/silhouette.png")}
                  resizeMode="contain"
                  style={styles.emptyImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ModalInfo
        isVisible={isContentModalVisible}
        onClose={() => setContentModalVisible(false)}
      ></ModalInfo>
    </Modal>
  );
};

export default ModalDictionary;
