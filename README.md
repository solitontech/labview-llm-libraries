# labview-llm-libraries
This repository holds the LabVIEW Large Language Model Libraries using which users can quickly build AI capabilities into their applications. The repository focuses on providing building blocks for AI application development in LabVIEW using which developers can compose their own solution. The ideas is to have composablity in the libraries.

# What can you do with these libraries?
1. Interact with your favorite large language models (LLMs) using LabVIEW in 5 min.
2. Build your own simple RAG solution (Chat Bot) in LabVIEW in 20 min.
3. Vision is to provide integration to data analysis and visualization modules (SAAS)

# Key Features of the Libraries
1. Interact with large language models (LLMs) be it online or offline models. The libraries provide pre-built support for popular models. But you can also use the abstraction to build interface supports to your own models, if needed.
2. Use the libraries to build your a RAG (Retrieval-Augmented Generation) system, which combines the power of LLMs with a retrieval mechanism to enhance the quality and relevance of generated content.
3. Interact with the vector databases for efficient storage and retrieval of embeddings. The libraries provide seamless integration with popular vector databases, but also allow for custom implementations if required.
4. Utilize the libraries to build your own data processing pipelines for tasks such as data extraction, chunking, embedding.
5. Interfaces to do data analysis and dynamic visualization using LabVIEW

# Getting Started
To be documented

# Models supported

| Model Name | Provider | Support Available | Online/Offline |
|----------|----------|----------|----------|
| gpt-4o-mini | OpenAI | Yes | Online |
| gpt-4o | OpenAI |  Yes | Online |
| gpt-4-turbo | OpenAI |  Yes | Online |
| gpt-4 | OpenAI |  Yes | Online |
| gpt-3.5-turbo | OpenAI |  Yes | Online |
| gpt-4o-mini | AzureOpenAI | Yes | Online |
| gpt-4o | AzureOpenAI |  Yes | Online |
| gpt-4 | AzureOpenAI |  Yes | Online |
| gpt-3.5-turbo | AzureOpenAI |  Yes | Online |
| Claude 3.5 Sonnet | Anthropic | Yes | Online |
| Claude 3 Opus | Anthropic | Yes | Online |
| Claude 3 Sonnet | Anthropic | Yes | Online |
| Claude 3 Haiku | Anthropic | Yes | Online |
| Llama 3.1 8B | Ollama | Yes | Offline |
| Llama 3 8B | Ollama | Yes | Offline |
| Phi 3 Mini 3.8B | Ollama | Yes | Offline |
| Gemma 2 2B | Ollama | Yes | Offline |
| Mistral 7B | Ollama | Yes | Offline |
| tinyllama | Ollama | Yes | Offline |
| gemini-2.0-flash | Gemini | Yes | Online |
| gemini-2.0-flash-lite | Gemini | Yes | Online |
| gemini-1.5-flash | Gemini | Yes | Online |
| gemini-1.5-flash-8b | Gemini | Yes | Online |
| gemini-1.5-pro | Gemini | Yes | Online |

# Embedding Models supported

| Model Name | Provider | Support Available | Online/Offline |
|----------|----------|----------|----------|
| text-embedding-ada-002 | OpenAI | Yes | Online |
| text-embedding-3-large | OpenAI |  Yes | Online |
| text-embedding-3-small | OpenAI |  Yes | Online |
| nomic-embed-text | Ollama |  Yes | Offline |
| mxbai-embed-large | Ollama |  Yes | Offline |
| text-embedding-004 | Gemini |  Yes | Online |

# Vector Databases Supported

| Database Name | Provider | Support Available | Online/Offline | Setup Instruction |
|----------|----------|----------|----------|----------|
| Weviate | Weaviate | No | Offline |  |
| Qudrant | Quadrant | Yes | Offline | [qdrant setup](https://qdrant.tech/documentation/quickstart/) |

