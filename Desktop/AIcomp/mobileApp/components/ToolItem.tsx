import React from "react";
import { View, Text, Image } from "react-native";

interface ToolItemProps {
  icon: string;
  name: string;
  width?: string;
}

export default function ToolItem({
  icon,
  name,
  width = "flex-1",
}: ToolItemProps) {
  return (
    <View
      className={`${width} p-4 rounded-lg border border-[#E3E0DE] bg-white flex-row items-center gap-3`}
    >
      <Image source={{ uri: icon }} className="w-6 h-6" resizeMode="contain" />
      <Text
        className="text-[#171412] text-base font-bold"
        style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 20 }}
      >
        {name}
      </Text>
    </View>
  );
}
