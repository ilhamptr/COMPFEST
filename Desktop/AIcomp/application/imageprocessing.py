import base64
from fastapi import UploadFile,HTTPException
from mimetypes import guess_type

async def validate_upload(file:UploadFile):
    allowed_extension = {"jpg", "jpeg", "png", "webp"}
    max_file_size = 5 * 1024 * 1024 
    extension = file.filename.rsplit(".",1)[-1].lower()
    if extension not in allowed_extension:
        raise HTTPException(status_code=400,detail="unsupported file extension")
    content = await file.read()
    if len(content) > max_file_size:
        raise HTTPException(status_code=400,detail="file too large (maximum 5MB)")
    return content,file.filename

# Function to encode a local image into data URL 
async def local_image_to_data_url(file_name:str,file_content:str):
    mime_type, _ = guess_type(file_name)
    if mime_type is None:
        mime_type = 'application/octet-stream'  
    base64_encoded_data = base64.b64encode(file_content).decode('utf-8')
    return f"data:{mime_type};base64,{base64_encoded_data}"