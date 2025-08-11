import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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
  const buttonScale = useSharedValue(1);
  const rotateArrow = useSharedValue(0);

  React.useEffect(() => {
    rotateArrow.value = withSpring(isOpen ? 180 : 0);
  }, [isOpen]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateArrow.value}deg` }],
  }));

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleButtonPress = () => {
    buttonScale.value = withSpring(0.98, { duration: 100 });
    setTimeout(() => {
      buttonScale.value = withSpring(1, { duration: 100 });
    }, 100);
    setIsOpen(!isOpen);
  };

  return (
    <View style={{ position: 'relative', zIndex: isOpen ? 1000 : 1 }}>
      {/* Dropdown Button */}
      <Animated.View style={animatedButtonStyle}>
        <TouchableOpacity
          onPress={handleButtonPress}
          className={`
            bg-gray-50 border-2 rounded-xl p-3 flex-row items-center justify-between
            ${isOpen ? "border-orange-300 bg-orange-50" : "border-gray-200"}
          `}
          activeOpacity={0.7}
        >
          <Text
            className={`
              text-sm flex-1
              ${value === "Select" ? "text-gray-400" : "text-gray-800 font-medium"}
            `}
            style={{ fontFamily: "Plus Jakarta Sans" }}
            numberOfLines={1}
          >
            {value === "Select" ? "Choose option..." : value}
          </Text>

          <Animated.View style={animatedArrowStyle} className="ml-2">
            <Text
              className={`text-base ${
                isOpen ? "text-orange-500" : "text-gray-400"
              }`}
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              ▼
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* Dropdown Menu - Fixed to stay within parent container */}
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            left: -24, // Align with parent card padding
            right: -24, // Align with parent card padding
            marginTop: 4,
            marginHorizontal: 24, // Match parent card padding
            zIndex: 99999,
            elevation: 99999,
            backgroundColor: 'white',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <View style={{ paddingVertical: 4 }}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginHorizontal: 6,
                  marginVertical: 1,
                  borderRadius: 8,
                  backgroundColor: value === option ? '#FED7AA' : 'transparent',
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: value === option ? '#EA580C' : '#374151',
                    fontWeight: value === option ? '600' : '400',
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
