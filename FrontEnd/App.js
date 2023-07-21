import { StyleSheet, View } from "react-native";
import PasswordFindScreen from "./src/screens/passwordfind";

export default function App() {
  return (
    <View style={styles.container}>
      <PasswordFindScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
