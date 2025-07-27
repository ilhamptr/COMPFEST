import React from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface UploadButtonProps {
  onImageSelected: (imageUri: string) => void;
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
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
