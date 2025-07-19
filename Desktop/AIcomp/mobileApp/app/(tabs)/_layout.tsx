import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the header for all tab screens
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarStyle: { display: "none" }, // Hide the tab bar for welcome page
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="recipe-result"
        options={{
          title: "Recipe Result",
          tabBarStyle: { display: "none" }, // Hide the tab bar for recipe result page
        }}
      />
    </Tabs>
  );
}
