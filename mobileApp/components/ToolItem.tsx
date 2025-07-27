import React from "react";
import { View, Text } from "react-native";
import { SymbolView } from "expo-symbols";

interface ToolItemProps {
  iconName: string;
  name: string;
  width?: string;
}

// Use the iconName prop directly instead of trying to map from name
export default function ToolItem({
  iconName,
  name,
  width = "flex-1",
}: ToolItemProps) {
  // Provide a fallback for invalid symbol names
  const getValidSymbolName = (symbolName: string) => {
    const validSymbols = [
      'frying.pan',
      'scissors',
      'square.on.square',
      'pot',
      'bowl',
      'wrench.and.screwdriver',
      'questionmark',
      'gear'
    ];

    return validSymbols.includes(symbolName) ? symbolName : 'wrench.and.screwdriver';
  };

  return (
    <View
      className={`${width} p-4 rounded-lg border border-[#E3E0DE] bg-white flex-row items-center gap-3`}
    >
      <SymbolView
        name={getValidSymbolName(iconName) as any}
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
