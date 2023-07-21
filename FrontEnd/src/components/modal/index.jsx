import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

const ModalPage = () => {
  const [opacity] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);

  const bs = useRef(null);
  const window = Dimensions.get("window");

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderInner = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>업적</Text>
      <Text style={styles.panelSubtitle}>식물을 키우자</Text>
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
    <View style={styles.container}>
      <TouchableOpacity onPress={onOpen}>
        <View style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>올리기</Text>
        </View>
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wow: {
    backgroundColor: "red",
    margin: 50,
    padding: 10,
    width: 100,
  },
  search: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#f7f5eee8",
  },
  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 50,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
    padding: 16,
    height: 300,
  },
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the background color here
  },
});

export default ModalPage;
