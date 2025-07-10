from pydantic import BaseModel
from enum import Enum
from typing import Optional


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

