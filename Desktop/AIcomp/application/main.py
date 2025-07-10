from fastapi import FastAPI,UploadFile,File
import imageprocessing
import imageModel
app = FastAPI()


# FastAPI endpoint

@app.post("/upload-image/",status_code=200)
async def upload_image(file: UploadFile = File(...)):
    content,filename = await imageprocessing.validate_upload(file=file)
    data_url = await imageprocessing.local_image_to_data_url(file_name=filename,file_content=content)
    response = await imageModel.model_image(data_url)
    return {"data": response}

@app.post("//",status_code=200)
async def get_option(item):
    pass