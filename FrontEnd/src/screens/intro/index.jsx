// import React in our code
import React, { useState } from "react";
import styles from "./style";

// import all the components we are going to use
import { SafeAreaView, View, Text, Image, Button } from "react-native";

//import AppIntroSlider to use it
import AppIntroSlider from "react-native-app-intro-slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import CookieRunBold from "../../components/common/CookieRunBold";
import CookieRunRegular from "../../components/common/CookieRunRegular";

const IntroScreen = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [skipText, setSkipText] = useState("Skip");
  const [doneButtonColor, setDoneButtonColor] = useState("#D9D9D9");

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <View style={{ width: "100%", padding: 25 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.skipTextStyle, { color: doneButtonColor }]}>
              {skipText}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
      </View>
    );
  };

  const handleSlideChange = (index) => {
    // Check if it's the last slide
    if (index === slides.length - 1) {
      setSkipText("Done");
      setDoneButtonColor("#2DD0AF");
    } else {
      setSkipText("Skip");
      setDoneButtonColor("#D9D9D9");
    }
  };

  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip from any slide or
              Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          activeDotStyle={{ backgroundColor: "#2DD0AF" }}
          onSlideChange={handleSlideChange}
        />
      )}
    </>
  );
};

const slides = [
  {
    key: "s1",
    text: (
      <CookieRunRegular style={styles.subfontcolor}>
        시리얼 번호를 통해 화분을 등록하세요.
      </CookieRunRegular>
    ),
    title: <CookieRunBold>&quot;나만의 화분을 배치!&quot;</CookieRunBold>,
    image: require("../../assets/img/slideMockUp1.png"),
    backgroundColor: "white",
  },
  {
    key: "s2",
    title: <CookieRunBold>&quot;내 식물이 캐릭터로!&quot;</CookieRunBold>,
    text: (
      <CookieRunRegular style={styles.subfontcolor}>
        식물과 함께 캐릭터를 성장시켜 보세요.
      </CookieRunRegular>
    ),
    image: require("../../assets/img/slideMockUp2.png"),
    backgroundColor: "white",
  },
  {
    key: "s3",
    title: <CookieRunBold>&quot;기록과 함께 꼼꼼하게!&quot;</CookieRunBold>,
    text: (
      <CookieRunRegular style={styles.subfontcolor}>
        키우는 식물의 기록을 보며 정성스레 키워보세요.
      </CookieRunRegular>
    ),
    image: require("../../assets/img/slideMockUp3.png"),
    backgroundColor: "white",
  },
];

export default IntroScreen;
