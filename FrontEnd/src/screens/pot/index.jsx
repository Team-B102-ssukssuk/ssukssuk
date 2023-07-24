import { ImageBackground } from "react-native";
import { View, Text } from "react-native";

import styles from "./style";

const PotScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/img/ProfileBackground.png")}
      style={styles.container}
    >
      <View>
        <Text>안녕하세요</Text>
      </View>
    </ImageBackground>
  );
};

export default PotScreen;
