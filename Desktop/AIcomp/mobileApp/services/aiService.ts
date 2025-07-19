// AI-related API service functions

import { aiApiService, handleApiResponse } from "./api";
import {
  AIRecipeRequest,
  AIRecipeResponse,
  IngredientRecognition,
  NutritionAnalysis,
  CookingAssistant,
  VoiceCommand,
  RecipeModification,
  SmartShoppingList,
  MealPlanSuggestion,
} from "../types/ai";

export class AIService {
  // Generate recipe from ingredients using AI
  static async generateRecipe(
    request: AIRecipeRequest,
  ): Promise<AIRecipeResponse> {
    const response = await aiApiService.post<{ data: AIRecipeResponse }>(
      "/ai/generate-recipe",
      request,
    );
    return handleApiResponse(response);
  }

  // Recognize ingredients from image
  static async recognizeIngredients(
    imageFile: File | Blob,
  ): Promise<IngredientRecognition> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await aiApiService.upload<{ data: IngredientRecognition }>(
      "/ai/recognize-ingredients",
      formData,
    );
    return handleApiResponse(response);
  }

  // Get AI-powered nutrition analysis
  static async analyzeNutrition(
    recipeId: string,
    modifications?: any[],
  ): Promise<NutritionAnalysis> {
    const response = await aiApiService.post<{ data: NutritionAnalysis }>(
      "/ai/analyze-nutrition",
      {
        recipeId,
        modifications,
      },
    );
    return handleApiResponse(response);
  }

  // Get cooking assistant recommendations
  static async getCookingAssistance(
    recipeId: string,
    currentStep: number,
    sessionData?: any,
  ): Promise<CookingAssistant> {
    const response = await aiApiService.post<{ data: CookingAssistant }>(
      "/ai/cooking-assistant",
      {
        recipeId,
        currentStep,
        sessionData,
      },
    );
    return handleApiResponse(response);
  }

  // Process voice commands
  static async processVoiceCommand(
    audioBlob: Blob,
    context?: any,
  ): Promise<VoiceCommand> {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    if (context) {
      formData.append("context", JSON.stringify(context));
    }

    const response = await aiApiService.upload<{ data: VoiceCommand }>(
      "/ai/voice-command",
      formData,
    );
    return handleApiResponse(response);
  }

  // Get ingredient substitutions
  static async getIngredientSubstitutes(
    ingredient: string,
    recipeContext?: any,
  ): Promise<string[]> {
    const response = await aiApiService.post<{ data: string[] }>(
      "/ai/ingredient-substitutes",
      {
        ingredient,
        recipeContext,
      },
    );
    return handleApiResponse(response);
  }

  // Modify recipe based on dietary restrictions
  static async adaptRecipeForDiet(
    recipeId: string,
    dietaryRestrictions: string[],
  ): Promise<RecipeModification[]> {
    const response = await aiApiService.post<{ data: RecipeModification[] }>(
      "/ai/adapt-recipe",
      {
        recipeId,
        dietaryRestrictions,
      },
    );
    return handleApiResponse(response);
  }

  // Generate smart shopping list
  static async generateShoppingList(
    recipeIds: string[],
  ): Promise<SmartShoppingList> {
    const response = await aiApiService.post<{ data: SmartShoppingList }>(
      "/ai/shopping-list",
      {
        recipeIds,
      },
    );
    return handleApiResponse(response);
  }

  // Get personalized meal plan
  static async generateMealPlan(
    userId: string,
    days: number = 7,
    preferences?: any,
  ): Promise<MealPlanSuggestion[]> {
    const response = await aiApiService.post<{ data: MealPlanSuggestion[] }>(
      "/ai/meal-plan",
      {
        userId,
        days,
        preferences,
      },
    );
    return handleApiResponse(response);
  }

  // Optimize recipe cooking time
  static async optimizeCookingTime(
    recipeId: string,
    userSkillLevel: string,
    availableTime: number,
  ): Promise<any> {
    const response = await aiApiService.post<{ data: any }>(
      "/ai/optimize-cooking-time",
      {
        recipeId,
        userSkillLevel,
        availableTime,
      },
    );
    return handleApiResponse(response);
  }

  // Get recipe difficulty assessment
  static async assessRecipeDifficulty(recipeData: any): Promise<{
    difficulty: string;
    reasons: string[];
    tips: string[];
  }> {
    const response = await aiApiService.post<{ data: any }>(
      "/ai/assess-difficulty",
      recipeData,
    );
    return handleApiResponse(response);
  }

  // Generate recipe variations
  static async generateRecipeVariations(
    recipeId: string,
    variationType: "cuisine" | "dietary" | "ingredient" | "cooking-method",
  ): Promise<AIRecipeResponse[]> {
    const response = await aiApiService.post<{ data: AIRecipeResponse[] }>(
      "/ai/recipe-variations",
      {
        recipeId,
        variationType,
      },
    );
    return handleApiResponse(response);
  }

  // Smart recipe search with natural language
  static async smartSearch(query: string, userContext?: any): Promise<any> {
    const response = await aiApiService.post<{ data: any }>(
      "/ai/smart-search",
      {
        query,
        userContext,
      },
    );
    return handleApiResponse(response);
  }

  // Get cooking tips based on recipe and user skill
  static async getCookingTips(
    recipeId: string,
    userSkillLevel: string,
  ): Promise<string[]> {
    const response = await aiApiService.post<{ data: string[] }>(
      "/ai/cooking-tips",
      {
        recipeId,
        userSkillLevel,
      },
    );
    return handleApiResponse(response);
  }

  // Predict cooking success rate
  static async predictCookingSuccess(
    recipeId: string,
    userProfile: any,
  ): Promise<{
    successRate: number;
    challenges: string[];
    recommendations: string[];
  }> {
    const response = await aiApiService.post<{ data: any }>(
      "/ai/predict-success",
      {
        recipeId,
        userProfile,
      },
    );
    return handleApiResponse(response);
  }
}
