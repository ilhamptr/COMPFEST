// Utility functions for the application

// Format cooking time
export const formatCookingTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
};

// Format nutrition values
export const formatNutritionValue = (value: number, unit: string): string => {
  if (unit === "g" && value >= 1000) {
    return `${(value / 1000).toFixed(1)}kg`;
  }

  if (unit === "mg" && value >= 1000) {
    return `${(value / 1000).toFixed(1)}g`;
  }

  return `${value}${unit}`;
};

// Convert between measurement systems
export const convertMeasurement = (
  value: number,
  fromUnit: string,
  toUnit: string,
  system: "metric" | "imperial",
): { value: number; unit: string } => {
  const conversions: Record<string, Record<string, number>> = {
    // Weight conversions
    g: { oz: 0.035274, lb: 0.002205 },
    kg: { oz: 35.274, lb: 2.205 },
    oz: { g: 28.3495, kg: 0.0283495 },
    lb: { g: 453.592, kg: 0.453592 },

    // Volume conversions
    ml: { "fl oz": 0.033814, cup: 0.004227 },
    l: { "fl oz": 33.814, cup: 4.227, qt: 1.057, gal: 0.264 },
    "fl oz": { ml: 29.5735, l: 0.0295735 },
    cup: { ml: 236.588, l: 0.236588 },
    qt: { l: 0.946353, ml: 946.353 },
    gal: { l: 3.78541, ml: 3785.41 },

    // Temperature conversions (special case)
    celsius: { fahrenheit: (c: number) => (c * 9) / 5 + 32 },
    fahrenheit: { celsius: (f: number) => ((f - 32) * 5) / 9 },
  };

  if (fromUnit === toUnit) {
    return { value, unit: toUnit };
  }

  const conversion = conversions[fromUnit]?.[toUnit];
  if (typeof conversion === "number") {
    return { value: Math.round(value * conversion * 100) / 100, unit: toUnit };
  }

  if (typeof conversion === "function") {
    return { value: Math.round(conversion(value) * 100) / 100, unit: toUnit };
  }

  // If no conversion found, return original
  return { value, unit: fromUnit };
};

// Scale recipe ingredients
export const scaleIngredients = (
  ingredients: any[],
  originalServings: number,
  newServings: number,
) => {
  const scaleFactor = newServings / originalServings;

  return ingredients.map((ingredient) => ({
    ...ingredient,
    amount: ingredient.amount * scaleFactor,
  }));
};

// Parse ingredient amount from string
export const parseIngredientAmount = (
  amountString: string,
): {
  value: number;
  unit: string;
  originalText: string;
} => {
  const fractionMap: Record<string, number> = {
    "1/4": 0.25,
    "¼": 0.25,
    "1/3": 0.333,
    "⅓": 0.333,
    "1/2": 0.5,
    "½": 0.5,
    "2/3": 0.667,
    "⅔": 0.667,
    "3/4": 0.75,
    "¾": 0.75,
  };

  let cleanAmount = amountString.trim().toLowerCase();

  // Replace fractions
  Object.entries(fractionMap).forEach(([fraction, decimal]) => {
    cleanAmount = cleanAmount.replace(fraction, decimal.toString());
  });

  // Extract number and unit
  const match = cleanAmount.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);

  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2].trim(),
      originalText: amountString,
    };
  }

  return {
    value: 1,
    unit: amountString,
    originalText: amountString,
  };
};

// Generate shopping list from recipes
export const generateShoppingListFromRecipes = (recipes: any[]): any[] => {
  const ingredientMap = new Map();

  recipes.forEach((recipe) => {
    recipe.ingredients?.forEach((ingredient: any) => {
      const key = ingredient.name.toLowerCase();
      const parsed = parseIngredientAmount(ingredient.amount);

      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key);
        if (existing.unit === parsed.unit) {
          existing.value += parsed.value;
        } else {
          // Different units, keep separate
          ingredientMap.set(`${key}_${parsed.unit}`, {
            name: ingredient.name,
            value: parsed.value,
            unit: parsed.unit,
            category: ingredient.category,
          });
        }
      } else {
        ingredientMap.set(key, {
          name: ingredient.name,
          value: parsed.value,
          unit: parsed.unit,
          category: ingredient.category,
        });
      }
    });
  });

  return Array.from(ingredientMap.values()).map((item, index) => ({
    id: `item_${index}`,
    name: item.name,
    amount: `${item.value} ${item.unit}`,
    category: item.category || "other",
    isCompleted: false,
  }));
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Format recipe difficulty
export const formatDifficulty = (difficulty: string): string => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

// Calculate total recipe time
export const calculateTotalTime = (
  prepTime: number,
  cookTime: number,
): number => {
  return prepTime + cookTime;
};

// Format recipe rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Generate recipe URL slug
export const generateRecipeSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (
  password: string,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Generate random ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
  if (typeof obj === "object") {
    const clonedObj = {} as any;
    Object.keys(obj).forEach((key) => {
      clonedObj[key] = deepClone((obj as any)[key]);
    });
    return clonedObj;
  }
  return obj;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

// Check if running on device vs simulator
export const isDevice = (): boolean => {
  // This would need to be implemented based on your platform detection needs
  return true; // Placeholder
};

// Format currency
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
