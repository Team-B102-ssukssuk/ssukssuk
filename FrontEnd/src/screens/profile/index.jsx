import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomSheet from "reanimated-bottom-sheet";
import ModalPlantRegist from "../../components/modalplantregist";
import CookieRunBold from "../../components/common/CookieRunBold";
import { ScrollView } from "react-native-gesture-handler";
import customAxios from "../../utils/axios";
import styles from "./style";
import CookieRunRegular from "../../components/common/CookieRunRegular";
import LoadingScreen from "../loading";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBadge, setClickedBadge] = useState({
    badgeId: 0,
    badgeName: "",
    condition: "",
    description: "",
    badgeImage: "",
    isHidden: false,
    isDone: false,
    createdDate: "",
  });
  const [isUserData, setUserData] = useState({
    badges: [],
  });
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = () => {
    customAxios.get("/user/info").then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission denied to access media library");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Prepare form data
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: "image/png",
          name: "image.png",
        });

        // Upload image to server
        const response = await customAxios.put(
          "/user/image", // Replace with your backend URL
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image upload response:", response);

        // Refresh user data
        getUserData();
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const badgeImages = {
    ActiveBadge1: require("../../assets/img/ActiveBadge1.png"),
    ActiveBadge2: require("../../assets/img/ActiveBadge2.png"),
    ActiveBadge3: require("../../assets/img/ActiveBadge3.png"),
    ActiveBadge4: require("../../assets/img/ActiveBadge4.png"),
    ActiveBadge5: require("../../assets/img/ActiveBadge5.png"),
    ActiveBadge6: require("../../assets/img/ActiveBadge6.png"),
    ActiveBadge7: require("../../assets/img/ActiveBadge7.png"),
    ActiveBadge8: require("../../assets/img/ActiveBadge8.png"),
    ActiveBadge9: require("../../assets/img/ActiveBadge9.png"),
    Badge: require("../../assets/img/Badge.png"),
  };

  const handleEdit = (inputValue) => {
    customAxios
      .put("/user/nickname", {
        nickname: inputValue,
      })
      .then((res) => {
        console.log(res.data);
        getUserData();
      });
    console.log("닉네임 수정 관련 로직 넣어야 함");
    setEditModalVisible(false);
  };

  const bs = useRef(null);
  const window = Dimensions.get("window");

  const badgeImageName = `ActiveBadge${badgeIndex}`;

  const renderInner = () => (
    <View style={styles.panel}>
      {clickedBadge.isDone ? (
        <Image source={badgeImages[badgeImageName]} style={styles.badge} />
      ) : (
        <Image
          source={require("../../assets/img/Badge.png")}
          style={styles.badge}
        />
      )}
      <CookieRunBold style={styles.panelTitle}>
        {clickedBadge.badgeName}
      </CookieRunBold>
      {!clickedBadge.isDone && (
        <CookieRunBold style={styles.panelSubtitle}>달성조건</CookieRunBold>
      )}

      {clickedBadge.isDone ? (
        <CookieRunBold style={styles.panelSubtitle}>
          {clickedBadge.description}
        </CookieRunBold>
      ) : (
        <CookieRunBold style={styles.panelSubtitle}>
          {clickedBadge.condition}
        </CookieRunBold>
      )}
    </View>
  );

  const onClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    bs.current.snapTo(0);
    setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  const onOpen = () => {
    setIsOpen(true);
    bs.current.snapTo(2);
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: opacity,
        backgroundColor: "#000",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <TouchableOpacity
        style={{
          width: window.width,
          height: window.height,
          backgroundColor: "transparent",
        }}
        activeOpacity={1}
        onPress={onClose}
      />
    </Animated.View>
  );

  // Function to divide the badges into rows and columns
  const divideIntoRowsAndColumns = (arr, rows, cols) => {
    const divided = [];
    for (let i = 0; i < rows; i++) {
      const row = arr.slice(i * cols, (i + 1) * cols);
      divided.push(row);
    }
    return divided;
  };

  const badges = isUserData.badges; // Use all the badge data from the response
  const rows = divideIntoRowsAndColumns(badges, 3, 3);

  const handleBadgeClick = (badge, index) => {
    setClickedBadge(badge);
    setBadgeIndex(index);
    onOpen();
  };

  if (isLoading) {
    // Render the loading screen here
    return <LoadingScreen />;
  }

  return (
    <ImageBackground
      source={require("../../assets/img/ProfileBackground.png")}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleEditModal}>
              <Icon name="edit" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContent}>
            <CookieRunBold style={styles.myPageTitle}>프로필</CookieRunBold>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <TouchableOpacity onPress={handleImageUpload}>
                <Image
                  source={{
                    uri: `${isUserData.imageUrl}`,
                  }}
                  style={{ width: 70, height: 70, borderRadius: 100 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CookieRunRegular style={styles.title}>
                  {isUserData.nickname}
                </CookieRunRegular>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <ImageBackground
            source={require("../../assets/img/ProfileBar.png")}
            style={styles.Profile_bar}
            resizeMode="contain"
          >
            <View style={styles.ProfileBarContent}>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  내 식물
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {isUserData.myPlantCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  정원
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {isUserData.gardenCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  도감
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {isUserData.collectionCount}
                </CookieRunBold>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.lineSection} />

        <View style={styles.userInfoSection}>
          <View style={styles.rankText}>
            <CookieRunBold style={styles.myPageTitle}>업적</CookieRunBold>
          </View>
          {/* Map through the rows */}
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.badgeContent}>
              {/* Map through the badges in each row */}
              {row.map((badge) => {
                const badgeImageName = badge.isDone
                  ? `ActiveBadge${badge.badgeId}`
                  : "Badge";
                return (
                  <TouchableOpacity
                    key={badge.badgeId}
                    onPress={() => handleBadgeClick(badge, badge.badgeId)}
                  >
                    <Image
                      source={badgeImages[badgeImageName]}
                      style={styles.badge}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        <ModalPlantRegist
          isVisible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          onRegist={handleEdit}
          title="닉네임 수정"
          placeholder="변경하시려는 닉네임을 말씀해주세요"
        />
      </ScrollView>
      {isOpen && renderBackDrop()}
      <BottomSheet
        ref={bs}
        snapPoints={[
          "-10%",
          window.height * 0.3,
          window.height * 0.4,
          window.height * 0.5,
        ]}
        initialSnap={0}
        renderContent={renderInner}
        onCloseEnd={onClose}
      />
    </ImageBackground>
  );
};

export default ProfileScreen;
