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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeIn,
  SlideInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

export default function RecipeResult() {
  const router = useRouter();
  const { recipeData, isLoading } = useRecipe();

  const handleBack = () => router.back();
  const data = recipeData ? mapAIResponseData(recipeData) : null;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8E1]">
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white rounded-3xl p-8 shadow-lg items-center">
            <ActivityIndicator size="large" color="#F4A24F" className="mb-4" />
            <Text
              className="text-[#171412] text-xl font-bold mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Creating Your Recipe
            </Text>
            <Text
              className="text-gray-500 text-center leading-6"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Our AI chef is analyzing your ingredients and crafting the perfect recipe just for you...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8E1]">
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white rounded-3xl p-8 shadow-lg items-center">
            <Text className="text-6xl mb-4">😔</Text>
            <Text
              className="text-[#171412] text-xl font-bold mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Oops! No Recipe Found
            </Text>
            <Text
              className="text-gray-500 text-center mb-6 leading-6"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              We couldn't generate a recipe with the provided ingredients. Please try again.
            </Text>
            <TouchableOpacity
              onPress={handleBack}
              className="bg-[#F4A24F] px-8 py-4 rounded-full shadow-lg"
            >
              <Text
                className="text-white font-bold text-lg"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                ← Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Enhanced component definitions
  const RecipeDetailRow = ({
    label,
    value,
    isLast = false
  }: {
    label: string;
    value: string | React.ReactNode;
    isLast?: boolean
  }) => (
    <View className={`flex-row justify-between items-center py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <Text
        className="text-gray-600 text-base font-medium"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {label}:
      </Text>
      {typeof value === 'string' ? (
        <Text
          className="text-[#171412] text-base font-bold flex-1 text-right ml-4"
          numberOfLines={2}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );

  const Section = ({
    title,
    icon,
    children
  }: {
    title: string;
    icon: string;
    children: React.ReactNode
  }) => (
    <View className="mb-8">
      <View className="px-6 mb-4">
        <Text
          className="text-[#171412] text-2xl font-bold flex-row items-center"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {icon} {title}
        </Text>
      </View>
      {children}
    </View>
  );

  const BulletListItem = ({ item, index }: { item: string; index: number }) => (
    <View key={index} className="flex-row items-start mb-3">
      <View className="w-2 h-2 bg-[#F4A24F] rounded-full mr-4 mt-3 flex-shrink-0" />
      <Text
        className="text-[#171412] text-base leading-6 flex-1"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        {item}
      </Text>
    </View>
  );

  const StepItem = ({ step, index }: { step: string; index: number }) => (
    <View key={index} className="flex-row mb-6 px-6">
      <View className="w-10 h-10 bg-[#F4A24F] rounded-full items-center justify-center mr-4 mt-1 flex-shrink-0 shadow-md">
        <Text
          className="text-white font-bold text-base"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {index + 1}
        </Text>
      </View>
      <View className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <Text
          className="text-[#171412] text-base leading-7"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {step}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E1]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Enhanced Header */}
        <View className="relative bg-[#F4A24F] pt-12 pb-8">
          {/* Background Pattern */}
          <View className="absolute inset-0 opacity-10">
            <View className="absolute top-8 left-12 w-12 h-12 bg-white rounded-full" />
            <View className="absolute top-16 right-16 w-8 h-8 bg-white rounded-full" />
            <View className="absolute bottom-6 left-20 w-6 h-6 bg-white rounded-full" />
          </View>

          <TouchableOpacity
            onPress={handleBack}
            className="absolute left-6 top-12 w-12 h-12 items-center justify-center bg-white/20 rounded-full z-50 backdrop-blur-sm"
            activeOpacity={0.7}
            style={{ elevation: 10 }}
          >
            <Image
              source={require("../assets/icons/back.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="px-16 relative z-10">
            <Text
              className="text-white text-3xl font-bold text-center mt-4"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {data.name}
            </Text>
            <Text
              className="text-white/90 text-center mt-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Your personalized recipe is ready!
            </Text>
          </View>
        </View>

        {/* Recipe Details Card */}
        <View className="px-6 -mt-4 relative z-10 mb-6">
          <View className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <Text
              className="text-[#171412] text-xl font-bold mb-4"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              📋 Recipe Details
            </Text>
            <RecipeDetailRow label="Name" value={data.name} />
            <RecipeDetailRow
              label="Difficulty"
              value={
                <View
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: getDifficultyColor(data.difficulty) }}
                >
                  <Text
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    {capitalize(data.difficulty)}
                  </Text>
                </View>
              }
            />
            <RecipeDetailRow label="Diet" value={capitalize(data.diet)} />
            <RecipeDetailRow label="Cuisine" value={capitalize(data.kind_of_food)} />
            <RecipeDetailRow label="Prep Time" value={data.prep_time} />
            <RecipeDetailRow label="Cook Time" value={data.cook_time} isLast />
          </View>
        </View>

        {/* Ingredients Section */}
        <Section title="Ingredients" icon="🥬">
          <View className="mx-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            {data.ingredients.length > 0 ? (
              data.ingredients.map((ingredient, index) => (
                <BulletListItem key={index} item={ingredient} index={index} />
              ))
            ) : (
              <Text className="text-gray-500 text-base">No ingredients available</Text>
            )}
          </View>
        </Section>

        {/* Cooking Tips Section */}
        {data.tips.length > 0 ? (
          <Section title="Cooking Tips" icon="💡">
            <View className="mx-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              {data.tips.map((tip, index) => (
                <BulletListItem key={index} item={tip} index={index} />
              ))}
            </View>
          </Section>
        ) : null}

        {/* Video Tutorial Section */}
        {data.video_url ? (
          <Section title="Video Tutorial" icon="🎥">
            <View className="mx-6">
              <VideoPlayer
                youtubeUrl={data.video_url}
                thumbnailUrl={data.video_url}
              />
            </View>
          </Section>
        ) : null}

        {/* Cooking Steps Section */}
        <Section title="Cooking Steps" icon="👨‍🍳">
          <View className="space-y-4">
            {data.steps.length > 0 ? (
              data.steps.map((step, index) => (
                <StepItem key={index} step={step} index={index} />
              ))
            ) : (
              <View className="mx-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <Text className="text-gray-500 text-base">No cooking steps available</Text>
              </View>
            )}
          </View>
        </Section>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
