from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict
from lida import Manager, llm
import pandas
from prompts.prompt_filter_dataframe_program_generator import filter_dataframe_program_generator


app = FastAPI()

class FilterDataframeRequest(BaseModel):
    column_headers: list     # Column headers of the dataframe
    user_question: str       # user question

# generate python function to filter dataframe
@app.post ("/api/filter_dataframe")
async def filter_dataframe(request: FilterDataframeRequest):
    try:
        headers = request.column_headers
        question = request.user_question

        code = filter_dataframe_program_generator({"column-headers":headers,"user-question":question})
        return code
    
    except Exception:
        raise HTTPException(status_code=400, detail=str(Exception))


"""
class UploadFileRequest(BaseModel):
    filepath: str         # file path containing the tabular data
    filetype: str         # type of the file. csv, xlsx etc. Currently supporting only csv and xlsx files
    sheet_name: str       # containing the sheet name. this is required only if the file type is xlsx

# Function to read the file received by the client, parse the file and get the contents of the file
@app.post ("/api/upload-file")
async def upload_file(request: UploadFileRequest):
    try:
        if request.filetype == csv:
            filedata = pandas.read_csv(request.filepath)
        if request.filetype == xlsx:
            filedata = pandas.read_excel(io = request.filepath, sheet_name=request.sheet_name)

        column_headers = filedata.columns
"""

""""
# Defining the request data
class VisualizationRequest(BaseModel):
    tabular_data: list[list[str]]       # dataframe received from the client
    question: str        # user question

    # model_config = ConfigDict(arbitrary_types_allowed = True)

@app.post("/api/visualize-dataframe")
async def visualize_dataframe(request: VisualizationRequest):
    try:
        data = request.tabular_data
        question = request.question

        dataframe = pandas.DataFrame(data) # convert 2D array of data to Dataframe


        # return {"answer:": f"The question sent is: {question}"}
    except Exception:
        raise HTTPException(status_code=400, detail=str(Exception))
    
"""
    
if __name__ == "__main__":
    import uvicorn
    print("Running Service...")
    uvicorn.run("app:app", host = "127.0.0.1", port = 8000, reload =  True)
    
