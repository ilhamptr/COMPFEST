from fastapi import FastAPI,UploadFile,File
import imageprocessing
from base import Item
import AI_model

app = FastAPI()

# FastAPI endpoint
@app.post("/upload-image/",status_code=200)
async def upload_image(file: UploadFile = File(...)):
    content,filename = await imageprocessing.validate_upload(file=file)
    data_url = await imageprocessing.local_image_to_data_url(file_name=filename,file_content=content)
    response = await AI_model.model_image(data_url)
    return {"data": response}

@app.post("/recipe/",status_code=200)
async def get_option(item:Item):
    item = item.model_dump()
    input = dict(item)
    result = await AI_model.recipe_model(input=input)
    return result