import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

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

        // Prepare the image for upload using React Native FormData
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "upload.jpg",
          type: "image/jpeg",
        } as any);

        // Send the image to the AI server
        const response = await axios.post(
          "http://15.235.185.245/upload-image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 30000, // 30 second timeout
          },
        );

        // Extract AI response and pass it to the input field
        const rawIngredients = response.data.data?.content || response.data.content || response.data.recognized_text || response.data.recognizedText || "";
        console.log("Raw AI response:", rawIngredients);

        // Convert numbered list to comma-separated format
        const formattedIngredients = rawIngredients
          .split('\n')
          .map(line => line.replace(/^\d+\.\s*/, '').trim()) // Remove number and dot
          .filter(line => line.length > 0) // Remove empty lines
          .join(', '); // Join with commas

        console.log("Formatted ingredients:", formattedIngredients);
        onImageSelected(formattedIngredients);

        Alert.alert("Success", "Image analyzed successfully!");
        console.log("Server Response:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      let errorMessage = "Failed to upload the image.";
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }

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
