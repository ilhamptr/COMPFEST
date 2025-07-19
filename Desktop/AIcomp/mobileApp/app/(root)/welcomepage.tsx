import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import GetStartedButton from "../../components/GetStartedButton";

interface WelcomePageProps {
  onGetStarted?: () => void;
}

export default function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      console.log("Get Started pressed");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      <View className="max-w-[480px] w-full overflow-hidden mx-auto">
        <View className="w-full overflow-hidden pb-16">
          <Image
            source={require("../../assets/images/Image.png")}
            className="w-full aspect-[0.84]"
            resizeMode="contain"
          />

          <View className="flex items-center justify-center mt-8 min-h-[90px] gap-2.5 px-0 py-1">
            <View className="w-full max-w-[502px]">
              <Text
                className="text-center text-[#171412] text-6xl font-bold leading-tight"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                IngreDish
              </Text>
            </View>
          </View>

          <View className="flex items-center justify-center -mt-2 min-h-[74px] gap-2.5 px-4 py-3">
            <View className="w-full max-w-[334px]">
              <Text
                className="text-center text-[#171412] text-base leading-6"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                From ingredients to ideas{"\n"}AI helps you build better,
                balanced meals.
              </Text>
            </View>
          </View>

          <GetStartedButton onPress={handleGetStarted} />

          <View className="px-4 pt-1 pb-3">
            <Text
              className="text-center text-[#8C755E] text-sm"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              No account needed. Just tap and explore.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
