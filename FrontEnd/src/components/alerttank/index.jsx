import { View, Image } from "react-native";
import styles from "./style";
import CookieRunRegular from "../common/CookieRunRegular";

const AlertTankComponent = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <View style={styles.alignLeft}>
            <Image
              source={require("../../assets/img/alertTank.png")}
              style={styles.waterIcon}
            />
          </View>
          <View style={styles.textBlock}>
            <CookieRunRegular style={styles.fontBrown}>
              화분에&nbsp;
              <CookieRunRegular style={styles.fontBlue}>물</CookieRunRegular>
              <CookieRunRegular>이&nbsp;</CookieRunRegular>
              <CookieRunRegular style={styles.fontRed}>부족</CookieRunRegular>
              <CookieRunRegular>해요!! 물탱크를 채워주세요.</CookieRunRegular>
            </CookieRunRegular>
            <View style={styles.minuteStyle}>
              <CookieRunRegular style={styles.minuteColor}>
                30분 전
              </CookieRunRegular>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlertTankComponent;
