import { View, Image } from "react-native";
import styles from "./style";
import CookieRunRegular from "../common/CookieRunRegular";

const AlertTankComponent = ({ date, nickname }) => {
  function calculateTimeAgo(timestamp) {
    // Convert the given timestamp to a Date object
    const givenDate = new Date(timestamp);

    // Get the current timestamp
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate;

    // Convert the time difference to minutes and hours
    const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // 1000 ms = 1 second, 60 seconds = 1 minute
    const hoursAgo = Math.floor(minutesAgo / 60);

    if (hoursAgo >= 1) {
      return `${hoursAgo}시간 전`;
    } else {
      return `${minutesAgo}분 전`;
    }
  }

  const minuteAgo = calculateTimeAgo(date);

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
              <CookieRunRegular style={styles.fontGreen}>
                &apos;{nickname}&apos;&nbsp;
              </CookieRunRegular>
              화분에&nbsp;
              <CookieRunRegular style={styles.fontBlue}>물</CookieRunRegular>
              <CookieRunRegular>이&nbsp;</CookieRunRegular>
              <CookieRunRegular style={styles.fontRed}>부족</CookieRunRegular>
              <CookieRunRegular>해요!! 물탱크를 채워주세요.</CookieRunRegular>
            </CookieRunRegular>
            <View style={styles.minuteStyle}>
              <CookieRunRegular style={styles.minuteColor}>
                {minuteAgo}
              </CookieRunRegular>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlertTankComponent;
