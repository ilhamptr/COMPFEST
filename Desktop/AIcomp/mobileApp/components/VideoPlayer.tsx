import React from "react";
import { View, TouchableOpacity, Image, Linking } from "react-native";

interface VideoPlayerProps {
  youtubeUrl?: string;
  thumbnailUrl: string;
  width?: string;
  height?: number;
}

export default function VideoPlayer({
  youtubeUrl = "https://youtu.be/3ARC8-JMQEU?si=iD31iXInO7LEpSmy", // Default placeholder URL
  thumbnailUrl,
  width = "w-full",
  height = 201,
}: VideoPlayerProps) {
  const handleVideoPress = async () => {
    try {
      // Open YouTube URL in external browser/app
      await Linking.openURL(youtubeUrl);
    } catch (error) {
      console.error("Failed to open YouTube URL:", error);
    }
  };

  return (
    <TouchableOpacity
      className={`${width} rounded-xl relative`}
      style={{
        backgroundColor: "#171412",
        height: height,
      }}
      onPress={handleVideoPress}
    >
      <Image
        source={{ uri: thumbnailUrl }}
        className="w-full h-full rounded-xl"
        resizeMode="cover"
      />
      {/* Play Button Overlay */}
      <View className="absolute inset-0 items-center justify-center">
        <View className="w-16 h-16 items-center justify-center rounded-full bg-black/40">
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/d835a223fad99b5fcd8849f2a4e98450c0b8fea0?width=48",
            }}
            className="w-6 h-6"
            style={{ tintColor: "white" }}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
