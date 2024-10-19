import grpc
import pandas as pd
import json
import output.dataframe_analyzer_pb2 as dataframe_analyzer_pb2
import output.dataframe_analyzer_pb2_grpc as dataframe_analyzer_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:8000') as channel:
        stub = dataframe_analyzer_pb2_grpc.AnalyzeDataframeStub(channel)

        #filedata = pd.read_csv(r"C:\Users\rajaram.nr\Downloads\sample_sales_data.csv")
        #filedata = pd.read_excel(r"C:\Users\rajaram.nr\Downloads\Spartans - 2023 Group Challenge Tracker.xlsx", sheet_name='Challenge Tracker', engine="openpyxl", skiprows=[0,1])
        #data = filedata.values.tolist()
        #headers = filedata.columns.tolist()
        #data.insert(0,headers)
        #json_data = json.dumps(data)

        spartans_data = pd.DataFrame()
        spartans_data = pd.read_excel("Spartans - 2023 Group Challenge Tracker.xlsx", sheet_name='Challenge Tracker', engine="openpyxl")
        #columns = filedata.columns.tolist()
        #filedata = filedata.values.tolist()

        column_names = spartans_data.iloc[1]

        columns_temp = []
        rem = "'"
        for column in column_names:
            if column == "Achieved\nTarget (km)":
                columns_temp.append("Achieved Target (km)")
            elif column == "Annual\nTarget (km)":
                columns_temp.append("Annual Target (km)")
            elif type(column) == str and "'" in column:
                column = column.replace("'"," ")
                columns_temp.append(column)
            else:
                columns_temp.append(column)

        spartans_data.columns = columns_temp

        # Remove unwanted rows and columns in the data frame
        spartans_data = spartans_data.iloc[2:]
        _ = spartans_data.pop(spartans_data.columns[0])

        # Replace the NaN with respective values in the data frame
        spartans_data["Sign up for Challenge?"] = spartans_data["Sign up for Challenge?"].fillna("No")
        spartans_data["Mission"] = spartans_data["Mission"].fillna("")
        spartans_data["Project Name"] = spartans_data["Project Name"].fillna("")
        spartans_data = spartans_data.fillna(0)

        data = spartans_data.values.tolist()
        headers = spartans_data.columns.tolist()
        data.insert(0,headers)
        json_data = json.dumps(data)

        question = 'In the month of May 23 who is the better runner between Ganesh Devaraj and Balasubramanian A'

        request = dataframe_analyzer_pb2.AnalyzeDataframeRequest(dataframe = json_data, user_question = question)

        response = stub.GetAnswer(request)
        code = response.data
        datatype = response.datatype
        print(datatype)
        print(code)

if __name__ == '__main__':
    run()


