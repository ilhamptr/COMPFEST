import axios from 'axios';

// Base server URL
const BASE_URL = "http://15.235.185.245";

// Use HTTP for both development and production since the server doesn't support HTTPS
const getApiEndpoint = () => {
  return `${BASE_URL}/recipe`;
};

const getUploadEndpoint = () => {
  return `${BASE_URL}/upload-image/`;
};

const endpoint = getApiEndpoint();

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

// Configure axios for better emulator and APK compatibility
const apiClient = axios.create({
    baseURL: endpoint,
    timeout: 60000, // Increase timeout to 60 seconds for slower connections
    headers: headers,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }
});

interface RecipeParams {
    diet: string;
    type: string;
    difficulty: string;
    ingredients: string;
}

// Upload image function
export async function uploadImage(imageUri: string) {
    try {
        // Prepare the image for upload using React Native FormData
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            name: "upload.jpg",
            type: "image/jpeg",
        } as any);

        const response = await axios.post(getUploadEndpoint(), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 30000, // 30 second timeout
        });

        // Extract AI response
        const rawIngredients = response.data.data?.content ||
                             response.data.content ||
                             response.data.recognized_text ||
                             response.data.recognizedText || "";

        // Convert numbered list to comma-separated format
        const formattedIngredients = rawIngredients
            .split('\n')
            .map((line: string) => line.replace(/^\d+\.\s*/, '').trim()) // Remove number and dot
            .filter((line: string) => line.length > 0) // Remove empty lines
            .join(', '); // Join with commas

        return formattedIngredients;
    } catch (err: any) {
        // Provide more specific error messages for image upload
        if (!err.response) {
            throw new Error("Unable to connect to the image analysis service. Please check your internet connection and try again.");
        }

        if (err.code === 'ECONNABORTED' || err.code === 'TIMEOUT') {
            throw new Error("Image upload timed out. Please try again.");
        }

        if (err.response?.status === 404) {
            throw new Error("Image analysis service not found. Please try again later.");
        }

        if (err.response?.status >= 500) {
            throw new Error("Server error occurred during image analysis. Please try again later.");
        }

        if (err.response?.status === 400) {
            throw new Error("Invalid image format. Please select a valid image file.");
        }

        throw new Error(`Failed to analyze image: ${err.message || 'Unknown error'}`);
    }
}

export async function generateRecipe(params: RecipeParams) {
    try {
        const response = await apiClient.post("", params);
        return response.data;
    } catch (err: any) {
        // Provide more specific error messages
        if (!err.response) {
            // Network error - no response received
            throw new Error("Unable to connect to the recipe service. Please check your internet connection and try again.");
        }

        if (err.code === 'ECONNABORTED' || err.code === 'TIMEOUT') {
            throw new Error("Request timed out. The server might be slow. Please try again.");
        }

        if (err.response?.status === 404) {
            throw new Error("Recipe service endpoint not found. Please try again later.");
        }

        if (err.response?.status >= 500) {
            throw new Error("Server error occurred. Please try again later.");
        }

        if (err.response?.status === 400) {
            throw new Error("Invalid request data. Please check your ingredients and try again.");
        }

        // Generic error fallback
        throw new Error(`Failed to generate recipe: ${err.message || 'Unknown error'}`);
    }
}

// Network testing function
export async function testNetworkConnection() {
    const tests = {
        serverReachable: false,
        uploadEndpoint: false,
        recipeEndpoint: false,
        internetConnection: false,
        details: {} as any
    };

    try {
        // Test 1: Basic internet connectivity
        try {
            const internetTest = await axios.get('https://www.google.com', { timeout: 5000 });
            tests.internetConnection = true;
            tests.details.internet = 'Connected';
        } catch (err) {
            tests.details.internet = 'Failed - No internet connection';
        }

        // Test 2: Server reachability (basic ping)
        try {
            const serverTest = await axios.get(`${BASE_URL}/`, { timeout: 10000 });
            tests.serverReachable = true;
            tests.details.server = `Connected - Status: ${serverTest.status}`;
        } catch (err: any) {
            tests.details.server = `Failed - ${err.message || 'Server unreachable'}`;
        }

        // Test 3: Upload endpoint
        try {
            const uploadTest = await axios.options(getUploadEndpoint(), { timeout: 10000 });
            tests.uploadEndpoint = true;
            tests.details.upload = `Available - Status: ${uploadTest.status}`;
        } catch (err: any) {
            tests.details.upload = `Failed - ${err.message || 'Upload endpoint unavailable'}`;
        }

        // Test 4: Recipe endpoint
        try {
            const recipeTest = await axios.options(getApiEndpoint(), { timeout: 10000 });
            tests.recipeEndpoint = true;
            tests.details.recipe = `Available - Status: ${recipeTest.status}`;
        } catch (err: any) {
            tests.details.recipe = `Failed - ${err.message || 'Recipe endpoint unavailable'}`;
        }

    } catch (generalError: any) {
        tests.details.general = `General error: ${generalError.message}`;
    }

    return tests;
}

// Simple ping function for basic connectivity test
export async function pingServer() {
    try {
        console.log(`Testing connection to: ${BASE_URL}`);

        // Try recipe endpoint directly with proper JSON POST (skip root endpoint test)
        const testData = {
            diet: "no special diet",
            type: "random",
            difficulty: "easy",
            ingredients: "test ingredient"
        };

        console.log('Sending test request to recipe endpoint...');
        const response = await axios.post(`${BASE_URL}/recipe/`, testData, {
            timeout: 10000, // Increase timeout to 10 seconds
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            }
        });

        console.log('Recipe endpoint response:', response.status);
        return {
            success: true,
            status: response.status,
            message: `Server is reachable (recipe endpoint) - Status: ${response.status}`
        };
    } catch (err: any) {
        console.log('Error details:', err.message, err.response?.status);
        return {
            success: false,
            status: err.response?.status || 0,
            message: `Server test failed. Status: ${err.response?.status || 'No response'}, Error: ${err.message || 'Unknown error'}`
        };
    }
}
