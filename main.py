from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from laya import Router
from decider import make_decision
from fastapi.middleware.cors import CORSMiddleware
from logging import Logger
from pydantic import BaseModel


class DecisionRequest(BaseModel):
    option1: str
    option2: str
    context: str = ""


router = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global router
    router = Router(preload=True)
    yield

app = FastAPI(lifespan=lifespan)

logger = Logger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] while developing, tighten later
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.post('/ask')
def get_decision(body: DecisionRequest):
    logger.info("Making decision")
    if not router:
        raise HTTPException(500, "Error loading model")

    decison = make_decision(router, body.option1, body.option2, body.context)

    return {"winner": decison}
