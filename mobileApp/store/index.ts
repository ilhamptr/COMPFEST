// Global state management using Zustand

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";
import { Recipe } from "../types/recipe";

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Recipe Store
interface RecipeState {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  currentRecipe: Recipe | null;
  searchResults: Recipe[];
  isLoading: boolean;
  error: string | null;
  searchFilters: any;
  setRecipes: (recipes: Recipe[]) => void;
  setFavoriteRecipes: (recipes: Recipe[]) => void;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  setSearchResults: (results: Recipe[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchFilters: (filters: any) => void;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
  clearSearchResults: () => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: [],
      favoriteRecipes: [],
      currentRecipe: null,
      searchResults: [],
      isLoading: false,
      error: null,
      searchFilters: {},
      setRecipes: (recipes) => set({ recipes }),
      setFavoriteRecipes: (favoriteRecipes) => set({ favoriteRecipes }),
      setCurrentRecipe: (currentRecipe) => set({ currentRecipe }),
      setSearchResults: (searchResults) => set({ searchResults }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSearchFilters: (searchFilters) => set({ searchFilters }),
      addToFavorites: (recipe) => {
        const current = get().favoriteRecipes;
        if (!current.find((r) => r.id === recipe.id)) {
          set({ favoriteRecipes: [...current, recipe] });
        }
      },
      removeFromFavorites: (recipeId) => {
        const current = get().favoriteRecipes;
        set({ favoriteRecipes: current.filter((r) => r.id !== recipeId) });
      },
      clearSearchResults: () => set({ searchResults: [] }),
    }),
    {
      name: "recipe-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteRecipes: state.favoriteRecipes }),
    },
  ),
);

// Shopping List Store
interface ShoppingListState {
  items: any[];
  completedItems: string[];
  isLoading: boolean;
  error: string | null;
  setItems: (items: any[]) => void;
  addItem: (item: any) => void;
  removeItem: (itemId: string) => void;
  toggleItem: (itemId: string) => void;
  clearList: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set, get) => ({
      items: [],
      completedItems: [],
      isLoading: false,
      error: null,
      setItems: (items) => set({ items }),
      addItem: (item) => {
        const current = get().items;
        set({ items: [...current, { ...item, id: Date.now().toString() }] });
      },
      removeItem: (itemId) => {
        const current = get().items;
        const completed = get().completedItems;
        set({
          items: current.filter((item) => item.id !== itemId),
          completedItems: completed.filter((id) => id !== itemId),
        });
      },
      toggleItem: (itemId) => {
        const completed = get().completedItems;
        if (completed.includes(itemId)) {
          set({ completedItems: completed.filter((id) => id !== itemId) });
        } else {
          set({ completedItems: [...completed, itemId] });
        }
      },
      clearList: () => set({ items: [], completedItems: [] }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "shopping-list-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Cooking Session Store
interface CookingSessionState {
  activeSession: any | null;
  currentStep: number;
  completedSteps: string[];
  sessionHistory: any[];
  isLoading: boolean;
  error: string | null;
  setActiveSession: (session: any | null) => void;
  setCurrentStep: (step: number) => void;
  addCompletedStep: (stepId: string) => void;
  addToHistory: (session: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  endSession: () => void;
}

export const useCookingSessionStore = create<CookingSessionState>()(
  persist(
    (set, get) => ({
      activeSession: null,
      currentStep: 0,
      completedSteps: [],
      sessionHistory: [],
      isLoading: false,
      error: null,
      setActiveSession: (activeSession) => set({ activeSession }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      addCompletedStep: (stepId) => {
        const current = get().completedSteps;
        if (!current.includes(stepId)) {
          set({ completedSteps: [...current, stepId] });
        }
      },
      addToHistory: (session) => {
        const current = get().sessionHistory;
        set({ sessionHistory: [session, ...current] });
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      endSession: () =>
        set({
          activeSession: null,
          currentStep: 0,
          completedSteps: [],
        }),
    }),
    {
      name: "cooking-session-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ sessionHistory: state.sessionHistory }),
    },
  ),
);

// App Settings Store
interface AppSettingsState {
  theme: "light" | "dark" | "auto";
  language: string;
  measurementSystem: "metric" | "imperial";
  notifications: {
    recipeSuggestions: boolean;
    mealReminders: boolean;
    shoppingListUpdates: boolean;
  };
  setTheme: (theme: "light" | "dark" | "auto") => void;
  setLanguage: (language: string) => void;
  setMeasurementSystem: (system: "metric" | "imperial") => void;
  updateNotifications: (
    notifications: Partial<AppSettingsState["notifications"]>,
  ) => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      theme: "auto",
      language: "en",
      measurementSystem: "metric",
      notifications: {
        recipeSuggestions: true,
        mealReminders: true,
        shoppingListUpdates: true,
      },
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setMeasurementSystem: (measurementSystem) => set({ measurementSystem }),
      updateNotifications: (updates) => {
        const current = get().notifications;
        set({ notifications: { ...current, ...updates } });
      },
    }),
    {
      name: "app-settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
