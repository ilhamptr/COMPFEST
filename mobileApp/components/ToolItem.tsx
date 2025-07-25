import React from "react";
import { View, Text } from "react-native";
import { SymbolView } from "expo-symbols";

interface ToolItemProps {
  iconName: string;
  name: string;
  width?: string;
}

const getSymbolName = (toolName: string): string => {
  switch (toolName.toLowerCase()) {
    case 'pan':
      return 'frying.pan';
    case 'knife':
      return 'scissors';
    case 'cutting board':
      return 'square.on.square';
    default:
      return 'gear';
  }
};

export default function ToolItem({
  iconName,
  name,
  width = "flex-1",
}: ToolItemProps) {
  const symbolName = getSymbolName(name);

  return (
    <View
      className={`${width} p-4 rounded-lg border border-[#E3E0DE] bg-white flex-row items-center gap-3`}
    >
      <SymbolView
        name={symbolName}
        size={24}
        tintColor="#171412"
      />
      <Text
        className="text-[#171412] text-base font-bold"
        style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 20 }}
      >
        {name}
      </Text>
    </View>
  );
}
