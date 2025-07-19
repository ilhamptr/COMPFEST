import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header globally
      }}
    >
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="recipe" options={{ headerShown: false }} />
    </Stack>
  );
}
