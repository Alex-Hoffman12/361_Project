from os import getenv
from openai import OpenAI
from dotenv import load_dotenv
from main import messages

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

    final_message = ""
    for data in complete_responses:
        final_message += data


    messages.append({"role": "assistant", "content": final_message})