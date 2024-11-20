from os import getenv

from openai import OpenAI
from models.prompt import PromptResponse, Session

import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"),
)

async def get_openai_generator(prompt: str):

    messages = []
    
    messages.append({"role": "user", "content": prompt})

    openai_stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        # response_format={"type": "json_object"}
        # max_tokens=60,
        stream=True
    )
    # openai_stream = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "user", "content": prompt}],
    #     temperature=0.0,
    #     stream=True,
    # )
    complete_responses = []

    for event in openai_stream:
        for response in event.choices:
            if response.delta.content != "" and response.delta.content != None:
                current_response = response.delta.content
                complete_responses.append(current_response)
                yield "data: " + current_response + "\n\n"
    
    prompt_response = PromptResponse(
        session_id="DEFAULT_SESSION_ID",
        prompt=prompt,
        response= "".join(complete_responses)
    )
    