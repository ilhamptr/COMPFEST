import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

interface GetStartedButtonProps {
  onPress?: () => void;
  title?: string;
}

export default function GetStartedButton({
  onPress,
  title = "Get Started",
}: GetStartedButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default navigation to home
      router.push("/home");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex items-center justify-center mt-9 mx-4 my-3"
    >
      <View className="bg-[#F4A42F] rounded-3xl flex-row items-center justify-center min-w-[84px] min-h-12 w-full max-w-[480px] px-6 overflow-hidden">
        {/* LEFT SIDE ICON - Current icon location (already has Frame 1.svg) */}
        <View className="flex items-center gap-2.5 w-6">
          <Image
            source={require("../assets/icons/Frame 1.png")}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>

        {/* TEXT SECTION */}
        <View className="overflow-hidden w-28 px-2.5">
          <Text
            className="text-center text-[#171412] text-base font-bold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {title}
          </Text>
        </View>

        {/* RIGHT SIDE ICON - Add additional icon here if needed */}
        {/* Example:
        <View className="flex items-center gap-2.5 w-6">
          <Image
            source={require("../assets/icons/your-icon.svg")}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
        */}
      </View>
    </TouchableOpacity>
  );
}
