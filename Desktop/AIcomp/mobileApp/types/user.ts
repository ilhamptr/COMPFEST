// User-related TypeScript interfaces and types

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences: UserPreferences;
  dietaryRestrictions: string[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  favoriteRecipes: string[];
  createdRecipes: string[];
  shoppingLists: ShoppingList[];
  cookingHistory: CookingSession[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  cuisine: string[];
  maxPrepTime: number;
  maxCookTime: number;
  servingSize: number;
  difficulty: string[];
  notifications: NotificationSettings;
  measurementSystem: "metric" | "imperial";
  language: string;
  theme: "light" | "dark" | "auto";
}

export interface NotificationSettings {
  recipeSuggestions: boolean;
  mealReminders: boolean;
  shoppingListUpdates: boolean;
  communityUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  recipeIds: string[];
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  isCompleted: boolean;
  price?: number;
  store?: string;
}

export interface CookingSession {
  id: string;
  recipeId: string;
  startTime: string;
  endTime?: string;
  rating?: number;
  notes?: string;
  modifications?: string[];
  completedSteps: string[];
  photos?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}
