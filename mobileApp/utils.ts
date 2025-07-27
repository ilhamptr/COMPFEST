// YouTube utility functions
export const DEFAULT_THUMBNAIL = "https://via.placeholder.com/480x360/333333/ffffff?text=Video+Thumbnail";

/**
 * Extract YouTube video ID from various URL formats
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generate YouTube thumbnail URL from video URL
 */
export const getYouTubeThumbnail = (youtubeUrl: string): string | null => {
  if (!youtubeUrl) return null;
  
  const videoId = getYouTubeVideoId(youtubeUrl);
  if (!videoId) return null;
  
  // Use maxresdefault for highest quality, fallback to hqdefault if needed
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * Capitalize the first letter of a string and lowercases the rest
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Get the color associated with a difficulty level (Tailwind class)
 */
export const getDifficultyColor = (difficulty: string): string => {
  const normalizedDifficulty = difficulty?.toLowerCase();
  if (normalizedDifficulty.includes('easy') || normalizedDifficulty.includes('simple')) {
    return 'bg-green-500';
  } else if (normalizedDifficulty.includes('medium') || normalizedDifficulty.includes('moderate')) {
    return 'bg-yellow-500';
  } else if (normalizedDifficulty.includes('hard') || normalizedDifficulty.includes('difficult') || normalizedDifficulty.includes('challenging')) {
    return 'bg-red-500';
  }
  return 'bg-yellow-500'; // Default to yellow for unknown difficulties
};

/**
 * Parse string or array data into array format
 */
export const parseToArray = (data: string | string[] | undefined): string[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    return data
      .split(/\n/)
      .filter((item: string) => item.trim())
      .map((item: string) => item.trim());
  }
  return [];
};

/**
 * Extract video URL from various possible data structures
 */
export const extractVideoUrl = (aiData: any): string | null => {
  if (aiData.video_data && Array.isArray(aiData.video_data) && aiData.video_data.length > 0) {
    return aiData.video_data[0].url;
  }
  return aiData.video_url || aiData.youtube_url || aiData.tutorial_url || null;
};

/**
 * Map AI response data to standardized format
 */
export const mapAIResponseData = (aiData: any) => {
  if (!aiData) return null;

  const recipeName = aiData.name || aiData.recipe_name || aiData.title || aiData.dish_name || "Recipe";

  // Parse ingredients using utility function
  const ingredients = parseToArray(aiData.ingredients);

  // Parse steps/instructions using utility function
  const steps = parseToArray(aiData.steps || aiData.instructions);

  // Parse tips using utility function
  const tips = parseToArray(aiData.tips);

  return {
    name: recipeName,
    difficulty: aiData.difficulty || aiData.level || "Medium",
    diet: aiData.diet || aiData.dietary_restrictions || "None",
    kind_of_food: aiData.kind_of_food || aiData.cuisine || aiData.type || "General",
    prep_time: aiData.prep_time || aiData.preparation_time || "N/A",
    cook_time: aiData.cook_time || aiData.cooking_time || "N/A",
    ingredients,
    steps,
    tips,
    video_url: extractVideoUrl(aiData),
  };
};
