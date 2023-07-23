import { useState, useEffect } from "react";
import { Text } from "react-native";
import LoadingScreen from "../../screens/loading";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // Import expo-splash-screen module

const CookieRunRegular = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    // Load the fonts asynchronously
    const loadFonts = async () => {
      await Font.loadAsync({
        cookieRunRegular: require("../../assets/fonts/CookieRun-Regular.ttf"),
      });
      // Once the fonts are loaded, hide the splash screen
      SplashScreen.hideAsync();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  if (!fontsLoaded) {
    return <LoadingScreen />;
  } else {
    return (
      <Text
        {...props}
        style={{ ...props.style, fontFamily: "cookieRunRegular" }}
      >
        {props.children}
      </Text>
    );
  }
};

export default CookieRunRegular;
