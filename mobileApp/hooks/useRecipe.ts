// React hooks for recipe data fetching and management

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeService } from "../services/recipeService";
import { AIService } from "../services/aiService";
import { useRecipeStore } from "../store";
import { Recipe, RecipeSearchParams } from "../types/recipe";
import { AIRecipeRequest } from "../types/ai";

// Hook for fetching a single recipe
export const useRecipe = (recipeId: string) => {
  const { setCurrentRecipe, setError } = useRecipeStore();

  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      try {
        const recipe = await RecipeService.getRecipe(recipeId);
        setCurrentRecipe(recipe);
        return recipe;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch recipe",
        );
        throw error;
      }
    },
    enabled: !!recipeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for searching recipes
export const useRecipeSearch = (params: RecipeSearchParams) => {
  const { setSearchResults, setError } = useRecipeStore();

  return useQuery({
    queryKey: ["recipes", "search", params],
    queryFn: async () => {
      try {
        const result = await RecipeService.searchRecipes(params);
        setSearchResults(result.items);
        return result;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to search recipes",
        );
        throw error;
      }
    },
    enabled: !!(params.query || params.filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for trending recipes
export const useTrendingRecipes = (limit: number = 10) => {
  return useQuery({
    queryKey: ["recipes", "trending", limit],
    queryFn: () => RecipeService.getTrendingRecipes(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for favorite recipes
export const useFavoriteRecipes = (userId: string) => {
  const { setFavoriteRecipes } = useRecipeStore();

  return useQuery({
    queryKey: ["recipes", "favorites", userId],
    queryFn: async () => {
      const recipes = await RecipeService.getFavoriteRecipes(userId);
      setFavoriteRecipes(recipes);
      return recipes;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for recipe recommendations
export const useRecipeRecommendations = (
  userId: string,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["recipes", "recommendations", userId, limit],
    queryFn: () => RecipeService.getRecommendations(userId, limit),
    enabled: !!userId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for similar recipes
export const useSimilarRecipes = (recipeId: string, limit: number = 5) => {
  return useQuery({
    queryKey: ["recipes", "similar", recipeId, limit],
    queryFn: () => RecipeService.getSimilarRecipes(recipeId, limit),
    enabled: !!recipeId,
    staleTime: 10 * 60 * 1000,
  });
};

// Mutation hook for adding to favorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { addToFavorites } = useRecipeStore();

  return useMutation({
    mutationFn: RecipeService.addToFavorites,
    onSuccess: (_, recipeId) => {
      // Invalidate and refetch favorites
      queryClient.invalidateQueries({ queryKey: ["recipes", "favorites"] });

      // Optimistically update the recipe in the store
      queryClient.setQueryData(
        ["recipe", recipeId],
        (old: Recipe | undefined) => {
          if (old) {
            addToFavorites(old);
            return { ...old, isFavorite: true };
          }
          return old;
        },
      );
    },
  });
};

// Mutation hook for removing from favorites
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const { removeFromFavorites } = useRecipeStore();

  return useMutation({
    mutationFn: RecipeService.removeFromFavorites,
    onSuccess: (_, recipeId) => {
      // Invalidate and refetch favorites
      queryClient.invalidateQueries({ queryKey: ["recipes", "favorites"] });

      // Update store
      removeFromFavorites(recipeId);

      // Update recipe data
      queryClient.setQueryData(
        ["recipe", recipeId],
        (old: Recipe | undefined) => {
          if (old) {
            return { ...old, isFavorite: false };
          }
          return old;
        },
      );
    },
  });
};

// Mutation hook for rating recipes
export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, rating }: { recipeId: string; rating: number }) =>
      RecipeService.rateRecipe(recipeId, rating),
    onSuccess: (_, { recipeId }) => {
      // Invalidate recipe data to refetch updated rating
      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
    },
  });
};

// Hook for AI recipe generation
export const useGenerateRecipe = () => {
  return useMutation({
    mutationFn: (request: AIRecipeRequest) => AIService.generateRecipe(request),
  });
};

// Hook for ingredient recognition
export const useIngredientRecognition = () => {
  return useMutation({
    mutationFn: (imageFile: File | Blob) =>
      AIService.recognizeIngredients(imageFile),
  });
};

// Mutation hook for scaling recipes
export const useScaleRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recipeId,
      servings,
    }: {
      recipeId: string;
      servings: number;
    }) => RecipeService.scaleRecipe(recipeId, servings),
    onSuccess: (scaledRecipe, { recipeId }) => {
      // Update the recipe data with scaled version
      queryClient.setQueryData(["recipe", recipeId], scaledRecipe);
    },
  });
};

// Hook for creating new recipes
export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RecipeService.createRecipe,
    onSuccess: (newRecipe) => {
      // Add to recipes cache
      queryClient.setQueryData(["recipe", newRecipe.id], newRecipe);

      // Invalidate lists to include new recipe
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

// Hook for updating recipes
export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Recipe> }) =>
      RecipeService.updateRecipe(id, data),
    onSuccess: (updatedRecipe) => {
      // Update recipe in cache
      queryClient.setQueryData(["recipe", updatedRecipe.id], updatedRecipe);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

// Hook for cooking session management
export const useCookingSession = () => {
  const queryClient = useQueryClient();

  const startSession = useMutation({
    mutationFn: RecipeService.startCookingSession,
  });

  const updateProgress = useMutation({
    mutationFn: ({
      sessionId,
      stepId,
    }: {
      sessionId: string;
      stepId: string;
    }) => RecipeService.updateCookingProgress(sessionId, stepId),
  });

  const completeSession = useMutation({
    mutationFn: ({
      sessionId,
      rating,
      notes,
    }: {
      sessionId: string;
      rating?: number;
      notes?: string;
    }) => RecipeService.completeCookingSession(sessionId, rating, notes),
    onSuccess: () => {
      // Invalidate cooking history
      queryClient.invalidateQueries({ queryKey: ["cooking-history"] });
    },
  });

  return {
    startSession,
    updateProgress,
    completeSession,
  };
};
