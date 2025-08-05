import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../services/aiService";

interface UploadButtonProps {
  onImageSelected: (ingredients: string) => void;
}

export default function UploadButton({ onImageSelected }: UploadButtonProps) {
  const handleUploadImage = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!",
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images' as any, // Fallback approach
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;

        // Show loading state
        Alert.alert("Processing", "Analyzing image...");

        // Use the aiService uploadImage function
        const formattedIngredients = await uploadImage(imageUri);

        onImageSelected(formattedIngredients);
        Alert.alert("Success", "Image analyzed successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      // Use the error message from aiService
      const errorMessage = error instanceof Error ? error.message : "Failed to upload the image.";
      Alert.alert("Upload Failed", errorMessage);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleUploadImage}
      className="w-full h-[47px] mb-6"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <View className="w-full h-[47px] bg-[#F09642] rounded-[15px] flex-row items-center justify-center">
        {/* LEFT SIDE ICON - Upload icon */}
        <Image
          source={require("../assets/icons/upload.png")}
          style={{ width: 24, height: 24, marginRight: 8 }}
          resizeMode="contain"
        />

        {/* TEXT SECTION */}
        <Text
          className="text-black text-base font-bold"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Upload Image
        </Text>

        {/* RIGHT SIDE ICON - Add additional icon here if needed */}
        {/* Example:
        <Image
          source={require("../assets/icons/arrow-up.svg")}
          className="w-5 h-5 ml-2"
          resizeMode="contain"
        />
        */}
      </View>
    </TouchableOpacity>
  );
}
