// Recipe-related TypeScript interfaces and types

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  tools: Tool[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: NutritionData;
  tutorial?: Tutorial;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  authorId?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  required: boolean;
  alternatives?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: "protein" | "vegetable" | "grain" | "dairy" | "spice" | "other";
  substitutes?: string[];
  image?: string;
}

export interface Instruction {
  id: string;
  step: number;
  title: string;
  description: string;
  duration?: number; // minutes
  temperature?: number; // celsius
  image?: string;
  video?: string;
  tips?: string[];
}

export interface NutritionData {
  calories: number;
  protein: number; // grams
  carbohydrates: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
  cholesterol?: number; // mg
}

export interface Tutorial {
  id: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: number; // seconds
  chapters?: TutorialChapter[];
}

export interface TutorialChapter {
  id: string;
  title: string;
  startTime: number; // seconds
  endTime: number; // seconds
  description?: string;
}

export interface RecipeFilter {
  cuisine?: string[];
  difficulty?: string[];
  maxPrepTime?: number;
  maxCookTime?: number;
  dietary?: string[]; // vegetarian, vegan, gluten-free, etc.
  ingredients?: string[];
  excludeIngredients?: string[];
}

export interface RecipeSearchParams {
  query?: string;
  filters?: RecipeFilter;
  sortBy?: "relevance" | "rating" | "prepTime" | "cookTime" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
