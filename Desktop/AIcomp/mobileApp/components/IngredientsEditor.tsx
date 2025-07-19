import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";

interface IngredientsEditorProps {
  ingredients: string;
  onSave: (ingredients: string) => void;
}

export default function IngredientsEditor({
  ingredients,
  onSave,
}: IngredientsEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(ingredients);

  const handleSave = () => {
    onSave(editableText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableText(ingredients); // Reset to original
    setIsEditing(false);
  };

  const handleEditPress = () => {
    setEditableText(ingredients); // Sync with current ingredients
    setIsEditing(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleEditPress}
        className="w-full h-[145px] mb-6 relative"
      >
        <View className="w-full h-full bg-white rounded-[16px] border border-[#BAB7B7] p-3">
          <Text
            className="text-black text-sm font-normal leading-[21px] mb-2"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Ingredients detected :
          </Text>
          <Text
            className="text-black text-sm font-normal leading-[21px] flex-1"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {ingredients}
          </Text>
          <View className="absolute bottom-2 right-2">
            <Text
              className="text-black text-sm font-light opacity-30"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              tap to edit...
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={isEditing} transparent={true} animationType="slide">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-[90%] bg-white rounded-lg p-4">
            <Text
              className="text-black text-lg font-bold mb-4"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Edit Ingredients
            </Text>
            <TextInput
              className="w-full h-[100px] bg-gray-50 rounded-[10px] border border-[#EEEBE9] p-3 text-[#070707] text-sm"
              style={{ fontFamily: "Plus Jakarta Sans" }}
              value={editableText}
              onChangeText={setEditableText}
              multiline={true}
              textAlignVertical="top"
            />
            <View className="flex-row justify-end mt-4 space-x-2">
              <TouchableOpacity
                onPress={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
              >
                <Text
                  className="text-black"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="px-4 py-2 bg-[#F09642] rounded-lg"
              >
                <Text
                  className="text-black font-bold"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
