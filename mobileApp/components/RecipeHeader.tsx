import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

interface RecipeHeaderProps {
  title: string;
}

export default function RecipeHeader({ title }: RecipeHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-row items-center justify-between px-4 pt-4 pb-2 bg-white h-16">
      <TouchableOpacity
        onPress={handleBack}
        className="w-12 h-12 items-center justify-center"
      >
        <Image
          source={require("../assets/icons/back.svg")}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
      </TouchableOpacity>
      <View className="flex-1 pr-12 items-center">
        <Text
          className="text-[#171412] text-lg font-bold text-center"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
