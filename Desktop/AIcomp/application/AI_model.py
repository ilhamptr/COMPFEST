import os
# import asyncio
from dotenv import load_dotenv
from openai import AzureOpenAI
from tavily import TavilyClient

load_dotenv()
api_base = os.getenv("API_BASE") # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
api_key= os.getenv("API_KEY")
deployment_name = os.getenv("DEPLOYMENT_NAME")
api_version = os.getenv("API_VERSION") # this might change in the future

client = AzureOpenAI(
    api_key=api_key,  
    api_version=api_version,
    base_url=f"{api_base}openai/deployments/{deployment_name}",
)

async def model_image(image_data):
    response = client.chat.completions.create(
        model=deployment_name,
        messages=[
            { "role": "system", "content": "You are a helpful cooking AI assistant. When the user sends you an image, identify and list the ingredients or food items visible in the picture. Be as specific as possible. Format your response as a numbered list.\n\nExample response format:\n1. Cucumber\n2. Spaghetti\n3. Tomato\n4. Basil leaves\n5. Parmesan cheese\n\nIf you're unsure about an item, note it as: 'Possible [item name]'. If the image is not food-related, simply reply with: 'No food ingredients detected.'" },
            { "role": "user", "content": [  
                { 
                    "type": "text", 
                    "text": "Describe this picture:" 
                },
                { 
                    "type": "image_url",
                    "image_url": {
                        "url": f"{image_data}"
                    }
                }
            ] } 
        ],
        max_tokens=1000,
        temperature=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.2,
        model=deployment_name
    
    )
    return response

tavily_client = TavilyClient(os.getenv("TAVILY_API")) 

async def tavily_searching(recipe:str):
    recipe = f"recipe for {recipe}"
    response = tavily_client.search(
        query=recipe,
        search_depth="advanced",
        max_results= 3,
        include_domains=["www.youtube.com"]
    )
    videos = []
    for i in response["results"]:
        video = {"title": i["title"],"url": i["url"]}
        videos.append(video)

    return videos

async def recipe_model(input:dict,ingredients:str):
    system_prompt = f"""You are a helpful and knowledgeable cooking assistant. Your task is to suggest a common and well-known recipe based on the following user preferences:
    - **Ingredients**: The recipe must include all the given ingredients.
    - **Food Type**: The recipe should fit within the specified cuisine (e.g., Asian, Western, Indonesian, Middle Eastern, etc.).
    - **Diet Option**: Respect the dietary restriction (e.g., vegan, vegetarian, halal, none). Do not include ingredients that violate the diet type.
    - **Familiarity**: Only suggest recipes that are widely known or traditionally made in that cuisine, not overly complex or obscure dishes.
    When responding, provide:
    1. A short and recognizable recipe name.
    2. Estimated preparation and cooking time.
    3. A clear list of ingredients with quantities.
    4. Detailed step-by-step cooking instructions.
    5. Optional tips or common variations (if any).
    """

    diet = input["diet"]
    type = input["type"]
    difficulty = input["difficulty"]

    content_prompt = f"""
    Create a detailed recipe that meets the following criteria:

    Difficulty level: {difficulty}

    Dietary preference: {diet}

    Cuisine type: Middle {type}

    The recipe should include:

    A short, engaging recipe name

    Estimated preparation and cooking time

    A complete list of ingredients with precise quantities

    Step-by-step cooking instructions
    Optional tips or variations (if applicable)
    Required ingredients:
    {ingredients}
    """
 
    response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": system_prompt,
        },
        {
            "role": "user",
            "content": content_prompt,
        }
    ],
    max_completion_tokens=2000,
    temperature=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.2,
    model=deployment_name
    )

    return response

    
    

# asyncio.run(tavily_searching("recipe for Spiced Beef & Feta Fusion Pastries"))
