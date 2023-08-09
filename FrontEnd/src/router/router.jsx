import IntroScreen from "../screens/intro";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/login";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordFindScreen from "../screens/passwordfind";
import PasswordMakeScreen from "../screens/passwordmake";
import SignUpScreen from "../screens/signup";
import SignUpNicknameScreen from "../screens/signupnickname";
import SignUpPasswordScreen from "../screens/signuppassword";
import MainScreen from "../screens/main";
import PotScreen from "../screens/pot";
import AlarmScreen from "../screens/alarm";
import GardenScreen from "../screens/garden";
import ProfileScreen from "../screens/profile";
import ErrorScreen from "../screens/main";

import Swiper from "react-native-swiper";
import KakaoLoginScreen from "../screens/kakaologin";

const Stack = createStackNavigator();

const SliderMainScreen = () => {
  return (
    <Swiper loop={false} showsPagination={false} index={1}>
      <PotScreen />
      <MainScreen />
      <GardenScreen />
    </Swiper>
  );
};

const SliderGardenScreen = () => {
  return (
    <Swiper loop={false} showsPagination={false} index={2}>
      <PotScreen />
      <MainScreen />
      <GardenScreen />
    </Swiper>
  );
};

const SliderPotScreen = () => {
  return (
    <Swiper loop={false} showsPagination={false} index={0}>
      <PotScreen />
      <MainScreen />
      <GardenScreen />
    </Swiper>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Pot"
          component={PotScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Intro"
          component={IntroScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="KakaoLogin"
          component={KakaoLoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PasswordFind"
          component={PasswordFindScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PasswordMake"
          component={PasswordMakeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUpNickname"
          component={SignUpNicknameScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUpPassword"
          component={SignUpPasswordScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Alarm"
          component={AlarmScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Garden"
          component={GardenScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Error"
          component={ErrorScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Slider"
          component={SliderMainScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SliderGarden"
          component={SliderGardenScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SliderPot"
          component={SliderPotScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

// export default function Router() {
//   const Stack = createStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Intro"
//           component={IntroScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="PasswordFind"
//           component={PasswordFindScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="PasswordMake"
//           component={PasswordMakeScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="SignUp"
//           component={SignUpScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="SignUpNickname"
//           component={SignUpNicknameScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="SignUpPassword"
//           component={SignUpPasswordScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Main"
//           component={MainScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Pot"
//           component={PotScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Alarm"
//           component={AlarmScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Garden"
//           component={GardenScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Profile"
//           component={ProfileScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Error"
//           component={ErrorScreen}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
