import { StyleSheet, View } from "react-native";
import ModalSetting from "./src/components/modalsetting";

export default function App() {
  return (
    <View style={styles.container}>
      <ModalSetting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
