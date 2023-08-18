import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import CookieRunBold from "../common/CookieRunBold";
import CookieRunRegular from "../common/CookieRunRegular";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import customAxios from "../../utils/axios";
import plantImages from "../../assets/img/plantImages";

const ModalPlantInfo = ({ isVisible, onClose, selectedGardenID }) => {
  const [isFirstEditing, setIsFirstEditing] = useState(false);
  const [isSecondEditing, setIsSecondEditing] = useState(false);
  const [isThirdEditing, setIsThirdEditing] = useState(false);
  const [isPlantInfoData, setPlantInfoData] = useState([]);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isSelectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setIsImageModalVisible(true);
  };

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    return resolvedImage;
  };

  const getInfoData = () => {
    // console.log(selectedGardenID);

    customAxios
      .get(`/plant/${selectedGardenID}`)
      .then((res) => {
        // console.log("성공 ->" + JSON.stringify(res.data.data));
        setPlantInfoData(res.data.data);
      })
      .catch(() => {
        console.log("기록 불러오기 오류");
      });
  };

  useEffect(() => {
    if (isVisible) {
      getInfoData();
      setIsFirstEditing(false);
      setIsSecondEditing(false);
      setIsThirdEditing(false);
    }
  }, [isVisible]);

  const toggleFirstEditing = () => {
    if (isFirstEditing) {
      updateRecord(1, isPlantInfoData.firstRecord);
    }

    setIsFirstEditing(!isFirstEditing);
  };

  const toggleSecondEditing = () => {
    if (isSecondEditing) {
      updateRecord(2, isPlantInfoData.secondRecord);
    }

    setIsSecondEditing(!isSecondEditing);
  };

  const toggleThirdEditing = () => {
    if (isThirdEditing) {
      updateRecord(3, isPlantInfoData.thirdRecord);
    }
    setIsThirdEditing(!isThirdEditing);
  };

  const updateRecord = (level, record) => {
    customAxios
      .put("/plant/record", {
        gardenId: isPlantInfoData.gardenId,
        level: level,
        record: record,
      })
      .then(() => {
        console.log("등록성공");
        getInfoData();
      })
      .catch(() => {
        console.log("기록 등록실패");
      });
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
        <CookieRunBold style={styles.modalText}>
          {isPlantInfoData.plantNickname} 기록
        </CookieRunBold>
        {/* 첫번 째 단계 기록 */}
        <View
          style={{ flexDirection: "row", width: "100%", marginVertical: 10 }}
        >
          {1 <= isPlantInfoData.level ? (
            <TouchableOpacity
              onPress={() => handleImageClick(isPlantInfoData.firstImage)}
            >
              <Image
                source={getPlantImageSource(isPlantInfoData.plantId, 1)}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: "#896A50", // Set the border color here
                  borderRadius: 20,
                  backgroundColor: "rgba(137, 106, 80, 0.2)",
                }}
              />
              <View style={styles.notificationCircle}>
                <Icon name="image-search" size={20} color="#4C0C0C" />
              </View>
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../assets/img/silhouette.png")}
              resizeMode="contain"
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#896A50", // Set the border color here
                borderRadius: 20,
                backgroundColor: "rgba(137, 106, 80, 0.2)",
              }}
            />
          )}

          <View style={{ width: "65%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CookieRunBold style={{ marginBottom: 5, color: "#4C0C0C" }}>
                {isPlantInfoData.firstDate}
              </CookieRunBold>
              <TouchableOpacity onPress={toggleFirstEditing}>
                {1 <= isPlantInfoData.level ? (
                  isFirstEditing ? (
                    <Icon name="check-circle" size={20} color="#4C0C0C" />
                  ) : (
                    <Icon name="edit" size={20} color="#4C0C0C" />
                  )
                ) : null}
              </TouchableOpacity>
            </View>
            {isFirstEditing ? (
              <TextInput
                style={{
                  width: "100%",
                  borderWidth: 2,
                  borderColor: "#896A50", // 테두리 색상 설정
                  borderRadius: 8,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  color: "#4C0C0C",
                  textAlignVertical: "top", // 텍스트 입력이 상단부터 시작하도록 설정
                  fontSize: 12,
                }}
                value={isPlantInfoData.firstRecord}
                onChangeText={(text) =>
                  setPlantInfoData({ ...isPlantInfoData, firstRecord: text })
                }
                placeholder="내용을 입력해주세요 ( 최대 40단어 )"
                multiline={true} // 다중 라인 입력 가능하도록 설정
                numberOfLines={3} // 최대 3줄 까지 표시 (원하는 값으로 변경 가능)
                maxLength={40}
              />
            ) : (
              <CookieRunRegular style={{ color: "#4C0C0C" }}>
                {isPlantInfoData.firstRecord}
              </CookieRunRegular>
            )}
          </View>
        </View>
        {/* 두번 째 단계 기록 */}
        <View
          style={{ flexDirection: "row", width: "100%", marginVertical: 10 }}
        >
          {2 <= isPlantInfoData.level ? (
            <TouchableOpacity
              onPress={() => handleImageClick(isPlantInfoData.secondImage)}
            >
              <Image
                source={getPlantImageSource(isPlantInfoData.plantId, 2)}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: "#896A50", // Set the border color here
                  borderRadius: 20,
                  backgroundColor: "rgba(137, 106, 80, 0.2)",
                }}
              />
              <View style={styles.notificationCircle}>
                <Icon name="image-search" size={20} color="#4C0C0C" />
              </View>
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../assets/img/silhouette.png")}
              resizeMode="contain"
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#896A50", // Set the border color here
                borderRadius: 20,
                backgroundColor: "rgba(137, 106, 80, 0.2)",
              }}
            />
          )}
          <View style={{ width: "65%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CookieRunBold style={{ marginBottom: 5, color: "#4C0C0C" }}>
                {isPlantInfoData.secondDate}
              </CookieRunBold>
              <TouchableOpacity onPress={toggleSecondEditing}>
                {2 <= isPlantInfoData.level ? (
                  isSecondEditing ? (
                    <Icon name="check-circle" size={20} color="#4C0C0C" />
                  ) : (
                    <Icon name="edit" size={20} color="#4C0C0C" />
                  )
                ) : null}
              </TouchableOpacity>
            </View>
            {isSecondEditing ? (
              <TextInput
                style={{
                  width: "100%",
                  borderWidth: 2,
                  borderColor: "#896A50", // 테두리 색상 설정
                  borderRadius: 8,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  color: "#4C0C0C",
                  textAlignVertical: "top", // 텍스트 입력이 상단부터 시작하도록 설정
                  fontSize: 12,
                }}
                value={isPlantInfoData.secondRecord}
                onChangeText={(text) =>
                  setPlantInfoData({ ...isPlantInfoData, secondRecord: text })
                }
                placeholder="내용을 입력해주세요 ( 최대 40단어 )"
                multiline={true} // 다중 라인 입력 가능하도록 설정
                numberOfLines={3} // 최대 3줄 까지 표시 (원하는 값으로 변경 가능)
                maxLength={40}
              />
            ) : (
              <CookieRunRegular style={{ color: "#4C0C0C" }}>
                {isPlantInfoData.secondRecord}
              </CookieRunRegular>
            )}
          </View>
        </View>
        {/* 세번 째 단계 기록 */}
        <View
          style={{ flexDirection: "row", width: "100%", marginVertical: 10 }}
        >
          {3 <= isPlantInfoData.level ? (
            <TouchableOpacity
              onPress={() => handleImageClick(isPlantInfoData.thirdImage)}
            >
              <Image
                source={getPlantImageSource(isPlantInfoData.plantId, 3)}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: "#896A50", // Set the border color here
                  borderRadius: 20,
                  backgroundColor: "rgba(137, 106, 80, 0.2)",
                }}
              />
              <View style={styles.notificationCircle}>
                <Icon name="image-search" size={20} color="#4C0C0C" />
              </View>
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../assets/img/silhouette.png")}
              resizeMode="contain"
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#896A50", // Set the border color here
                borderRadius: 20,
                backgroundColor: "rgba(137, 106, 80, 0.2)",
              }}
            />
          )}
          <View style={{ width: "65%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CookieRunBold style={{ marginBottom: 5, color: "#4C0C0C" }}>
                {isPlantInfoData.thirdDate}
              </CookieRunBold>
              <TouchableOpacity onPress={toggleThirdEditing}>
                {3 <= isPlantInfoData.level ? (
                  isThirdEditing ? (
                    <Icon name="check-circle" size={20} color="#4C0C0C" />
                  ) : (
                    <Icon name="edit" size={20} color="#4C0C0C" />
                  )
                ) : null}
              </TouchableOpacity>
            </View>
            {isThirdEditing ? (
              <TextInput
                style={{
                  width: "100%",
                  borderWidth: 2,
                  borderColor: "#896A50", // 테두리 색상 설정
                  borderRadius: 8,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  color: "#4C0C0C",
                  textAlignVertical: "top", // 텍스트 입력이 상단부터 시작하도록 설정
                  fontSize: 12,
                }}
                value={isPlantInfoData.thirdRecord}
                onChangeText={(text) =>
                  setPlantInfoData({ ...isPlantInfoData, thirdRecord: text })
                }
                placeholder="내용을 입력해주세요 ( 최대 40단어 )"
                multiline={true} // 다중 라인 입력 가능하도록 설정
                numberOfLines={3} // 최대 3줄 까지 표시 (원하는 값으로 변경 가능)
                maxLength={40}
              />
            ) : (
              <CookieRunRegular style={{ color: "#4C0C0C" }}>
                {isPlantInfoData.thirdRecord}
              </CookieRunRegular>
            )}
          </View>
        </View>
      </View>
      <Modal
        isVisible={isImageModalVisible}
        onBackdropPress={() => setIsImageModalVisible(false)}
        backdropOpacity={0.7}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={300}
      >
        {/* For example: */}
        <Image
          source={{
            uri: isSelectedImage,
          }}
          resizeMode="contain"
          style={{ width: "100%", height: 300 }}
        />
      </Modal>
    </Modal>
  );
};

export default ModalPlantInfo;
