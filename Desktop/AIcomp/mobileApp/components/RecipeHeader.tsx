import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

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
          source={{
            uri: "https://api.builder.io/api/v1/image/assets/TEMP/e32e36a0f815dcb82df3087177715cf55a5aea89?width=48",
          }}
          className="w-6 h-6"
          resizeMode="contain"
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
