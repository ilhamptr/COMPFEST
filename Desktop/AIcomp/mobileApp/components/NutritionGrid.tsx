import React from "react";
import { View, Text } from "react-native";
import NutritionItem from "./NutritionItem";

interface NutritionData {
  label: string;
  value: string;
}

interface NutritionGridProps {
  nutritionData: NutritionData[];
}

export default function NutritionGrid({ nutritionData }: NutritionGridProps) {
  return (
    <>
      {/* Nutrition Section Header */}
      <View className="px-4 pt-5 pb-3">
        <Text
          className="text-[#171412] text-[22px] font-bold"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
        >
          Nutrition
        </Text>
      </View>

      {/* Nutrition Grid */}
      <View className="px-4 pb-6">
        {/* Process nutrition data in pairs for rows */}
        {Array.from({ length: Math.ceil(nutritionData.length / 2) }, (_, i) => {
          const leftNutrition = nutritionData[i * 2];
          const rightNutrition = nutritionData[i * 2 + 1];

          return (
            <View key={i} className="flex-row border-t border-[#E5E8EB]">
              <NutritionItem
                label={leftNutrition.label}
                value={leftNutrition.value}
              />
              {rightNutrition && (
                <NutritionItem
                  label={rightNutrition.label}
                  value={rightNutrition.value}
                  isRight
                />
              )}
            </View>
          );
        })}
      </View>
    </>
  );
}
