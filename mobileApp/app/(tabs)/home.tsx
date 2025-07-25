import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Dropdown from "../../components/Dropdown";
import UploadButton from "../../components/UploadButton";
import SubmitButton from "../../components/SubmitButton";
import IngredientsEditor from "../../components/IngredientsEditor";
export default function HomePage() {
  const router = useRouter();
  const [detectedIngredients, setDetectedIngredients] = useState(
    "Chicken, Brocoli, Garlic",
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Dropdown states
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [dietOpen, setDietOpen] = useState(false);
  const [foodTypeOpen, setFoodTypeOpen] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState("Select");
  const [selectedDiet, setSelectedDiet] = useState("Select");
  const [selectedFoodType, setSelectedFoodType] = useState("Select");

  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const dietOptions = [
    "None",
    "Vegan",
    "Vegetarian",
    "Keto",
    "Halal",
    "Kosher",
  ];
  const foodTypeOptions = [
    "Random",
    "Western",
    "Asian",
    "Indonesian",
    "Middle Eastern",
    "Indian",
    "Fusion",
  ];

  const handleImageSelected = (imageUri: string) => {
    setSelectedImage(imageUri);
    // Simulate ingredient detection from image
    setDetectedIngredients("Chicken, Broccoli, Garlic, Onion");
    console.log("Image selected:", imageUri);
  };

  const handleIngredientsChange = (ingredients: string) => {
    setDetectedIngredients(ingredients);
  };

  const handleSubmit = () => {
    console.log("Submit pressed with:", {
      detectedIngredients,
      difficulty: selectedDifficulty,
      diet: selectedDiet,
      foodType: selectedFoodType,
      selectedImage,
    });
    // Navigate to recipe result page
    router.push("/(tabs)/recipe-result");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[412px] mx-auto bg-white rounded-[30px] min-h-screen">
          {/* Header */}
          <View className="w-full h-[80px] bg-white flex-row items-center justify-center px-[35px] pt-10 pb-0">
            <Text
              className="text-[#171412] text-xl font-bold text-center"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              IngreDish
            </Text>
          </View>

          {/* Main Content */}
          <View className="px-6 pt-[40px]">
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
              <View className="mb-6">
                <Dropdown
                  label="Difficulty"
                  value={selectedDifficulty}
                  options={difficultyOptions}
                  isOpen={difficultyOpen}
                  setIsOpen={setDifficultyOpen}
                  onSelect={setSelectedDifficulty}
                />
              </View>
              <View className="mb-6">
                <Dropdown
                  label="Diet Option"
                  value={selectedDiet}
                  options={dietOptions}
                  isOpen={dietOpen}
                  setIsOpen={setDietOpen}
                  onSelect={setSelectedDiet}
                />
              </View>
              <View className="mb-6">
                <Dropdown
                  label="Food Type"
                  value={selectedFoodType}
                  options={foodTypeOptions}
                  isOpen={foodTypeOpen}
                  setIsOpen={setFoodTypeOpen}
                  onSelect={setSelectedFoodType}
                />
              </View>
            </View>

            {/* Submit Button */}
            <SubmitButton onSubmit={handleSubmit} />
          </View>

          {/* Bottom Navigation Space */}
          <View className="h-20" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
