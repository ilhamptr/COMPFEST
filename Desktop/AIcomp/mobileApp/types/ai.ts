// AI-related TypeScript interfaces and types

export interface AIRecipeRequest {
  ingredients: string[];
  excludeIngredients?: string[];
  cuisine?: string;
  dietary?: string[];
  maxPrepTime?: number;
  maxCookTime?: number;
  servings?: number;
  difficulty?: string;
  mealType?: "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
}

export interface AIRecipeResponse {
  recipe: Recipe;
  confidence: number;
  alternatives?: Recipe[];
  suggestions?: string[];
}

export interface IngredientRecognition {
  ingredients: DetectedIngredient[];
  confidence: number;
  processingTime: number;
}

export interface DetectedIngredient {
  name: string;
  confidence: number;
  category: string;
  boundingBox?: BoundingBox;
  alternatives?: string[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NutritionAnalysis {
  totalNutrition: NutritionData;
  perServing: NutritionData;
  healthScore: number;
  recommendations: string[];
  warnings?: string[];
}

export interface CookingAssistant {
  currentStep: number;
  totalSteps: number;
  estimatedTimeRemaining: number;
  suggestions: string[];
  warnings?: string[];
  nextAction?: string;
}

export interface VoiceCommand {
  command: string;
  intent:
    | "next_step"
    | "previous_step"
    | "repeat"
    | "timer"
    | "substitute"
    | "help";
  parameters?: Record<string, any>;
  confidence: number;
}

export interface RecipeModification {
  type:
    | "ingredient_substitute"
    | "serving_size"
    | "dietary_adaptation"
    | "cooking_method";
  original: string;
  modified: string;
  reason: string;
  confidence: number;
}

export interface SmartShoppingList {
  items: ShoppingListItem[];
  estimatedCost: number;
  alternatives: ShoppingAlternative[];
  storeRecommendations: StoreRecommendation[];
}

export interface ShoppingAlternative {
  originalItem: string;
  alternative: string;
  costSaving: number;
  reason: string;
}

export interface StoreRecommendation {
  storeName: string;
  distance: number;
  estimatedCost: number;
  availability: number; // percentage of items available
}

export interface MealPlanSuggestion {
  day: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks?: Recipe[];
  };
  totalNutrition: NutritionData;
  shoppingList: ShoppingListItem[];
  prepTime: number;
}

// Import Recipe type from recipe.ts
import { Recipe, NutritionData, ShoppingListItem } from "./recipe";
