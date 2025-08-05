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
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
        initialRouteName="index"
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(root)"
          options={{
            headerShown: false,
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
            gestureEnabled: true
          }}
        />
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
