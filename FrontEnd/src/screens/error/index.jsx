import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import CookieRunBold from "../../components/common/CookieRunBold";
import CookieRunRegular from "../../components/common/CookieRunRegular";

const ErrorScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF6C6C",
      }}
    >
      <CookieRunBold
        style={{
          color: "#fff",
          fontSize: 66,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        ERROR
      </CookieRunBold>
      <CookieRunRegular
        style={{
          color: "#fff",
          fontSize: 26,
          marginTop: 5,
          marginBottom: 40,
        }}
      >
        오류가 나버렸다추...
      </CookieRunRegular>
      <Image
        source={require("../../assets/img/Error.png")}
        style={{
          width: Dimensions.get("screen").width,
          height: 320,
        }}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#fff",
          paddingVertical: 12,
          paddingHorizontal: 24,
          marginTop: 10,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
          elevation: 10,
        }}
      >
        <CookieRunBold
          style={{
            color: "#FF6C6C",
            fontSize: 36,
          }}
        >
          돌아가기
        </CookieRunBold>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
