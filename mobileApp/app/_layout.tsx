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
          // Add better animation and navigation options for standalone builds
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            // Ensure this is treated as the initial route
            initialParams: {}
          }}
        />
        <Stack.Screen
          name="(root)"
          options={{
            headerShown: false,
            // Ensure proper nesting
            presentation: 'card'
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            title: 'Home'
          }}
        />
        <Stack.Screen
          name="recipe-result"
          options={{
            headerShown: false,
            title: 'Recipe Result',
            // Allow going back
            gestureEnabled: true
          }}
        />
        {/* Catch-all route for unmatched paths */}
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false,
            title: 'Not Found'
          }}
        />
      </Stack>
    </RecipeProvider>
  );
}
