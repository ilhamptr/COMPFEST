import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface GetStartedButtonProps {
  onPress: () => void;
  title?: string;
}

export default function GetStartedButton({
  onPress,
  title = "Get Started",
}: GetStartedButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex items-center justify-center mt-9 mx-4 my-3"
    >
      <View className="bg-[#F4A42F] rounded-3xl flex-row items-center justify-center min-w-[84px] min-h-12 w-full max-w-[480px] px-6 overflow-hidden">
        <View className="flex items-center gap-2.5 w-6">
          <Image
            source={{
              uri: "../assets/icons/Frame 1.svg",
            }}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <View className="overflow-hidden w-28 px-2.5">
          <Text
            className="text-center text-[#171412] text-base font-bold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
