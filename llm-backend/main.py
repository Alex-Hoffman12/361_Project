from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from api import prompt_api

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


def configure_routing():
    app.include_router(prompt_api.router)

# Uses this if you don't have PyCharm
# def main():
#     configure_routing()
#     uvicorn.run(app, host="0.0.0.0",port=8005)
#
# if __name__ == "__main__":
#     main()
# else:
#     configure_routing()