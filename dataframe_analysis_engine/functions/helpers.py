import pandas
import json
from prompts.prompt_filter_dataframe_program_generator import filter_dataframe_program_generator

def filter_dataframe(dataframe, question):
    column_headers = dataframe.columns  # First row is considered as the headers
    print(column_headers)

    response = filter_dataframe_program_generator(column_headers,question)
    code = response.content
    return code

def convert_result_to_json(res):
    if res == 'variable not found':
        res = 'Data not found'

    # Convert data to json to send to client
    result_json = json.dumps(res)
    return result_json