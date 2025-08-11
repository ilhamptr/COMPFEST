import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Dropdown from "../components/Dropdown";
import UploadButton from "../components/UploadButton";
import SubmitButton from "../components/SubmitButton";
import IngredientsEditor from "../components/IngredientsEditor";
import { generateRecipe, pingServer } from "../services/aiService";
import { useRecipe } from "../contexts/RecipeContext";

export default function HomePage() {
  const router = useRouter();
  const { setRecipeData, isLoading, setIsLoading } = useRecipe();
  const [detectedIngredients, setDetectedIngredients] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Select");
  const [selectedDiet, setSelectedDiet] = useState("Select");
  const [selectedFoodType, setSelectedFoodType] = useState("Select");

  const options = {
    difficulty: ["Easy", "Medium", "Hard"],
    diet: ["None", "Vegan", "Vegetarian", "Keto", "Halal", "Kosher"],
    foodType: ["Random", "Western", "Asian", "Indonesian", "Middle Eastern", "Indian", "Fusion"]
  };

  const handleDropdownToggle = (dropdownName: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownName : null);
  };

  const getRandomFoodType = () => {
    const nonRandomOptions = options.foodType.filter(type => type !== "Random");
    return nonRandomOptions[Math.floor(Math.random() * nonRandomOptions.length)].toLowerCase();
  };

  const formatIngredients = (ingredients: string) => {
    return ingredients
      .split(',')
      .map((ingredient, index) => `${index + 1}. ${ingredient.trim()}`)
      .join('\n');
  };

  const handleImageSelected = (recognizedIngredients: string) => {
    // Update the detected ingredients with AI-recognized content
    console.log("handleImageSelected called with:", recognizedIngredients);
    setDetectedIngredients(recognizedIngredients);
    console.log("AI recognized ingredients:", recognizedIngredients);
  };

  const handleIngredientsChange = (ingredients: string) => {
    setDetectedIngredients(ingredients);
  };

  const handleSubmit = async () => {
    console.log("Submit pressed with:", {
      detectedIngredients,
      difficulty: selectedDifficulty,
      diet: selectedDiet,
      foodType: selectedFoodType,
      selectedImage,
    });

    // Ensure loading state is set immediately
    setIsLoading(true);

    try {
      const finalFoodType = selectedFoodType === "Random" ? getRandomFoodType() : selectedFoodType.toLowerCase();

      console.log("Starting API call...");
      const recipeData = await generateRecipe({
        diet: selectedDiet === "None" ? "no special diet" : selectedDiet.toLowerCase(),
        type: finalFoodType,
        difficulty: selectedDifficulty.toLowerCase(),
        ingredients: formatIngredients(detectedIngredients)
      });

      console.log("Recipe generated successfully:", recipeData);

      // Store the recipe data in context - extract the actual data from the nested response
      const actualRecipeData = recipeData?.data?.data || recipeData?.data || recipeData;
      console.log("Storing recipe data:", actualRecipeData);
      setRecipeData(actualRecipeData);

      console.log("Navigating to recipe result...");
      // Navigate to recipe result page
      router.push("/recipe-result");
    } catch (error) {
      console.error("Failed to generate recipe:", error);

      // Show user-friendly error message
      Alert.alert(
        "Connection Error",
        "Unable to generate recipe. Please check your internet connection and try again.",
        [{ text: "OK" }]
      );
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  };

  // Debug function - simple network test
  const handleNetworkTest = async () => {
    try {
      const result = await pingServer();
      Alert.alert(
        "Network Test",
        `${result.message}\nStatus: ${result.status}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Network Test Failed", "Unable to reach server");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8E1]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 min-h-screen">
          {/* Enhanced Header */}
          <View className="relative bg-[#F4A24F] pt-12 pb-8">
            {/* Background Pattern */}
            <View className="absolute inset-0 opacity-10">
              <View className="absolute top-4 left-8 w-16 h-16 bg-white rounded-full" />
              <View className="absolute top-12 right-12 w-12 h-12 bg-white rounded-full" />
              <View className="absolute bottom-4 left-16 w-8 h-8 bg-white rounded-full" />
            </View>

            {/* Header Content */}
            <View className="relative z-10 px-6">
              <View className="flex-row items-center justify-between mb-2">
                <TouchableOpacity
                  onPress={handleNetworkTest}
                  className="bg-white/20 rounded-full p-2 backdrop-blur-sm"
                >
                  <Text className="text-white text-xs">🔧</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <Image
                    source={{ uri: "https://api.builder.io/api/v1/image/assets/TEMP/7ffac22e335e57812d4cc4931a6572d9f3904662?width=48" }}
                    className="w-5 h-5"
                    alt="Settings"
                  />
                </TouchableOpacity>
              </View>

              <Text
                className="text-white text-3xl font-bold text-center mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                IngreDish
              </Text>

              <Text
                className="text-white/90 text-base text-center font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                AI-Powered Recipe Generator
              </Text>
            </View>
          </View>

          {/* Main Content Container */}
          <View className="flex-1 px-6 -mt-4 relative z-10">
            {/* Welcome Card */}
            <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
              <Text
                className="text-[#171412] text-2xl font-bold text-center mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                What's on the menu today?
              </Text>
              <Text
                className="text-gray-500 text-center text-sm leading-5"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Upload ingredients or select preferences to get personalized recipes
              </Text>
            </View>

            {/* Upload Section */}
            <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
              <Text
                className="text-[#171412] text-lg font-semibold mb-4"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                📸 Scan Your Ingredients
              </Text>
              <UploadButton onImageSelected={handleImageSelected} />
            </View>

            {/* Ingredients Editor */}
            <View className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-6">
              <IngredientsEditor
                ingredients={detectedIngredients}
                onSave={handleIngredientsChange}
              />
            </View>

            {/* Recipe Preferences - Dynamic background expansion tailored to option count */}
            <View
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6"
              style={{
                paddingBottom: openDropdown === 'difficulty' ? 24 : // 3 options - normal padding
                              openDropdown === 'diet' ? 200 : // 6 options - reduced expansion
                              openDropdown === 'foodType' ? 240 : 24, // 7 options - reduced expansion
                overflow: 'visible',
                zIndex: 1
              }}
            >
              <Text
                className="text-[#171412] text-lg font-semibold mb-6"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                🎯 Recipe Preferences
              </Text>

              {/* Difficulty Level */}
              <View className="mb-8">
                <Text
                  className="text-[#171412] text-base font-medium mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  ⚡ Difficulty Level
                </Text>
                <Dropdown
                  label=""
                  value={selectedDifficulty}
                  options={options.difficulty}
                  isOpen={openDropdown === 'difficulty'}
                  setIsOpen={(open) => handleDropdownToggle('difficulty', open)}
                  onSelect={setSelectedDifficulty}
                />
              </View>

              {/* Dietary Preference */}
              <View className="mb-8">
                <Text
                  className="text-[#171412] text-base font-medium mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  🥗 Dietary Preference
                </Text>
                <Dropdown
                  label=""
                  value={selectedDiet}
                  options={options.diet}
                  isOpen={openDropdown === 'diet'}
                  setIsOpen={(open) => handleDropdownToggle('diet', open)}
                  onSelect={setSelectedDiet}
                />
              </View>

              {/* Cuisine Type */}
              <View className="mb-0">
                <Text
                  className="text-[#171412] text-base font-medium mb-3"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  🌍 Cuisine Type
                </Text>
                <Dropdown
                  label=""
                  value={selectedFoodType}
                  options={options.foodType}
                  isOpen={openDropdown === 'foodType'}
                  setIsOpen={(open) => handleDropdownToggle('foodType', open)}
                  onSelect={setSelectedFoodType}
                />
              </View>
            </View>

            {/* Submit Button - moved to bottom after all dropdowns */}
            <SubmitButton onSubmit={handleSubmit} isLoading={isLoading} />

            {/* Bottom Spacing */}
            <View className="h-24" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}