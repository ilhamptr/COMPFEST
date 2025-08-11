import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  interpolateColor,
  runOnJS,
  withTiming
} from 'react-native-reanimated';

interface SubmitButtonProps {
  onSubmit: () => void;
  title?: string;
  showConfirmation?: boolean;
  isLoading?: boolean;
}

export default function SubmitButton({
  onSubmit,
  title = "Generate Recipe",
  showConfirmation = true,
  isLoading = false,
}: SubmitButtonProps) {
  const scale = useSharedValue(1);
  const pulseScale = useSharedValue(1);
  const loadingRotation = useSharedValue(0);

  // Pulse animation for the button when not loading
  useEffect(() => {
    if (!isLoading) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.005, { duration: 800 }), // Much faster and more subtle
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [isLoading]);

  // Loading animation
  useEffect(() => {
    if (isLoading) {
      loadingRotation.value = withRepeat(
        withSpring(360, { duration: 1000 }),
        -1,
        false
      );
    }
  }, [isLoading]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * pulseScale.value },
    ],
  }));

  const animatedLoadingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${loadingRotation.value}deg` }],
  }));

  const handleSubmit = () => {
    if (isLoading) return;

    // Button press animation
    scale.value = withSequence(
      withSpring(0.95, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );

    setTimeout(() => {
      if (showConfirmation) {
        Alert.alert(
          "Generate Recipe",
          "Ready to create your personalized recipe?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Generate",
              style: "default",
              onPress: onSubmit,
            },
          ],
        );
      } else {
        onSubmit();
      }
    }, 200);
  };

  return (
    <View className="px-6 mb-6"> {/* Removed z-10 to allow dropdowns above */}
      <Animated.View style={animatedButtonStyle}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          className={`
            w-full h-14 rounded-full flex-row items-center justify-center
            ${isLoading 
              ? 'bg-gray-300' 
              : 'bg-[#F4A24F] shadow-lg'
            }
          `}
          style={{
            shadowColor: "#F4A24F",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isLoading ? 0 : 0.3,
            shadowRadius: 8,
            elevation: isLoading ? 0 : 8,
          }}
          activeOpacity={isLoading ? 1 : 0.8}
        >
          {isLoading ? (
            <View className="flex-row items-center">
              <Animated.View style={animatedLoadingStyle}>
                <Text className="text-white text-lg mr-3">⚡</Text>
              </Animated.View>
              <Text
                className="text-white text-base font-semibold"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Generating Recipe...
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text
                className="text-white text-lg font-bold mr-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {title}
              </Text>
              <Text className="text-white text-xl">✨</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Helpful Text */}
      <Text
        className="text-gray-500 text-xs text-center mt-3"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        AI will analyze your ingredients and preferences
      </Text>
    </View>
  );
}
