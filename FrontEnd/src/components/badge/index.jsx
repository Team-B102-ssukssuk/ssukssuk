import { View, Image } from "react-native";
import styles from "./style";
import CookieRunRegular from "../common/CookieRunRegular";

const BadgeComponent = ({ date, title, badgeId }) => {
  console.log("아이디" + badgeId);
  const badgeImages = {
    1: require("../../assets/img/ActiveBadge1.png"),
    2: require("../../assets/img/ActiveBadge2.png"),
    3: require("../../assets/img/ActiveBadge3.png"),
    4: require("../../assets/img/ActiveBadge4.png"),
    5: require("../../assets/img/ActiveBadge5.png"),
    6: require("../../assets/img/ActiveBadge6.png"),
    7: require("../../assets/img/ActiveBadge7.png"),
    8: require("../../assets/img/ActiveBadge8.png"),
    9: require("../../assets/img/ActiveBadge9.png"),
  };

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
            <Image source={badgeImages[badgeId]} style={styles.waterIcon} />
          </View>
          <View style={styles.textBlock}>
            <CookieRunRegular style={styles.fontBrown}>
              {title}
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

export default BadgeComponent;
