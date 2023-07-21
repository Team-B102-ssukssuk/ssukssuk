import { Text, View, Image } from "react-native";
import styles from "./styles";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>들어가는 중</Text>
        <Image
          source={require("../../assets/img/LoadingDot.gif")}
          style={styles.loadingDotImg}
        />
        <Image
          source={require("../../assets/img/Loading.gif")}
          style={styles.loadingImg}
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
