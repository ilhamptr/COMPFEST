from pydantic import BaseModel,Field
from enum import Enum
from typing import Optional
from typing import List, Optional

# Base model for valid option
class DifficultyOptions(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"

class DietOption(str, Enum):
    none = "no special diet"
    vegetarian = "vegetarian"
    vegan = "vegan"
    keto = "keto"
    halal = "halal"
    kosher = "kosher"

class FoodType(str, Enum):
    random = "random"
    western = "western"
    asian = "asian"
    indonesian = "indonesian"
    middle_eastern = "middle eastern"
    indian = "indian"
    fusion = "fusion"

class Item(BaseModel):
    diet: DietOption = DietOption.none
    type: FoodType = FoodType.random
    difficulty: DifficultyOptions = DifficultyOptions.medium
    ingredients: str

# response formatter for Recipe model 
class ResponseFormatter(BaseModel):
    """Use this model to structure your generated recipe response."""
    
    name: str = Field(description="A short and recognizable name for the recipe.")
    difficulty: str = Field(description="The difficulty level of the recipe (e.g., easy, medium, hard).")
    diet: str = Field(description="The dietary type such as vegetarian, vegan, halal, or no special diet.")
    kind_of_food: str = Field(description="The cuisine type (e.g., western, asian, middle eastern, etc.)")
    prep_time: str = Field(description="Estimated preparation time (e.g., 15 minutes).")
    cook_time: str = Field(description="Estimated cooking time (e.g., 30 minutes).")
    
    ingredients: List[str] = Field(description="A list of ingredients with quantities.")
    steps: List[str] = Field(description="Step-by-step cooking instructions.")
    
    tips: Optional[List[str]] = Field(default=None, description="Optional cooking tips or variations.")

