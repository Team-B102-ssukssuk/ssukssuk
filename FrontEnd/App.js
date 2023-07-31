import { StyleSheet, View } from "react-native";
import ProfileScreen from "./src/screens/profile";

export default function App() {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
