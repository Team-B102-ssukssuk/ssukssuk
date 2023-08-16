import { useState, useEffect } from "react";
import { ImageBackground, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Icon2 from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import ModalPlantDelete from "../../components/modalplantdelete";
import ModalPlantRegist from "../../components/modalplantregist";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import customAxios, { setTokenExpiredCallback } from "../../utils/axios";
import { connect } from "react-redux";
import { storePotID, setGardenID } from "../../redux/action";
import QRCodeScanner from "../../components/qrCode";
import ToastNotification from "../../components/toast";
import Icon from "react-native-vector-icons/AntDesign";
import LoadingScreen from "../loading";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import plantImages from "../../assets/img/plantImages";
import ModalMap from "../../components/modalmap";
import { BarCodeScanner } from "expo-barcode-scanner";
import ModalPlantPicking from "../../components/plantpicking";

const PotScreen = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isPickingModalVisible, setPickingModalVisible] = useState(false);
  const [isRegistModalVisible, setRegistModalVisible] = useState(false);
  const [isDeleteIconVisible, setDeleteIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isQRcodeVisible, setQRcodeVisible] = useState(false);
  const [isRegistMessage, setRegistMessage] = useState(null);
  const [isPotId, setPotID] = useState(0);
  const [isGardenId, setGardenId] = useState(0);
  const [isPotData, setPotData] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastContent, setToastContent] = useState("");
  const [toastIconName, setToastIconName] = useState("");
  const [isTrashcanVisible, setTrashcanVisible] = useState("true");
  const [isOpenMapModalVisible, setIsOpenMapModalVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false); // Default to false

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    return resolvedImage;
  };

  useEffect(() => {
    setTokenExpiredCallback(() => {
      console.log("토큰 만료 혹은 충돌");
      navigation.navigate("Intro");
    });
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("푸시 알림을 위한 토큰을 얻을 수 없습니다!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    customAxios
      .post("/notification", {
        fcm_token: token,
      })
      .then(() => {
        console.log("토큰 보내기 성공");
      })
      .catch(() => {
        console.log("토큰 보내기 오류");
      });
  };

  const getPotData = () => {
    customAxios
      .get("/pot")
      .then((res) => {
        if (res.data.length !== 0) {
          props.storePotID(res.data[0].potId);
          props.setGardenID(res.data[0].gardenId);
        }

        setPotData(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch(() => {
        console.log("화분 데이터 불러오기 오류");
      });
  };

  useEffect(() => {
    if (isFocused) {
      getPotData(); // Fetch data only when the screen is focused
      setDeleteIconVisible(false);
      registerForPushNotificationsAsync();
    }
  }, [isFocused]); // The effect depends on the isFocused value

  const handleScannedData = (data) => {
    console.log(data);

    customAxios
      .post("/pot", {
        serialNumber: data,
      })
      .then(() => {
        console.log("등록 성공");
        // Show the success toast notification
        showToast(
          "등록",
          "성공적으로 화분이 등록되었습니다.",
          "checkmark-circle-sharp"
        );
        // Update the pot data
        getPotData();
      })
      .catch((err) => {
        console.log(err);
      });
    toggleQRCodeScanner();
  };

  const showToast = (title, content, iconName) => {
    setIsToastVisible(true);
    setToastTitle(title);
    setToastContent(content);
    setToastIconName(iconName);

    // Start the timer to hide the toast after a few seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2000); // Set the duration for the toast to stay visible (2 seconds in this case)
  };

  const toggleQRCodeScanner = () => {
    if (cameraPermission === true) {
      showTrashcan();
      setQRcodeVisible(!isQRcodeVisible);
    } else {
      setRegistModalVisible(true);
      setTrashcanVisible(true);
    }
  };

  const showTrashcan = () => {
    setTrashcanVisible(!isTrashcanVisible);
  };

  const toggleInputModal = () => {
    setQRcodeVisible(!isQRcodeVisible);
    setRegistMessage(null);
    setRegistModalVisible(!isRegistModalVisible);
  };

  const toggleDeleteModal = (potId) => {
    setPotID(potId);
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const togglePickingModal = (gardenId) => {
    setGardenId(gardenId);
    setPickingModalVisible(!isPickingModalVisible);
  };

  const visibleIcon = () => {
    setDeleteIconVisible(!isDeleteIconVisible);
  };

  const GoMain = (potId, gardenId) => {
    // Store the potID in Redux using the action
    props.storePotID(potId);
    props.setGardenID(gardenId);
    // navigation.push("Slider");
    navigation.push("Main");
  };

  const renderPotsOnShelve = (startIndex, endIndex) => {
    const pots = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < isPotData.length) {
        const plant = isPotData[i];
        const potId = plant.potId;
        pots.push(
          <View
            key={`pot_${plant.potId}_${plant.gardenId}`}
            style={styles[`absoultPosition${i + 1}`]}
          >
            {plant.isUse ? (
              <>
                {isDeleteIconVisible ? (
                  <Animatable.View
                    animation="pulse"
                    duration={700}
                    iterationCount="infinite"
                  >
                    <TouchableOpacity
                      style={styles.potSign}
                      onPress={() => togglePickingModal(plant.gardenId)}
                    >
                      <View style={styles.potName}>
                        <CookieRunBold style={styles.potText}>
                          {plant.nickname}
                        </CookieRunBold>
                      </View>
                      <View style={styles.potDelete}>
                        <View>
                          <Icon2 name="close" style={styles.deleteIcon} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                ) : (
                  <View style={styles.potSign}>
                    <View style={styles.potName}>
                      <CookieRunBold style={styles.potText}>
                        {plant.nickname}
                      </CookieRunBold>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <>
                {isDeleteIconVisible ? (
                  <Animatable.View
                    animation="pulse"
                    duration={700}
                    iterationCount="infinite"
                  >
                    <TouchableOpacity
                      style={styles.potSign}
                      onPress={() =>
                        toggleDeleteModal(plant.potId, plant.gardenId)
                      }
                    >
                      <View style={styles.potEmptyDelete}>
                        <View>
                          <Icon2 name="close" style={styles.emptyDeleteIcon} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                ) : null}
              </>
            )}
            {plant.isUse ? (
              <TouchableOpacity
                style={styles.gardenCharacter}
                onPress={() => GoMain(potId, plant.gardenId)}
              >
                <Image
                  source={getPlantImageSource(plant.plantId, plant.level)}
                  resizeMode="contain"
                  style={styles.potResize}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.gardenCharacter}
                onPress={() => GoMain(potId, plant.gardenId)}
              >
                <Image
                  source={require("../../assets/img/pot.png")}
                  resizeMode="contain"
                  style={styles.potResize}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      } else if (i === isPotData.length) {
        // If there are no more pots, display an empty transparent pot
        const transparentPotStyle = {
          ...styles[`absoultPosition${i + 1}`],
          opacity: 0.5, // Set opacity to make it transparent
        };
        pots.push(
          <>
            {!isDeleteIconVisible ? (
              <View key={`empty_pot_${endIndex}`} style={transparentPotStyle}>
                <TouchableOpacity
                  style={styles.gardenCharacter}
                  onPress={toggleQRCodeScanner}
                >
                  <Image
                    source={require("../../assets/img/pot.png")}
                    resizeMode="contain"
                    style={styles.potResize}
                  />
                  <Icon
                    name="pluscircle"
                    size={28}
                    color="#000"
                    style={{ position: "absolute" }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        );
      }
    }

    return pots;
  };

  const handleDelete = (potID) => {
    // Log the potID before deleting
    const data = {
      potId: potID,
    };
    customAxios
      .put("/pot", data)
      .then(() => {
        getPotData();
        visibleIcon();
      })
      .catch((err) => {
        console.log("화분 삭제 관련 오류" + err);
      });
    setDeleteModalVisible(false);
  };

  const handlePicking = (gardenId) => {
    // Log the potID before deleting
    const data = {
      gardenId: gardenId,
    };
    customAxios
      .put("/plant/kill", data)
      .then(() => {
        getPotData();
        visibleIcon();
      })
      .catch((err) => {
        console.log("식물 뽑기 관련 오류" + err);
      });
    setDeleteModalVisible(false);
  };

  const handleRegist = (inputValue) => {
    const serialNumber = {
      serialNumber: inputValue,
    };

    // 등록 관련 로직
    console.log("Plant registered with ID: " + inputValue);
    customAxios
      .post("/pot", serialNumber)
      .then(() => {
        console.log("등록 성공");
        setRegistModalVisible(false);
        showToast(
          "등록",
          "성공적으로 화분이 등록되었습니다.",
          "checkmark-circle-sharp"
        );
        setRegistMessage(null);
        getPotData();
        setTrashcanVisible(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setRegistMessage("이미 등록된 화분입니다...");
        } else if (err.response.status === 400) {
          setRegistMessage("올바른 ID가 아니예요 다시 입력해주세요!");
        }
      });
  };

  if (isLoading) {
    // Render the loading screen here
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/ProfileBackground.png")}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.potWood}>
            <View style={styles.potWoodGroup}>
              <Image source={require("../../assets/img/potTag.png")} />
              <CookieRunBold style={styles.PotWoodText}>내 화분</CookieRunBold>
            </View>
          </View>

          <View style={styles.alignCenterContainer}>
            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(0, 3)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>

            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(3, 6)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>
            <View style={styles.reContainer}>
              <View style={styles.gardenContainer}>
                {renderPotsOnShelve(6, 9)}
                <View style={styles.shelve}>
                  <Image source={require("../../assets/img/shelve.png")} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {isTrashcanVisible && (
          <View style={styles.trashCanMargin}>
            <TouchableOpacity onPress={() => setIsOpenMapModalVisible(true)}>
              <Image
                source={require("../../assets/img/map.png")}
                style={[styles.mapSize]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={visibleIcon}>
              <Image
                source={require("../../assets/img/trashCan.png")}
                style={[
                  styles.trashCan,
                  !isDeleteIconVisible ? styles.trashCanClicked : null,
                ]}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      <ModalPlantDelete
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
        potID={isPotId}
        typeName="화분"
      />
      <ModalPlantRegist
        isVisible={isRegistModalVisible}
        onClose={() => {
          setRegistModalVisible(false);
          setTrashcanVisible(true);
          setRegistMessage(null);
        }}
        onRegist={handleRegist}
        title="화분 등록"
        placeholder="화분 고유 ID를 입력해주세요"
        errormessage={isRegistMessage}
        maxInputLength={8}
      />
      {isQRcodeVisible && (
        <QRCodeScanner
          onScannedData={handleScannedData}
          onCloseQRCodeScanner={toggleQRCodeScanner}
          onOpenInputModal={toggleInputModal}
        />
      )}
      {isToastVisible && (
        <ToastNotification
          title={toastTitle}
          content={toastContent}
          iconName={toastIconName}
        />
      )}
      <ModalMap
        isVisible={isOpenMapModalVisible}
        onClose={() => setIsOpenMapModalVisible(false)}
        navigation={navigation}
      />
      <ModalPlantPicking
        isVisible={isPickingModalVisible}
        onClose={() => setPickingModalVisible(false)}
        onDelete={handlePicking}
        gardenId={isGardenId}
      ></ModalPlantPicking>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    potID: state.potID,
    gardenID: state.gardenID,
  };
};

export default connect(mapStateToProps, { storePotID, setGardenID })(PotScreen);
