import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Router from "./src/router/router.jsx";
import store from "./src/redux/store.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Router />
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
