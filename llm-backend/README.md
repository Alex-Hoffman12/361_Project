# LLM Backend Setup

In order for the API to run the OpenAI API key must be set in the 'OPENAI_API_KEY' environmental variable.

To run build and run with Docker compose a .env file is needed. An example can be found in .env.example which (at the time of writing) looks like this:

```
OPENAI_API_KEY="YOUR_API_KEY_HERE"
ENVIRONMENT=dev
DATABASE_URL=mongo-db

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_DATABASE=LLMMonitor
MONGO_INITDB_ROOT_PASSWORD=UMKCTest
MONGO_USER=umkc
MONGO_PASSWORD=UMKCTest
```
