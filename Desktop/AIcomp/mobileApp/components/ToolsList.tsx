import React from "react";
import { View, Text } from "react-native";
import ToolItem from "./ToolItem";

interface Tool {
  icon: string;
  name: string;
  width?: string;
}

interface ToolsListProps {
  tools: Tool[];
}

export default function ToolsList({ tools }: ToolsListProps) {
  return (
    <>
      {/* Tools Section Header */}
      <View className="px-4 pt-5 pb-3">
        <Text
          className="text-[#171412] text-[22px] font-bold"
          style={{ fontFamily: "Plus Jakarta Sans", lineHeight: 28 }}
        >
          Tools
        </Text>
      </View>

      {/* Tools Grid */}
      <View className="px-4 pb-4">
        {/* First row of tools */}
        <View className="flex-row gap-3 mb-3">
          {tools.slice(0, 2).map((tool, index) => (
            <ToolItem
              key={index}
              icon={tool.icon}
              name={tool.name}
              width={tool.width}
            />
          ))}
        </View>

        {/* Second row of tools */}
        {tools.length > 2 && (
          <View className="flex-row">
            {tools.slice(2).map((tool, index) => (
              <ToolItem
                key={index + 2}
                icon={tool.icon}
                name={tool.name}
                width={tool.width}
              />
            ))}
          </View>
        )}
      </View>
    </>
  );
}
