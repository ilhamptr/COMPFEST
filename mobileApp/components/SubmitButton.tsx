import React from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

interface SubmitButtonProps {
  onSubmit: () => void;
  title?: string;
  showConfirmation?: boolean;
  isLoading?: boolean;
}

export default function SubmitButton({
  onSubmit,
  title = "Submit",
  showConfirmation = true,
  isLoading = false,
}: SubmitButtonProps) {
  const handleSubmit = () => {
    if (isLoading) return; // Prevent multiple submissions while loading

    if (showConfirmation) {
      Alert.alert(
        "Confirm Submission",
        "Are you sure you would like to submit?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Submit",
            style: "default",
            onPress: onSubmit,
          },
        ],
      );
    } else {
      onSubmit();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className="w-full mb-8 h-[47px]"
      disabled={isLoading}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <View className={`flex-1 rounded-xl items-center justify-center flex-row ${isLoading ? 'bg-[#D4A574]' : 'bg-[#F4A24F]'}`}>
        {isLoading ? (
          <>
            <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
            <Text
              className="text-white text-base font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Generating Recipe...
            </Text>
          </>
        ) : (
          <Text
            className="text-white text-base font-semibold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
