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
          className="w-[100px] h-[32px] bg-white rounded-[20px] border border-black flex-row items-center justify-between px-3"
        >
          <Text
            className="text-black text-sm flex-1"
            style={{ fontFamily: "Plus Jakarta Sans" }}
            numberOfLines={1}
          >
            {value}
          </Text>
          <Text className="text-black text-xs">⌄</Text>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View className="absolute top-10 right-0 w-[100px] bg-white border border-black rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-3 py-2 border-b border-black"
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
