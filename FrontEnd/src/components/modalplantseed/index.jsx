import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import CustomDropdown from "../dropdown";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalPlantSeed = ({ isVisible, onClose, onSeedPlant }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSeedPlant = () => {
    // Call the onSeedPlant function and pass the selected option as a parameter
    onSeedPlant(selectedOption);
    onClose();
  };

  // Create an array of options for the custom dropdown
  const categories = [
    {
      name: "야채",
      subcategories: ["토마토", "배추", "당근"],
    },
    {
      name: "선인장",
      subcategories: ["꽃 선인장", "가시 선인장", "종류 몰라", "안이"],
    },
    {
      name: "꽃",
      subcategories: ["장미", "철쭉", "붓꽃"],
    },
    // Add more categories as needed
  ];

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
        {/* Your existing modal content */}
        <CookieRunBold style={styles.modalText}>씨앗 심기</CookieRunBold>
        <View style={styles.characterSection}>
          <Image
            source={require("../../assets/img/lettuce_3.gif")}
            resizeMode="contain"
            style={styles.characterSize}
          />
        </View>
        {/* Replace TextInput with CustomDropdown */}
        <View style={styles.modalButtonAlign}>
          <CustomDropdown options={categories} onSelect={setSelectedOption} />
          <TouchableOpacity
            style={[styles.SeedButton]}
            onPress={handleSeedPlant}
          >
            <CookieRunBold style={styles.plantText}>선택</CookieRunBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantSeed;
