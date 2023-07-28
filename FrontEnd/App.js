import { StyleSheet, View } from "react-native";
import ModalPlantSeed from "./src/components/modalplantseed";

export default function App() {
  return (
    <View style={styles.container}>
      <ModalPlantSeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
