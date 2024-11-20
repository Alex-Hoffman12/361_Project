from os import getenv
from openai import OpenAI
from dotenv import load_dotenv
from state import messages  # Import messages from the new state module

load_dotenv()

client = OpenAI(
    api_key=getenv("OPENAI_API_KEY"),
)

async def get_openai_generator(prompt: str):
    # This is where we need to add the custom prompt
    messages.append({"role": "user", "content": prompt})

    openai_stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        stream=True
    )

    complete_responses = []

    for event in openai_stream:
        for response in event.choices:
            if response.delta.content != "" and response.delta.content != None:
                current_response = response.delta.content
                complete_responses.append(current_response)
                yield "data: " + current_response + "\n\n"

    final_message = "".join(complete_responses)
    messages.append({"role": "assistant", "content": final_message})
