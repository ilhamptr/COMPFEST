import { Stack } from "expo-router";

export default function RecipeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the default header for all recipe screens
      }}
    >
      <Stack.Screen name="result" />
    </Stack>
  );
}
