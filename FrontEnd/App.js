import { StyleSheet, View } from "react-native";
import AlarmScreen from "./src/screens/alarm";

export default function App() {
  return (
    <View style={styles.container}>
      <AlarmScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
