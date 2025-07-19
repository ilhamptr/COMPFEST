import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for all root screens
      }}
    >
      <Stack.Screen name="welcomepage" options={{ headerShown: false }} />
    </Stack>
  );
}
