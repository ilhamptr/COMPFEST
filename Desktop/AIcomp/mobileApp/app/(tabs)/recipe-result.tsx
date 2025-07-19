import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import ToolItem from "../../components/ToolItem";
import {
  IngredientDoubleRow,
  IngredientSingleRow,
} from "../../components/IngredientRow";
import NutritionItem from "../../components/NutritionItem";
import VideoPlayer from "../../components/VideoPlayer";

export default function RecipeResult() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[412px] mx-auto bg-white rounded-[30px] relative">
          {/* Header */}
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
                Garlic Chicken with Broccoli
              </Text>
            </View>
          </View>

          {/* Recipe Image */}
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/20a37ddb6ce99ce288aef72874398afbc00023a1?width=824",
            }}
            className="w-full h-[241px]"
            resizeMode="cover"
          />

          {/* Tools Section */}
          <View className="px-4 pt-5 pb-3">
            <Text
              className="text-[#171412] text-[22px] font-bold"
              style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
            >
              Tools
            </Text>
          </View>

          <View className="px-4 pb-4">
            {/* First row of tools */}
            <View className="flex-row gap-3 mb-3">
              <ToolItem
                icon="https://api.builder.io/api/v1/image/assets/TEMP/ed9c5a673dd160351cb3f4bd2700b81034c67746?width=48"
                name="Pan"
              />
              <ToolItem
                icon="https://api.builder.io/api/v1/image/assets/TEMP/08ce1653faaaa74c07b18b6e2038bf3e869b899a?width=48"
                name="Knife"
              />
            </View>

            {/* Second row of tools */}
            <View className="flex-row">
              <ToolItem
                icon="https://api.builder.io/api/v1/image/assets/TEMP/30f49c71e13f57e32895ae3984db735eb7b0464e?width=48"
                name="Cutting Board"
                width="w-[173px]"
              />
            </View>
          </View>

          {/* Ingredients Section */}
          <View className="px-4 pt-5 pb-3">
            <Text
              className="text-[#171412] text-[22px] font-bold"
              style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
            >
              Ingredients
            </Text>
          </View>

          <View className="px-4 pb-6">
            {/* Ingredient rows */}
            <IngredientDoubleRow
              leftIngredient="Chicken Breast"
              leftAmount="1 lb"
              rightIngredient="Broccoli Florets"
              rightAmount="1 head"
            />
            <IngredientDoubleRow
              leftIngredient="Garlic Cloves"
              leftAmount="4 cloves"
              rightIngredient="Soy Sauce"
              rightAmount="2 tbsp"
            />
            <IngredientDoubleRow
              leftIngredient="Olive Oil"
              leftAmount="1 tbsp"
              rightIngredient="Salt"
              rightAmount="1 tsp"
            />
            <IngredientSingleRow ingredient="Pepper" amount="1/2 tsp" />
          </View>

          {/* Nutrition Section */}
          <View className="px-4 pt-5 pb-3">
            <Text
              className="text-[#171412] text-[22px] font-bold"
              style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
            >
              Nutrition
            </Text>
          </View>

          <View className="px-4 pb-6">
            {/* First nutrition row */}
            <View className="flex-row border-t border-[#E5E8EB]">
              <NutritionItem label="Calories" value="350" />
              <NutritionItem label="Protein" value="30g" isRight />
            </View>

            {/* Second nutrition row */}
            <View className="flex-row border-t border-[#E5E8EB]">
              <NutritionItem label="Carbohydrates" value="10g" />
              <NutritionItem label="Fats" value="20g" isRight />
            </View>
          </View>

          {/* Recipe Tutorial Section */}
          <View className="px-4 pt-5 pb-3">
            <Text
              className="text-[#171412] text-[22px] font-bold"
              style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
            >
              Recipe Tutorial
            </Text>
          </View>

          <View className="px-4 pb-6">
            <VideoPlayer
              youtubeUrl="https://youtu.be/FJ3N_2r6R-o?si=YFuwrqIRNgG1AnEX"
              thumbnailUrl="https://api.builder.io/api/v1/image/assets/TEMP/dc8168558ef628347c6634666eefc1c79fcbd033?width=760"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
