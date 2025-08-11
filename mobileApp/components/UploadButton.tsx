import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../services/aiService";

interface UploadButtonProps {
  onImageSelected: (ingredients: string) => void;
}

export default function UploadButton({ onImageSelected }: UploadButtonProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUploadImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images' as any,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setIsAnalyzing(true);

        const formattedIngredients = await uploadImage(imageUri);
        onImageSelected(formattedIngredients);

        Alert.alert("✅ Success", "Image analyzed successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload the image.";
      Alert.alert("❌ Upload Failed", errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera is required!",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images' as any,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setIsAnalyzing(true);

        const formattedIngredients = await uploadImage(imageUri);
        onImageSelected(formattedIngredients);

        Alert.alert("✅ Success", "Photo analyzed successfully!");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to take photo.";
      Alert.alert("❌ Camera Failed", errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Add Image",
      "Choose how you'd like to add your ingredients image:",
      [
        {
          text: "📷 Take Photo",
          onPress: handleTakePhoto,
        },
        {
          text: "🖼️ Choose from Gallery",
          onPress: handleUploadImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  if (isAnalyzing) {
    return (
      <View className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
        <View className="items-center">
          <ActivityIndicator size="large" color="#F97316" className="mb-4" />
          <Text
            className="text-orange-600 text-base font-semibold text-center"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            🔍 Analyzing your ingredients...
          </Text>
          <Text
            className="text-orange-500 text-sm text-center mt-2"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            AI is identifying ingredients from your image
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={showImageOptions}
      className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-6"
      activeOpacity={0.7}
    >
      <View className="items-center">
        <View className="w-16 h-16 bg-orange-100 rounded-full items-center justify-center mb-4">
          <Image
            source={require("../assets/icons/upload.png")}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          />
        </View>

        <Text
          className="text-gray-800 text-lg font-semibold text-center mb-2"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Upload Ingredients Photo
        </Text>

        <Text
          className="text-gray-500 text-sm text-center leading-5"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Take a photo or select from gallery to automatically detect your available ingredients
        </Text>

        <View className="flex-row items-center mt-4 space-x-4">
          <View className="flex-row items-center">
            <Text className="text-orange-500 text-lg mr-1">📷</Text>
            <Text className="text-gray-600 text-sm">Camera</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-orange-500 text-lg mr-1">🖼️</Text>
            <Text className="text-gray-600 text-sm">Gallery</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
