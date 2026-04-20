import pandas as pd
import json
import grpc
from concurrent import futures
from time import sleep
import output.dataframe_analyzer_pb2 as dataframe_analyzer_pb2
import output.dataframe_analyzer_pb2_grpc as dataframe_analyzer_pb2_grpc
from functions import helpers


class AnalyzeDataframe(dataframe_analyzer_pb2_grpc.AnalyzeDataframeServicer):
    def GetAnswer(self, request, context):
        json_text = request.dataframe
        list_2d = json.loads(json_text)
        question = request.user_question

        dataframe = pd.DataFrame(list_2d[1:],columns=list_2d[0])

        #result = "dummy data"
        code = helpers.filter_dataframe(dataframe,question)
        print(code)
        data = dataframe
        exec(code)
        res = locals().get('result','result variable not found')
        result_json = helpers.convert_result_to_json(res)
        return dataframe_analyzer_pb2.AnalyzeDataframeResponse(data = result_json, datatype = "text") # datatype will be changed in the future versions. It will reflect the exact datatype that the result is generated
        #return super().GetAnswer(request, context)

def serve():

    # create a grpc server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # add the AnalyzeDataframeService to the server
    dataframe_analyzer_pb2_grpc.add_AnalyzeDataframeServicer_to_server(AnalyzeDataframe(),server)

    # bind the server to a specific port
    server.add_insecure_port('[::]:8000')

    # start the server
    server.start()
    print("Server is running on port 8000....")

    # keep the server running
    try:
        while True:
            sleep(86400) # sleep for day
    except KeyboardInterrupt:
        server.stop(0)
        print("server stopped....")

if __name__ == '__main__':
    serve()
