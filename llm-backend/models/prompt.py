from pydantic import BaseModel
from beanie import Document

class PromptPost(BaseModel):
    session_id: str = "DEFAULT_SESSION_ID"
    prompt: str




class PromptResponse(BaseModel):
    session_id: str
    prompt: str
    response: str


class Session(Document):
    session_id: str
    prompt_history: list[PromptResponse]

    class Settings:
        name = "sessions"
        indexes = ["session_id"]
        
