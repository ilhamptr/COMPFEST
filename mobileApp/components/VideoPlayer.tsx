import React from "react";
import { View, TouchableOpacity, Image, Linking } from "react-native";
import { getYouTubeThumbnail, DEFAULT_THUMBNAIL } from "../utils";

interface VideoPlayerProps {
  youtubeUrl?: string;
  thumbnailUrl?: string;
  width?: string;
  height?: number;
}

export default function VideoPlayer({
  youtubeUrl = "https://youtu.be/3ARC8-JMQEU?si=iD31iXInO7LEpSmy",
  thumbnailUrl,
  width = "w-full",
  height = 201,
}: VideoPlayerProps) {

  // Get the actual thumbnail URL using centralized utility
  const actualThumbnailUrl = getYouTubeThumbnail(youtubeUrl) || thumbnailUrl || DEFAULT_THUMBNAIL;

  const handleVideoPress = async () => {
    try {
      await Linking.openURL(youtubeUrl);
    } catch (error) {
      console.error("Failed to open YouTube URL:", error);
    }
  };

  return (
    <TouchableOpacity
      className={`${width} rounded-xl relative overflow-hidden`}
      style={{ backgroundColor: "#171412", height }}
      onPress={handleVideoPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: actualThumbnailUrl }}
        className="w-full h-full rounded-xl"
        resizeMode="cover"
      />

      <View className="absolute inset-0 bg-black/20 rounded-xl" />

      <View className="absolute inset-0 items-center justify-center">
        <View className="w-20 h-20 items-center justify-center rounded-full bg-red-600/90 shadow-lg">
          <Image
            source={require("../assets/icons/play.png")}
            style={{ width: 28, height: 28 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
