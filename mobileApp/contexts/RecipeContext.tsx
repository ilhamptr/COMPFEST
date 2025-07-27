import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RecipeData {
  name?: string;
  recipe_name?: string;
  image_url?: string;
  tools?: string[];
  ingredients?: string[] | Array<{ name: string; quantity: string; }>;
  nutrition?: {
    calories?: number;
    protein?: string;
    carbohydrates?: string;
    fats?: string;
  };
  cook_time?: string;
  difficulty?: string;
  servings?: number;
  instructions?: string[];
  steps?: string[];
  tips?: string[];
  youtube_url?: string;
  thumbnail_url?: string;
  food_type?: string;
  diet?: string;
  prep_time?: string;
  video_data?: Array<{ title: string; url: string; }>;
  // Allow for additional fields from AI response
  [key: string]: any;
}

interface RecipeContextType {
  recipeData: RecipeData | null;
  setRecipeData: (data: RecipeData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <RecipeContext.Provider value={{ recipeData, setRecipeData, isLoading, setIsLoading }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}
