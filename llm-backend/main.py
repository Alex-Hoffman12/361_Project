from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse

messages = []

from api import prompt_api
from models.prompt import PromptPost
from services.prompt_service import get_openai_generator

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post('/prompt/')
async def stream(body: PromptPost):
    print(body)
    return StreamingResponse(get_openai_generator(body.prompt), media_type='text/event-stream')



def configure_routing():
    app.include_router(prompt_api.router)

# Use this if you have Pycharm
# configure_routing()

# Uses this if you don't have PyCharm
# def main():
#     configure_routing()
#     uvicorn.run(app, host="0.0.0.0",port=8005)
#
# if __name__ == "__main__":
#     main()
# else:
#     configure_routing()