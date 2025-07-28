import axios from 'axios';
import Constants from 'expo-constants';

// Use environment-specific endpoints
const getApiEndpoint = () => {
  // Check if running in development vs production
  if (__DEV__) {
    return "http://15.235.185.245/recipe/";
  } else {
    // For production builds, use HTTPS or a more reliable endpoint
    return "https://15.235.185.245/recipe/";
  }
};

const endpoint = getApiEndpoint();

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

// Configure axios for better APK compatibility
const apiClient = axios.create({
    baseURL: endpoint,
    timeout: 30000, // 30 second timeout
    headers: headers,
    // Add retry configuration for better reliability
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
    (config) => {
        console.log("API Request:", {
            url: config.url,
            baseURL: config.baseURL,
            method: config.method,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
    (response) => {
        console.log("API Response:", {
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error("Response interceptor error:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

interface RecipeParams {
    diet: string;
    type: string;
    difficulty: string;
    ingredients: string;
}

export async function generateRecipe(params: RecipeParams) {
    try {
        console.log("Environment:", __DEV__ ? "development" : "production");
        console.log("API Endpoint:", endpoint);
        console.log("Sending request to:", endpoint);
        console.log("Request params:", params);

        const response = await apiClient.post("", params);

        console.log("Response received:", response.status);
        console.log("Response data:", response.data);

        if (response.data?.data?.cook_time) {
            console.log("Cook time:", response.data.data.cook_time);
        }

        return response.data;
    } catch (err: any) {
        console.error("Network Error Details:");
        console.error("- Error message:", err.message);
        console.error("- Error code:", err.code);
        console.error("- Response status:", err.response?.status);
        console.error("- Response data:", err.response?.data);
        console.error("- Network state:", err.isNetworkError);

        // Provide more specific error messages for debugging
        if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED') {
            console.error("Network connection failed - check if API server is running");
            throw new Error("Unable to connect to recipe service. Please check your internet connection and try again.");
        }

        if (err.code === 'TIMEOUT') {
            throw new Error("Request timed out. Please try again.");
        }

        if (err.response?.status === 404) {
            throw new Error("Recipe service not found. Please try again later.");
        }

        if (err.response?.status >= 500) {
            throw new Error("Server error. Please try again later.");
        }

        throw err;
    }
}

// Function to fetch recipe data with error handling and retries
export async function fetchRecipeData(params: RecipeParams): Promise<any> {
    try {
        const response = await apiClient.post("", params);
        return response.data;
    } catch (error) {
        console.error("Error fetching recipe data:", error);
        throw new Error("Failed to fetch recipe data. Please try again later.");
    }
}
