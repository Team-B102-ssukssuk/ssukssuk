import React from "react";
import { View, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { LineChart, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import CookieRunBold from "../common/CookieRunBold";
import styles from "./style";

const ModalSensor = ({ isVisible, onClose, selectedSensorType }) => {
  // Dummy data with date and value
  const data = [
    { date: "08-01", value: 50 },
    { date: "08-02", value: 10 },
    { date: "08-03", value: 40 },
    { date: "08-04", value: 40 },
    { date: "08-05", value: 40 },
    { date: "08-06", value: 40 },
    { date: "08-07", value: 40 },
    { date: "08-08", value: 40 },
    { date: "08-09", value: 40 },
    { date: "08-10", value: 40 },
    { date: "08-11", value: 40 },
  ];

  const dates = data.map((item) => item.date);
  const values = data.map((item) => item.value);

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
              {selectedSensorType}
            </CookieRunBold>
            {/* LineChart */}
            <LineChart
              style={{ width: 250, height: 250, marginTop: 3, marginLeft: 5 }} // Adjust width and height as needed
              data={values}
              curve={shape.curveNatural}
              svg={{ stroke: "#FFF", strokeWidth: 2 }}
              contentInset={{ top: 40, bottom: 20 }} // Increased bottom inset for labels
            />
            {/* X-axis with labels */}
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
                contentInset={{ left: 25, right: 5 }}
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
