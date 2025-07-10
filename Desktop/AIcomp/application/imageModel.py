import os
from dotenv import load_dotenv
from openai import AzureOpenAI

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
        max_tokens=2000 
    )
    return response

async def recipe_model(items):
    pass