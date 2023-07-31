import { View, Image } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import CookieRunRegular from "../common/CookieRunRegular";

const AlertWaterComponent = () => {
  const [plantName, setPlantName] = useState("");
  const [pastTime, setPastTime] = useState(0);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <View style={styles.alignLeft}>
            <Image
              source={require("../../assets/img/alertWater.png")}
              style={styles.waterIcon}
            />
          </View>
          <View style={styles.textBlock}>
            <CookieRunRegular style={styles.fontBrown}>
              &apos;
              <CookieRunRegular style={styles.fontGreen}>
                새싹이
              </CookieRunRegular>
              &apos;가 &nbsp;
              <CookieRunRegular style={styles.fontBlue}>물</CookieRunRegular>
              &nbsp;이 부족해요!! 물 뿌리기 버튼을 눌러주세요!
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

export default AlertWaterComponent;
