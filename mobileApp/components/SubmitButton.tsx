import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

interface SubmitButtonProps {
  onSubmit: () => void;
  title?: string;
  showConfirmation?: boolean;
}

export default function SubmitButton({
  onSubmit,
  title = "Submit",
  showConfirmation = true,
}: SubmitButtonProps) {
  const handleSubmit = () => {
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
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <View className="w-full h-[47px] bg-[#F4A24F] rounded-[20px] items-center justify-center">
        <Text
          className="text-black text-xl font-bold"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
