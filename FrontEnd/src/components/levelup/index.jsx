import { View, Image } from "react-native";
import styles from "./style";
import CookieRunRegular from "../common/CookieRunRegular";
import customAxios from "../../utils/axios";
import { useEffect, useState } from "react";
import plantImages from "../../assets/img/plantImages";

const LevelUpComponent = ({ date, nickname, gardenId }) => {
  const [isPlantId, setPlantId] = useState(null);
  const [isLevel, setLevel] = useState(null);

  const getPlantImageSource = (plantId, level) => {
    const imageName = `${plantId}_${level}.gif`;
    const image = plantImages[imageName];
    const resolvedImage = Image.resolveAssetSource(image);

    return resolvedImage;
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

  const getLevelUp = () => {
    customAxios
      .get(`/plant/${gardenId}`)
      .then((res) => {
        setPlantId(res.data.data.plantId);
        setLevel(res.data.data.level);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLevelUp();
  }, []);

  const minuteAgo = calculateTimeAgo(date);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <View style={styles.alignLeft}>
            <Image
              source={getPlantImageSource(isPlantId, isLevel)}
              style={styles.waterIcon}
            />
          </View>
          <View style={styles.textBlock}>
            <CookieRunRegular style={styles.fontBrown}>
              &apos;
              <CookieRunRegular style={styles.fontGreen}>
                {nickname}
              </CookieRunRegular>
              &apos;가 &nbsp;
              <CookieRunRegular style={styles.fontBlue}>
                레벨업
              </CookieRunRegular>
              &nbsp;했습니다!! 확인해 주세요
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

export default LevelUpComponent;
