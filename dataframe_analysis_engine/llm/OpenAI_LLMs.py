import os
from langchain_community.llms import OpenAI
#from langchain_community.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI

ChatLLM = ChatOpenAI(
    temperature=0.9,
    model=os.getenv("OPENAI_CHAT_MODEL","gpt-4o-mini"),
    api_key=os.getenv("OPENAI_API_KEY"),
    max_retries=5,
    verbose=True,
)