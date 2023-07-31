import { StyleSheet, View } from "react-native";
import IntroScreen from "./src/screens/intro";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/login";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordFindScreen from "./src/screens/passwordfind";
import PasswordMakeScreen from "./src/screens/passwordmake";
import SignUpScreen from "./src/screens/signup";
import SignUpNicknameScreen from "./src/screens/signupnickname";
import SignUpPasswordScreen from "./src/screens/signuppassword";
import MainScreen from "./src/screens/main";
import PotScreen from "./src/screens/pot";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
