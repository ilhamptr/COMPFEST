import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (value: string) => void;
}

export default function Dropdown({
  label,
  value,
  options,
  isOpen,
  setIsOpen,
  onSelect,
}: DropdownProps) {
  return (
    <View className="relative">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-black text-xl font-normal"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          {label}
          <Text className="font-bold"> : </Text>
        </Text>
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          className="w-[120px] h-[30px] bg-[#F1F1F1] rounded-[20px] flex-row items-center justify-between px-3"
        >
          <Text
            className="text-black text-sm"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {value}
          </Text>
          <View className="transform rotate-0">
            <Text className="text-black text-xs">▼</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View className="absolute top-10 right-0 w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-3 py-2 border-b border-gray-200"
            >
              <Text
                className="text-black text-sm"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
