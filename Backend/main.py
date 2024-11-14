from fastapi import FastAPI
from sqlmodel import SQLModel

from database import engine

from routers import registration

import models

app = FastAPI(title="Krishi-Hut: Backend")

app.include_router(registration.router)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)