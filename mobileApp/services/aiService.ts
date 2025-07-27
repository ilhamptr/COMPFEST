import axios from 'axios';

const endpoint = "http://15.235.185.245/recipe/";

const headers = {
    "Content-Type": "application/json",
};

interface RecipeParams {
    diet: string;
    type: string;
    difficulty: string;
    ingredients: string;
}

export async function generateRecipe(params: RecipeParams) {
    try {
        const response = await axios.post(endpoint, params, { headers });
        console.log(response.data.data.cook_time);
        return response.data;
    } catch (err: any) {
        console.error("Error:", err.response?.data || err.message);
        throw err;
    }
}
