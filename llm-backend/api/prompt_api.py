import fastapi
from fastapi.responses import StreamingResponse

from models.prompt import PromptPost
from services.prompt_service import get_openai_generator

router = fastapi.APIRouter()

@router.post('/prompt/')
async def stream(body: PromptPost):
    print(body)
    return StreamingResponse(get_openai_generator(body.prompt), media_type='text/event-stream')
