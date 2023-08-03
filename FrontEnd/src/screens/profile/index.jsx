import React, { useState, useRef } from "react";
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

  const profileData = {
    message: "ok",
    data: {
      information: {
        nickname: "security...",
        myPlantCount: 1,
        gardenCount: 4,
        collectionCount: 7,
        badges: [
          {
            badgeId: 1,
            badgeName: "드루이드",
            condition: "식물 10번 등록 시 획득",
            description: "식물을 키우는데 도가 튼 사람",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: true,
            createdDate: "2023-08-01T07:40:16",
          },
          {
            badgeId: 2,
            badgeName: "시작이 반",
            condition: "화분 첫 등록 시 획득",
            description: "쑥쑥을 이용해주셔서 감사합니다!",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: true,
            createdDate: "2023-08-01T07:40:19",
          },
          {
            badgeId: 3,
            badgeName: "이스터 에그2",
            condition: "안알려줘야지",
            description: "이스터에그222!",
            badgeImage: "사진 파일명",
            isHidden: true,
            isDone: true,
            createdDate: "2023-08-01T07:40:18",
          },
          {
            badgeId: 4,
            badgeName: "진짜 반",
            condition: "식물 5번 등록 시 획득",
            description: "쑥쑥을 꾸준히 이용해주셔서 감사합니다!",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
          {
            badgeId: 5,
            badgeName: "업적 1",
            condition: "업적 조건 설명 1",
            description: "업적 획득 후 표시할 설명 1",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
          {
            badgeId: 6,
            badgeName: "업적 수정",
            condition: "잠이 오네",
            description: "잠이 막 쏟아진다",
            badgeImage: "사진 파일명",
            isHidden: true,
            isDone: true,
            createdDate: "2023-08-01T07:40:21",
          },
          {
            badgeId: 7,
            badgeName: "업적 3",
            condition: "업적 조건 설명 3",
            description: "업적 획득 후 표시할 설명 3",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: true,
            createdDate: "2023-08-01T07:40:22",
          },
          {
            badgeId: 8,
            badgeName: "업적 4",
            condition: "업적 조건 설명 4",
            description: "업적 획득 후 표시할 설명 4",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
          {
            badgeId: 9,
            badgeName: "업적 5",
            condition: "업적 조건 설명 5",
            description: "업적 획득 후 표시할 설명 5",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
          {
            badgeId: 10,
            badgeName: "업적 6",
            condition: "업적 조건 설명 6",
            description: "업적 획득 후 표시할 설명 6",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
          {
            badgeId: 11,
            badgeName: "업적 7",
            condition: "업적 조건 설명 7",
            description: "업적 획득 후 표시할 설명 7",
            badgeImage: "업적 사진 파일명",
            isHidden: false,
            isDone: false,
            createdDate: null,
          },
        ],
      },
    },
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const handleEdit = () => {
    // 삭제 관련 로직
    console.log("닉네임 수정 관련 로직 넣어야 함");
    setEditModalVisible(false);
  };

  const bs = useRef(null);
  const window = Dimensions.get("window");

  const renderInner = () => (
    <View style={styles.panel}>
      <Image
        source={require("../../assets/img/Badge.png")}
        style={styles.badge}
      />
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

  const badges = profileData.data.information.badges; // Use all the badge data from the response
  const rows = divideIntoRowsAndColumns(badges, 3, 3);

  const handleBadgeClick = (badge) => {
    setClickedBadge(badge);
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
                  {profileData.data.information.nickname}
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
                  {profileData.data.information.myPlantCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  정원
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {profileData.data.information.gardenCount}
                </CookieRunBold>
              </View>
              <View style={styles.barContent}>
                <CookieRunBold style={styles.Collection_text}>
                  도감
                </CookieRunBold>
                <CookieRunBold style={styles.Collection_num}>
                  {profileData.data.information.collectionCount}
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
              {row.map((badge, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  onPress={() => handleBadgeClick(badge)}
                >
                  <Image
                    source={require("../../assets/img/Badge.png")} // Replace this with the badge image source from the `badge` object
                    style={styles.badge}
                  />
                </TouchableOpacity>
              ))}
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
