import React from "react";
import { View, Text } from "react-native";

// Helper component for ingredient double rows
interface IngredientDoubleRowProps {
  leftIngredient: string;
  leftAmount: string;
  rightIngredient: string;
  rightAmount: string;
}

export function IngredientDoubleRow({
  leftIngredient,
  leftAmount,
  rightIngredient,
  rightAmount,
}: IngredientDoubleRowProps) {
  return (
    <View className="flex-row gap-6 border-t border-[#E5E8EB]">
      <View className="w-[72px] py-5">
        <Text
          className="text-[#827569] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {leftIngredient}
        </Text>
        <Text
          className="text-[#171412] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {leftAmount}
        </Text>
      </View>
      <View className="w-[262px] py-5">
        <Text
          className="text-[#827569] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {rightIngredient}
        </Text>
        <Text
          className="text-[#171412] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {rightAmount}
        </Text>
      </View>
    </View>
  );
}

// Helper component for single ingredient row
interface IngredientSingleRowProps {
  ingredient: string;
  amount: string;
}

export function IngredientSingleRow({
  ingredient,
  amount,
}: IngredientSingleRowProps) {
  return (
    <View className="flex-row gap-6 border-t border-[#E5E8EB]">
      <View className="w-[72px] py-5">
        <Text
          className="text-[#827569] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {ingredient}
        </Text>
        <Text
          className="text-[#171412] text-sm"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 21 }}
        >
          {amount}
        </Text>
      </View>
    </View>
  );
}
