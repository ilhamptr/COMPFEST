// Recipe-related API service functions

import { apiService, handleApiResponse, handlePaginatedResponse } from "./api";
import { Recipe, RecipeSearchParams, RecipeFilter } from "../types/recipe";

export class RecipeService {
  // Get single recipe by ID
  static async getRecipe(id: string): Promise<Recipe> {
    const response = await apiService.get<{ data: Recipe }>(`/recipes/${id}`);
    return handleApiResponse(response);
  }

  // Search recipes with filters and pagination
  static async searchRecipes(params: RecipeSearchParams = {}) {
    const response = await apiService.get("/recipes/search", params);
    return handlePaginatedResponse(response);
  }

  // Get trending/popular recipes
  static async getTrendingRecipes(limit: number = 10): Promise<Recipe[]> {
    const response = await apiService.get<{ data: Recipe[] }>(
      "/recipes/trending",
      { limit },
    );
    return handleApiResponse(response);
  }

  // Get recipes by cuisine
  static async getRecipesByCuisine(
    cuisine: string,
    limit: number = 20,
  ): Promise<Recipe[]> {
    const response = await apiService.get<{ data: Recipe[] }>(
      `/recipes/cuisine/${cuisine}`,
      { limit },
    );
    return handleApiResponse(response);
  }

  // Get user's favorite recipes
  static async getFavoriteRecipes(userId: string): Promise<Recipe[]> {
    const response = await apiService.get<{ data: Recipe[] }>(
      `/users/${userId}/favorites`,
    );
    return handleApiResponse(response);
  }

  // Add recipe to favorites
  static async addToFavorites(recipeId: string): Promise<void> {
    await apiService.post(`/recipes/${recipeId}/favorite`);
  }

  // Remove recipe from favorites
  static async removeFromFavorites(recipeId: string): Promise<void> {
    await apiService.delete(`/recipes/${recipeId}/favorite`);
  }

  // Rate a recipe
  static async rateRecipe(recipeId: string, rating: number): Promise<void> {
    await apiService.post(`/recipes/${recipeId}/rate`, { rating });
  }

  // Get recipe recommendations based on user preferences
  static async getRecommendations(
    userId: string,
    limit: number = 10,
  ): Promise<Recipe[]> {
    const response = await apiService.get<{ data: Recipe[] }>(
      `/users/${userId}/recommendations`,
      { limit },
    );
    return handleApiResponse(response);
  }

  // Create new recipe (for user-generated content)
  static async createRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
    const response = await apiService.post<{ data: Recipe }>(
      "/recipes",
      recipeData,
    );
    return handleApiResponse(response);
  }

  // Update existing recipe
  static async updateRecipe(
    id: string,
    recipeData: Partial<Recipe>,
  ): Promise<Recipe> {
    const response = await apiService.put<{ data: Recipe }>(
      `/recipes/${id}`,
      recipeData,
    );
    return handleApiResponse(response);
  }

  // Delete recipe
  static async deleteRecipe(id: string): Promise<void> {
    await apiService.delete(`/recipes/${id}`);
  }

  // Upload recipe image
  static async uploadRecipeImage(
    recipeId: string,
    imageFile: File | Blob,
  ): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiService.upload<{ data: { imageUrl: string } }>(
      `/recipes/${recipeId}/image`,
      formData,
    );
    return handleApiResponse(response);
  }

  // Get similar recipes
  static async getSimilarRecipes(
    recipeId: string,
    limit: number = 5,
  ): Promise<Recipe[]> {
    const response = await apiService.get<{ data: Recipe[] }>(
      `/recipes/${recipeId}/similar`,
      { limit },
    );
    return handleApiResponse(response);
  }

  // Get recipe nutrition analysis
  static async getNutritionAnalysis(recipeId: string): Promise<any> {
    const response = await apiService.get<{ data: any }>(
      `/recipes/${recipeId}/nutrition`,
    );
    return handleApiResponse(response);
  }

  // Scale recipe servings
  static async scaleRecipe(
    recipeId: string,
    servings: number,
  ): Promise<Recipe> {
    const response = await apiService.post<{ data: Recipe }>(
      `/recipes/${recipeId}/scale`,
      { servings },
    );
    return handleApiResponse(response);
  }

  // Get recipe cooking history
  static async getCookingHistory(userId: string): Promise<any[]> {
    const response = await apiService.get<{ data: any[] }>(
      `/users/${userId}/cooking-history`,
    );
    return handleApiResponse(response);
  }

  // Start cooking session
  static async startCookingSession(
    recipeId: string,
  ): Promise<{ sessionId: string }> {
    const response = await apiService.post<{ data: { sessionId: string } }>(
      `/recipes/${recipeId}/cook`,
    );
    return handleApiResponse(response);
  }

  // Update cooking progress
  static async updateCookingProgress(
    sessionId: string,
    stepId: string,
  ): Promise<void> {
    await apiService.post(`/cooking-sessions/${sessionId}/progress`, {
      stepId,
    });
  }

  // Complete cooking session
  static async completeCookingSession(
    sessionId: string,
    rating?: number,
    notes?: string,
  ): Promise<void> {
    await apiService.post(`/cooking-sessions/${sessionId}/complete`, {
      rating,
      notes,
    });
  }
}
