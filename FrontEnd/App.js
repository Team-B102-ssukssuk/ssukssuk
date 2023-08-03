import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Router from "./src/router/router.jsx";
import store from "./src/redux/store.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Router />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
