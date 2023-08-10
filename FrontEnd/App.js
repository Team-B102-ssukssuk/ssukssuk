import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Router from "./src/router/router.jsx";
import store from "./src/redux/store.jsx";
import { BackHandler } from "react-native";
import ModalExit from "./src/components/modalexit/index.jsx";
const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    const backAction = () => {
      // Show the modal when back button is pressed
      setModalVisible(true);
      // Return `true` to prevent the default back functionality
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Router />
        {/* Render the modal */}
        <ModalExit isVisible={isModalVisible} onClose={closeModal} />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
