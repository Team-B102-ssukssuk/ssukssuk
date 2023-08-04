import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomSheet from "reanimated-bottom-sheet";
import ModalPlantRegist from "../../components/modalplantregist";
import CookieRunBold from "../../components/common/CookieRunBold";
import { ScrollView } from "react-native-gesture-handler";
import customAxios from "../../utils/axios";
import styles from "./style";

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
    information: {
      badges: [],
    },
  });
  const [badgeIndex, setBadgeIndex] = useState(0);

  const getUserData = () => {
    customAxios.get("/user/info").then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

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
      <CookieRunBold style={styles.panelSubtitle}>달성조건</CookieRunBold>
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

  const badges = isUserData.information.badges; // Use all the badge data from the response
  const rows = divideIntoRowsAndColumns(badges, 3, 3);

  const handleBadgeClick = (badge, index) => {
    setClickedBadge(badge);
    setBadgeIndex(index);
    onOpen();
  };

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
            <CookieRunBold style={styles.myPageTitle}>마이페이지</CookieRunBold>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {isUserData.information.nickname}
                </Title>
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
                  {isUserData.information.myPlantCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  정원
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {isUserData.information.gardenCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  도감
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {isUserData.information.collectionCount}
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
              {row.map((badge, colIndex) => {
                const badgeImageName = badge.isDone
                  ? `ActiveBadge${badge.badgeId}`
                  : "Badge";
                return (
                  <TouchableOpacity
                    key={colIndex}
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
        <ModalPlantRegist
          isVisible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          onRegist={handleEdit}
          title="닉네임 수정"
          placeholder="변경하시려는 닉네임을 말씀해주세요"
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
