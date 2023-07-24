import { StyleSheet, View } from "react-native";
import ModalPlantDelete from "./src/components/modalplantdelete";

export default function App() {
  return (
    <View style={styles.container}>
      <ModalPlantDelete />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
