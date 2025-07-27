import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import VideoPlayer from "../components/VideoPlayer";
import { useRecipe } from "../contexts/RecipeContext";
import { mapAIResponseData, getDifficultyColor, capitalize } from "../utils";

export default function RecipeResult() {
  const router = useRouter();
  const { recipeData, isLoading } = useRecipe();

  const handleBack = () => router.back();

  // Use the centralized data mapping function
  const data = recipeData ? mapAIResponseData(recipeData) : null;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F4A24F" />
          <Text className="text-lg mt-4 text-[#171412]" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Loading recipe...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-lg text-center">No recipe data available</Text>
          <TouchableOpacity onPress={handleBack} className="mt-4 bg-[#F4A24F] px-6 py-3 rounded-lg">
            <Text className="text-white font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Recipe detail row component to reduce repetition
  const RecipeDetailRow = ({ label, value, isLast = false }: { label: string; value: string | React.ReactNode; isLast?: boolean }) => (
    <View className={`flex-row justify-between items-center py-3 ${!isLast ? 'border-b border-[#E5E8EB]' : ''}`}>
      <Text className="text-[#666] text-base font-medium">{label}:</Text>
      {typeof value === 'string' ? (
        <Text className="text-[#171412] text-base font-bold flex-1 text-right ml-4" numberOfLines={2}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );

  // Section component to reduce repetition
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="px-4 pt-4 pb-4">
      <Text
        className="text-[#171412] text-[24px] font-bold mb-4"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  // List item component for ingredients and tips
  const BulletListItem = ({ item, index }: { item: string; index: number }) => (
    <View key={index} className="flex-row items-center mb-2">
      <View className="w-2 h-2 bg-[#F4A24F] rounded-full mr-3" />
      <Text className="text-[#171412] text-base leading-6 flex-1">{item}</Text>
    </View>
  );

  // Step item component
  const StepItem = ({ step, index }: { step: string; index: number }) => (
    <View key={index} className="flex-row mb-4">
      <View className="w-8 h-8 bg-[#F4A24F] rounded-full items-center justify-center mr-4 mt-1 flex-shrink-0">
        <Text className="text-white font-bold text-sm">{index + 1}</Text>
      </View>
      <View className="flex-1 bg-[#FFF8E1] rounded-2xl p-4 shadow-sm border border-[#F0F0F0]">
        <Text className="text-[#171412] text-base leading-6">{step}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="bg-[#F4A24F] pt-12 pb-8 px-4 relative">
            <TouchableOpacity
              onPress={handleBack}
              className="absolute left-4 top-12 w-12 h-12 items-center justify-center bg-white/20 rounded-full z-10"
              activeOpacity={0.7}
            >
              <Image
                source={require("../assets/icons/back.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="px-12">
              <Text
                className="text-white text-2xl font-bold text-center mt-4"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {data.name}
              </Text>
            </View>
          </View>

          {/* Recipe Details */}
          <Section title="Recipe Details">
            <View className="bg-[#FFF8E1] rounded-2xl p-4">
              <RecipeDetailRow label="Name" value={data.name} />
              <RecipeDetailRow
                label="Difficulty"
                value={
                  <View className={`px-3 py-1 rounded-full ${getDifficultyColor(data.difficulty)}`}>
                    <Text className="text-white text-sm font-bold">{capitalize(data.difficulty)}</Text>
                  </View>
                }
              />
              <RecipeDetailRow label="Diet" value={capitalize(data.diet)} />
              <RecipeDetailRow label="Food Type" value={capitalize(data.kind_of_food)} />
              <RecipeDetailRow label="Prep Time" value={data.prep_time} />
              <RecipeDetailRow label="Cook Time" value={data.cook_time} isLast />
            </View>
          </Section>

          {/* Ingredients */}
          <Section title="Ingredients">
            <View className="bg-[#FFF8E1] rounded-2xl p-4">
              {data.ingredients.length > 0 ? (
                data.ingredients.map((ingredient, index) => (
                  <BulletListItem key={index} item={ingredient} index={index} />
                ))
              ) : (
                <Text className="text-[#666] text-base">No ingredients available</Text>
              )}
            </View>
          </Section>

          {/* Cooking Steps */}
          <Section title="Cooking Steps">
            <View className="space-y-4">
              {data.steps.length > 0 ? (
                data.steps.map((step, index) => (
                  <StepItem key={index} step={step} index={index} />
                ))
              ) : (
                <View className="bg-[#FFF8E1] rounded-2xl p-4 border border-[#F0F0F0]">
                  <Text className="text-[#666] text-base">No cooking steps available</Text>
                </View>
              )}
            </View>
          </Section>

          {/* Tips */}
          <Section title="Cooking Tips">
            <View className="bg-[#FFF8E1] rounded-2xl p-4">
              {data.tips.length > 0 ? (
                data.tips.map((tip, index) => (
                  <BulletListItem key={index} item={tip} index={index} />
                ))
              ) : (
                <Text className="text-[#666] text-base">No cooking tips available</Text>
              )}
            </View>
          </Section>

          {/* Video Tutorial */}
          {data.video_url && (
            <Section title="Video Tutorial">
              <VideoPlayer
                youtubeUrl={data.video_url}
                thumbnailUrl={data.video_url}
              />
            </Section>
          )}

          {/* Bottom spacing for phone navigation */}
          <View className="h-20" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
