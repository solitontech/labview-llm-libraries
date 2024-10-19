from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence
from llm.OpenAI_LLMs import ChatLLM

FILTER_DATAFRAME_PROGRAM_GENERATOR_PROMPT = """

System:
You act as an expert in writing python program to filter information from a 2d list based on the user-question and provide the filtered information in a suitable format that will be more understandable to the user.
Summarize the filtered information to the user.
You decide what is the best way to represent filtered information but represent the filtered information in only one form - either as a text or dataframe or image.

Rules for writing python programs
1. Write python program to retrieve information from a 2d list to answer the user-question
2. Extract the same column names as mentioned in the headers
3. The python program should use pandas library for filtering specific information from the 2d list, lida and matplotlib library for plotting the filtered data in graph if needed
4. The python program should expect the 2d list as input and should output the specific informtaion that user asked for in the suitable format that will be easily understandable by the user
5. The generated python code should run over the 2d list named 'data' and give the output. 
6. Input to the data variable will be set from the main python code. Don't give any sample inputs to the 'data' variable in the generated python code
7. The generated python code should not print or show any result. Instead it should return the result to the msin python code
6. The generated python code should make the necessary function calls within itself and give out the result

Generate python program to retrieve answer for the {user_question} from the 2d list containing the following column headers - {column_headers}. 
Generate only code without explanation

"""

FILTER_DATAFRAME_PROGRAM_GENERATOR_PROMPT = """
You are an expert Python developer tasked with writing code that filters specific information from a dataframe based on a user question. The Python code should:

Take the following inputs:

A list of {column_headers} which defines the structure of the dataframe.
A {user_question} that guides how to filter and process the data.

Use the pandas, lida, and matplotlib libraries exclusively to handle the filtering and visualization tasks.

Include variable named data in the python code. The input to the data variable will be given from the main python code. Do not include any sample data initialization for the data variable in the generated code

Determine the best way to represent the filtered information based on the question:

If a text-based answer is sufficient, summarize the result based on the user question and set the result variable with the summarized answer.
If tabular data is needed, display it as a 2d list. When displaying as a 2d list, display along with column headers so that users can understand the data better
If visual representation is necessary, generate an appropriate graph (e.g., line plot, bar chart). Use visualization only when it is needed
Ensure the generated Python code can be executed using the exec() function and provides the result when the data variable is passed from the main Python code. Do not include any sample data initialization for the data variable in the generated code. this is very important.

Don't use print statements to return the result. Instead store the result text or dataframe in the variable named "result". I will access this variable from my main program to retrieve the result

Do not include any text, comments, or explanations. Do not prepend "python", triple backticks like ``` or any other language identifier. Only return the raw Python code block, ensuring it can be directly executed using exec().


"""

filter_dataframe_prompt_template = PromptTemplate(
    input_variables = ["column_headers","user_question"],
    template = FILTER_DATAFRAME_PROGRAM_GENERATOR_PROMPT,
    validate_template = False,
)

def filter_dataframe_program_generator(column_headers, question):
    sequence = RunnableSequence(filter_dataframe_prompt_template | ChatLLM)
    result = sequence.invoke({"column_headers":column_headers,"user_question":question})
    return result
