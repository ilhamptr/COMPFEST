import React from "react";
import { View, Text } from "react-native";
import { IngredientDoubleRow, IngredientSingleRow } from "./IngredientRow";

interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export default function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <>
      {/* Ingredients Section Header */}
      <View className="px-4 pt-5 pb-3">
        <Text
          className="text-[#171412] text-[22px] font-bold"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
        >
          Ingredients
        </Text>
      </View>

      {/* Ingredients List */}
      <View className="px-4 pb-6">
        {/* Process ingredients in pairs for double rows */}
        {Array.from({ length: Math.ceil(ingredients.length / 2) }, (_, i) => {
          const leftIngredient = ingredients[i * 2];
          const rightIngredient = ingredients[i * 2 + 1];

          if (rightIngredient) {
            return (
              <IngredientDoubleRow
                key={i}
                leftIngredient={leftIngredient.name}
                leftAmount={leftIngredient.amount}
                rightIngredient={rightIngredient.name}
                rightAmount={rightIngredient.amount}
              />
            );
          } else {
            return (
              <IngredientSingleRow
                key={i}
                ingredient={leftIngredient.name}
                amount={leftIngredient.amount}
              />
            );
          }
        })}
      </View>
    </>
  );
}
