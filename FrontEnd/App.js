import { StyleSheet, View } from "react-native";
import SignUpScreen from "./src/screens/signup";

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
