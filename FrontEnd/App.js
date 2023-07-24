import { StyleSheet, View } from "react-native";
import ParentComponent from "./src/components/test/ParentComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <ParentComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
