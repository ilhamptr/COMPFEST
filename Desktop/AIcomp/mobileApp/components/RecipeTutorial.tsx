import React from "react";
import { View, Text } from "react-native";
import VideoPlayer from "./VideoPlayer";

interface RecipeTutorialProps {
  youtubeUrl: string;
  thumbnailUrl: string;
}

export default function RecipeTutorial({
  youtubeUrl,
  thumbnailUrl,
}: RecipeTutorialProps) {
  return (
    <>
      {/* Recipe Tutorial Section Header */}
      <View className="px-4 pt-5 pb-3">
        <Text
          className="text-[#171412] text-[22px] font-bold"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
        >
          Recipe Tutorial
        </Text>
      </View>

      {/* Video Player */}
      <View className="px-4 pb-6">
        <VideoPlayer youtubeUrl={youtubeUrl} thumbnailUrl={thumbnailUrl} />
      </View>
    </>
  );
}
