import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "./style";

const ProfileScreen = () => {
  const [opacity] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);

  const bs = useRef(null);
  const window = Dimensions.get("window");

  const renderHeader = () => (
    <View style={styles.modal_header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderInner = () => (
    <View style={styles.panel}>
      <Image
        source={require("../../assets/img/Badge.png")}
        style={styles.badge}
      />
      <Text style={styles.panelTitle}>정원관리사</Text>
      <Text style={styles.panelSubtitle}>달성조건</Text>
      <Text style={styles.panelSubtitle}>정원의 한페이지를 모두 채우시오</Text>
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
          <Icon name="arrow-back-ios" size={28} color="#fff" />
          <Icon name="edit" size={28} color="#fff" />
        </View>
        <Text style={styles.myPageTitle}>마이페이지</Text>
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
              <Text style={styles.Collection_text}>내 식물</Text>
              <Text style={styles.Collection_num}>3</Text>
            </View>
            <View style={styles.barContent}>
              <Text style={styles.Collection_text}>정원</Text>
              <Text style={styles.Collection_num}>2</Text>
            </View>
            <View style={styles.barContent}>
              <Text style={styles.Collection_text}>도감</Text>
              <Text style={styles.Collection_num}>5</Text>
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
        <Text style={styles.myPageTitle}>업적</Text>
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
        renderHeader={renderHeader}
        renderContent={renderInner}
        onCloseEnd={onClose}
      />
    </ImageBackground>
  );
};

export default ProfileScreen;
