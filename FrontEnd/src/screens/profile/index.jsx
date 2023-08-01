import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomSheet from "reanimated-bottom-sheet";
import ModalPlantRegist from "../../components/modalplantregist";
import CookieRunBold from "../../components/common/CookieRunBold";
import styles from "./style";

const ProfileScreen = ({ navigation }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);

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
      <CookieRunBold style={styles.panelTitle}>정원관리사</CookieRunBold>
      <CookieRunBold style={styles.panelSubtitle}>달성조건</CookieRunBold>
      <CookieRunBold style={styles.panelSubtitle}>
        정원의 한페이지를 모두 채우시오
      </CookieRunBold>
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

  return (
    <ImageBackground
      source={require("../../assets/img/ProfileBackground.png")}
      style={styles.container}
    >
      <View style={styles.userInfoSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEditModal}>
            <Icon name="edit" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
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
              손수형
            </Title>
            <Caption style={styles.caption}>쑥쑥이</Caption>
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
              <CookieRunBold style={styles.Collection_num}>3</CookieRunBold>
            </View>
            <View style={styles.barContent}>
              <CookieRunBold style={styles.Collection_text}>정원</CookieRunBold>
              <CookieRunBold style={styles.Collection_num}>2</CookieRunBold>
            </View>
            <View style={styles.barContent}>
              <CookieRunBold style={styles.Collection_text}>도감</CookieRunBold>
              <CookieRunBold style={styles.Collection_num}>5</CookieRunBold>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginHorizontal: 30,
        }}
      />

      <View style={styles.userInfoSection}>
        <CookieRunBold style={styles.myPageTitle}>업적</CookieRunBold>
        <View style={styles.badgeContent}>
          <TouchableOpacity onPress={onOpen}>
            <Image
              source={require("../../assets/img/Badge.png")}
              style={styles.badge}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
        </View>
        <View style={styles.badgeContent}>
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
        </View>
        <View style={styles.badgeContent}>
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
          <Image
            source={require("../../assets/img/Badge.png")}
            style={styles.badge}
          />
        </View>
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
    </ImageBackground>
  );
};

export default ProfileScreen;
