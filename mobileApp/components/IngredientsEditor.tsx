import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log("IngredientsEditor: ingredients prop changed to:", ingredients);
    setEditableText(ingredients);
  }, [ingredients]);

  const handleSave = () => {
    onSave(editableText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableText(ingredients);
    setIsEditing(false);
  };

  const handleEditPress = () => {
    setEditableText(ingredients);
    setIsEditing(true);
  };

  return (
    <>
      {/* Main Ingredients Display */}
      <View className="p-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-gray-800 text-lg font-semibold"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            🥬 Detected Ingredients
          </Text>
          <TouchableOpacity
            onPress={handleEditPress}
            className="bg-orange-100 px-4 py-2 rounded-full"
            activeOpacity={0.7}
          >
            <Text
              className="text-orange-600 text-sm font-medium"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              ✏️ Edit
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 rounded-2xl p-4 min-h-[120px]">
          <Text
            className="text-gray-700 text-base leading-6"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {editableText ||
              "No ingredients detected yet. Upload an image to scan ingredients automatically."}
          </Text>
        </View>

        <Text
          className="text-gray-400 text-xs mt-2"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Tap 'Edit' to modify ingredients or add your own
        </Text>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditing}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCancel}
      >
        <View className="flex-1 bg-white">
          {/* Modal Header */}
          <View className="bg-gradient-to-r from-orange-400 to-amber-400 pt-12 pb-6 px-6">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-white/20 rounded-full px-4 py-2"
              >
                <Text className="text-white font-medium">Cancel</Text>
              </TouchableOpacity>

              <Text
                className="text-white text-xl font-bold"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Edit Ingredients
              </Text>

              <TouchableOpacity
                onPress={handleSave}
                className="bg-white rounded-full px-4 py-2"
              >
                <Text className="text-orange-600 font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal Content */}
          <View className="flex-1 p-6">
            <Text
              className="text-gray-800 text-base mb-4"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Modify your ingredients list. Separate each ingredient with a comma.
            </Text>

            <TextInput
              value={editableText}
              onChangeText={setEditableText}
              placeholder="Enter ingredients separated by commas..."
              multiline
              className="flex-1 bg-gray-50 rounded-2xl p-4 text-base"
              style={{
                fontFamily: "Plus Jakarta Sans",
                textAlignVertical: "top",
              }}
              placeholderTextColor="#9CA3AF"
            />

            <View className="mt-6 space-y-3">
              <Text
                className="text-gray-600 text-sm font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                💡 Tips:
              </Text>
              <Text
                className="text-gray-500 text-sm leading-5"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                • Use specific ingredient names (e.g., "chicken breast" instead of
                "chicken")
              </Text>
              <Text
                className="text-gray-500 text-sm leading-5"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                • Include quantities if you want more precise recipes
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
