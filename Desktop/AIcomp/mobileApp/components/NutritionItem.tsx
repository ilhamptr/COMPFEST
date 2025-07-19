import React from "react";
import { View, Text } from "react-native";

interface NutritionItemProps {
  label: string;
  value: string;
  isRight?: boolean;
}

export default function NutritionItem({
  label,
  value,
  isRight = false,
}: NutritionItemProps) {
  return (
    <View className={`flex-1 py-4 ${isRight ? "pl-2" : "pr-2"} gap-1`}>
      <Text
        className="text-[#827569] text-sm"
        style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
      >
        {label}
      </Text>
      <Text
        className="text-[#171412] text-sm"
        style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
      >
        {value}
      </Text>
    </View>
  );
}
