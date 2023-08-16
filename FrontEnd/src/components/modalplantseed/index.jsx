import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import CustomDropdown from "../dropdown";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";
import plantImages from "../../assets/img/plantImages";

const ModalPlantSeed = ({ isVisible, onClose, onSeedPlant }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedNickname, setSelectedNickname] = useState(null);
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    if (resolvedImage == null) {
      return require("../../assets/img/silhouette.png");
    }

    return resolvedImage;
  };

  useEffect(() => {
    if (isVisible) {
      setSelectedOption(null); // Reset selectedOption to null when the modal is opened
      setSelectedSubcategory(null);
      setSelectedNickname(null);
    }
  }, [isVisible]);

  const handleSeedPlant = () => {
    // Call the onSeedPlant function and pass the selected option as a parameter
    onSeedPlant(
      selectedOption?.plantId,
      selectedOption?.plantName,
      selectedNickname
    );
    onClose();
  };

  // Create an array of options for the custom dropdown
  const categories = [
    {
      name: "채소",
      subcategories: [
        {
          plantId: 1,
          plantName: "상추",
        },
        {
          plantId: 12,
          plantName: "커밍순",
        },
        {
          plantId: 12,
          plantName: "커밍순",
        },
      ],
    },
    {
      name: "꽃",
      subcategories: [
        {
          plantId: 2,
          plantName: "장미",
        },
        {
          plantId: 13,
          plantName: "커밍순",
        },
        {
          plantId: 14,
          plantName: "커밍순",
        },
      ],
    },
    {
      name: "선인장",
      subcategories: [
        {
          plantId: 3,
          plantName: "백도선",
        },
        {
          plantId: 16,
          plantName: "커밍순",
        },
        {
          plantId: 20,
          plantName: "커밍순",
        },
      ],
    },
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
            source={getPlantImageSource(selectedPlantId, 1)}
            resizeMode="contain"
            style={styles.characterSize}
          />
        </View>
        {/* Replace TextInput with CustomDropdown */}
        <View style={styles.modalButtonAlign}>
          {!selectedSubcategory ? (
            <CustomDropdown
              options={categories}
              onSelect={(plantId, plantName) => {
                setSelectedOption({ plantId, plantName });
                setSelectedPlantId(plantId);
              }}
            />
          ) : (
            <TextInput
              style={{
                width: 200,
                borderWidth: 2,
                borderColor: "#896A50", // Set the border color here
                borderRadius: 8,
                paddingVertical: 5,
                paddingHorizontal: 20,
                marginRight: 10,
                color: "#4C0C0C",
                textAlign: "center",
              }}
              onChangeText={(text) => setSelectedNickname(text)}
              placeholder="애칭을 입력해주세요"
              maxLength={5}
            />
          )}
          {!selectedSubcategory ? (
            <TouchableOpacity
              style={[
                styles.SeedButton,
                !selectedOption ? styles.disabledSeedButton : null,
              ]}
              onPress={() => {
                if (selectedOption) {
                  setSelectedSubcategory(selectedOption);
                }
              }}
              disabled={!selectedOption} // Disable the button if no option is selected
            >
              <CookieRunBold style={styles.plantText}>선택</CookieRunBold>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.SeedButton,
                !selectedNickname ? styles.disabledSeedButton : null,
              ]}
              onPress={() => {
                if (selectedSubcategory) {
                  setSelectedSubcategory(selectedOption);
                  handleSeedPlant();
                }
              }}
              disabled={!selectedNickname} // Disable the button if no option is selected
            >
              <CookieRunBold style={styles.plantText}>생성</CookieRunBold>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPlantSeed;
