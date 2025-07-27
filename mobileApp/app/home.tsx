import React, { useState } from "react";
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
import Dropdown from "../components/Dropdown";
import UploadButton from "../components/UploadButton";
import SubmitButton from "../components/SubmitButton";
import IngredientsEditor from "../components/IngredientsEditor";
import { generateRecipe } from "../services/aiService";
import { useRecipe } from "../contexts/RecipeContext";

export default function HomePage() {
  const router = useRouter();
  const { setRecipeData, isLoading, setIsLoading } = useRecipe();
  const [detectedIngredients, setDetectedIngredients] = useState(
    "Chicken, Brocoli, Garlic",
  );
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

  const handleImageSelected = (imageUri: string) => {
    setSelectedImage(imageUri);
    // Simulate ingredient detection from image
    setDetectedIngredients("Chicken, Broccoli, Garlic, Onion");
    console.log("Image selected:", imageUri);
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

    try {
      setIsLoading(true);
      const finalFoodType = selectedFoodType === "Random" ? getRandomFoodType() : selectedFoodType.toLowerCase();

      const recipeData = await generateRecipe({
        diet: selectedDiet === "None" ? "no special diet" : selectedDiet.toLowerCase(),
        type: finalFoodType,
        difficulty: selectedDifficulty.toLowerCase(),
        ingredients: formatIngredients(detectedIngredients)
      });

      console.log("Recipe generated successfully:", recipeData);

      // Store the recipe data in context - extract the actual data from the nested response
      // Your API structure is response.data.data.cook_time, so we need to go deeper
      const actualRecipeData = recipeData?.data?.data || recipeData?.data || recipeData;
      console.log("Storing recipe data:", actualRecipeData);
      setRecipeData(actualRecipeData);

      // Navigate to recipe result page
      router.push("/recipe-result");
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      // Handle error - maybe show an alert or error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[412px] mx-auto bg-[#FFF8E1] rounded-[30px] min-h-screen relative overflow-hidden">
          {/* Background Gradient Blobs */}
          <View className="absolute -left-[100px] -top-[50px] w-[400px] h-[400px] bg-[#FFE5A0] opacity-20 rounded-full" />
          <View className="absolute -left-[50px] top-[300px] w-[350px] h-[350px] bg-[#FFE5A0] opacity-15 rounded-full" />
          <View className="absolute -left-[20px] -top-[40px] w-[200px] h-[200px] bg-[#FFE5A0] opacity-25 rounded-full" />

          {/* Header */}
          <View className="w-full h-[80px] bg-transparent flex-row items-center justify-center px-[35px] pt-10 pb-0 relative z-10">
            <Text
              className="text-[#171412] text-xl font-bold text-center"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              IngreDish
            </Text>
            <TouchableOpacity className="absolute right-[35px] top-10">
              <Image
                source={{ uri: "https://api.builder.io/api/v1/image/assets/TEMP/7ffac22e335e57812d4cc4931a6572d9f3904662?width=48" }}
                className="w-6 h-6"
                alt="Gear Icon"
              />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View className="px-6 pt-[40px] relative z-10">
            {/* Title */}
            <Text
              className="text-black text-2xl font-bold text-center mb-6"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              What's on the menu today?
            </Text>

            {/* Upload Image Button */}
            <UploadButton onImageSelected={handleImageSelected} />

            {/* Ingredients Detected Section */}
            <IngredientsEditor
              ingredients={detectedIngredients}
              onSave={handleIngredientsChange}
            />

            {/* Options Section */}
            <View className="w-full mb-12">
              {[
                { key: 'difficulty', label: 'Difficulty', value: selectedDifficulty, setValue: setSelectedDifficulty },
                { key: 'diet', label: 'Diet Option', value: selectedDiet, setValue: setSelectedDiet },
                { key: 'foodType', label: 'Food Type', value: selectedFoodType, setValue: setSelectedFoodType }
              ].map(({ key, label, value, setValue }) => (
                <View key={key} className="mb-6">
                  <Dropdown
                    label={label}
                    value={value}
                    options={options[key as keyof typeof options]}
                    isOpen={openDropdown === key}
                    setIsOpen={(open) => handleDropdownToggle(key, open)}
                    onSelect={setValue}
                  />
                </View>
              ))}
            </View>

            {/* Submit Button */}
            <SubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
          </View>

          {/* Bottom Navigation Space */}
          <View className="h-20" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
