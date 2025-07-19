import React from "react";
import { View, Image, ScrollView, SafeAreaView } from "react-native";
import RecipeHeader from "../../components/RecipeHeader";
import ToolsList from "../../components/ToolsList";
import IngredientsList from "../../components/IngredientsList";
import NutritionGrid from "../../components/NutritionGrid";
import RecipeTutorial from "../../components/RecipeTutorial";

export default function RecipeResult() {
  // Recipe data - in a real app, this would come from props or API
  const recipeData = {
    title: "Garlic Chicken with Broccoli",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/20a37ddb6ce99ce288aef72874398afbc00023a1?width=824",
    tools: [
      {
        icon: "https://api.builder.io/api/v1/image/assets/TEMP/ed9c5a673dd160351cb3f4bd2700b81034c67746?width=48",
        name: "Pan",
      },
      {
        icon: "https://api.builder.io/api/v1/image/assets/TEMP/08ce1653faaaa74c07b18b6e2038bf3e869b899a?width=48",
        name: "Knife",
      },
      {
        icon: "https://api.builder.io/api/v1/image/assets/TEMP/30f49c71e13f57e32895ae3984db735eb7b0464e?width=48",
        name: "Cutting Board",
        width: "w-[173px]",
      },
    ],
    ingredients: [
      { name: "Chicken Breast", amount: "1 lb" },
      { name: "Broccoli Florets", amount: "1 head" },
      { name: "Garlic Cloves", amount: "4 cloves" },
      { name: "Soy Sauce", amount: "2 tbsp" },
      { name: "Olive Oil", amount: "1 tbsp" },
      { name: "Salt", amount: "1 tsp" },
      { name: "Pepper", amount: "1/2 tsp" },
    ],
    nutrition: [
      { label: "Calories", value: "350" },
      { label: "Protein", value: "30g" },
      { label: "Carbohydrates", value: "10g" },
      { label: "Fats", value: "20g" },
    ],
    tutorial: {
      youtubeUrl: "https://youtu.be/FJ3N_2r6R-o?si=YFuwrqIRNgG1AnEX",
      thumbnailUrl:
        "https://api.builder.io/api/v1/image/assets/TEMP/dc8168558ef628347c6634666eefc1c79fcbd033?width=760",
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[412px] mx-auto bg-white rounded-[30px] relative">
          {/* Header with back button and title */}
          <RecipeHeader title={recipeData.title} />

          {/* Recipe Image */}
          <Image
            source={{ uri: recipeData.image }}
            className="w-full h-[241px]"
            resizeMode="cover"
          />

          {/* Tools Section */}
          <ToolsList tools={recipeData.tools} />

          {/* Ingredients Section */}
          <IngredientsList ingredients={recipeData.ingredients} />

          {/* Nutrition Section */}
          <NutritionGrid nutritionData={recipeData.nutrition} />

          {/* Recipe Tutorial Section */}
          <RecipeTutorial
            youtubeUrl={recipeData.tutorial.youtubeUrl}
            thumbnailUrl={recipeData.tutorial.thumbnailUrl}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
