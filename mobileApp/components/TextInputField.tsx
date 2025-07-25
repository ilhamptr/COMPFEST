import React from "react";
import { View, TextInput } from "react-native";

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  onSubmitEditing?: () => void;
}

export default function TextInputField({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  onSubmitEditing,
}: TextInputFieldProps) {
  return (
    <View
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
      <TextInput
        className="w-full h-[47px] bg-white rounded-[15px] border border-[#EEEBE9] px-6 text-[#070707] text-sm"
        style={{ fontFamily: "Plus Jakarta Sans" }}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        returnKeyType="done"
      />
    </View>
  );
}
