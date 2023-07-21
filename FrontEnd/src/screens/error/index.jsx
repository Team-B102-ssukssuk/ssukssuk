import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";

const ErrorScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F7E9",
      }}
    >
      <Image
        source={require("../../assets/img/404.png")}
        style={{
          width: Dimensions.get("screen").width,
          height: 320,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "#AC1919",
          fontWeight: "bold",
          fontSize: 25,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {`상추추! 여기가 아니예요...`}
      </Text>
      <Text
        style={{
          color: "#AC1919",
          fontWeight: "600",
          fontSize: 12,
          marginVertical: 10,
        }}
      >
        버튼을 클릭해서 이전 페이지로 돌아가세요!
      </Text>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: "#EC1010",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
          elevation: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          GO BACK
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
