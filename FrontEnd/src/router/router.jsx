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

export default function Router() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Intro"
          component={IntroScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
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
          name="Pot"
          component={PotScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
