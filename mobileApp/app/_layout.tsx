import React from 'react';
import { Stack } from 'expo-router';
import { RecipeProvider } from '../contexts/RecipeContext';
import './globals.css';

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="recipe-result" options={{ headerShown: false }} />
      </Stack>
    </RecipeProvider>
  );
}
