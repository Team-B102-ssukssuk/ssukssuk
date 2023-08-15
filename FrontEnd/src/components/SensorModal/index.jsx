import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { LineChart, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";
import customAxios from "../../utils/axios";

const ModalSensor = ({
  isVisible,
  onClose,
  selectedSensorType,
  selectedPotId,
}) => {
  const [isSensorData, setSensorData] = useState([]);

  const getSensorData = () => {
    customAxios
      .get(`/sensor/${selectedSensorType}/${selectedPotId}`)
      .then((res) => {
        setSensorData(res.data.data);
      })
      .catch(() => {
        console.log("센서값 불러오기 오류");
      });
  };

  useEffect(() => {
    if (isVisible) {
      getSensorData();
    }
  }, [isVisible]);

  const dates = isSensorData.map((item) => item.date);
  const values = isSensorData.map((item) => item.avg);

  // Determine how many labels to skip based on the data length
  const labelsToShow = Math.min(5, Math.ceil(dates.length / 5)); // Show maximum 5 labels

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={300}
    >
      <View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            resizeMode="contain"
            source={require("../../assets/img/StudyBoard.png")}
            style={styles.BoardSize}
          >
            <CookieRunBold
              style={{ fontSize: 24, marginBottom: 10, color: "#FFF" }}
            >
              {selectedSensorType === "temperature"
                ? "온도 센서"
                : selectedSensorType === "humidity"
                ? "습도 센서"
                : "토양 수분 센서"}
            </CookieRunBold>
            {/* LineChart */}
            <View style={{ flexDirection: "row" }}>
              {/* X-axis with labels */}
              <YAxis
                data={values}
                contentInset={{ top: 40, bottom: 40 }}
                svg={{
                  fontSize: 10,
                  fontWeight: "bold",
                  fill: "#fff",
                }}
                numberOfTicks={5} // Number of ticks you want to display on the y-axis
                formatLabel={(value) => `${value}`} // Format labels according to your requirement
              />
              <LineChart
                style={{ width: 250, height: 250, marginTop: 3, marginLeft: 5 }} // Adjust width and height as needed
                data={values}
                curve={shape.curveNatural}
                svg={{ stroke: "#FFF", strokeWidth: 2 }}
                contentInset={{ top: 40, bottom: 40 }} // Increased bottom inset for labels
              />
            </View>
            <View style={{ width: 250 }}>
              <XAxis
                style={{ marginHorizontal: -10 }} // Adjust margin as needed
                data={dates}
                formatLabel={(value, index) => {
                  if (index % labelsToShow === 0) {
                    return dates[index];
                  }
                  return "";
                }}
                contentInset={{ left: 25, right: 25 }}
                svg={{
                  fontSize: Math.min(10, (250 / dates.length) * 2.5), // Calculate font size based on chart width
                  fontWeight: "bold",
                  fill: "#fff",
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSensor;
