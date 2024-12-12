from fastapi import FastAPI
from sqlmodel import SQLModel

from database import engine

from routers import registration, otp_actions

import models

app = FastAPI(title="Krishi-Hut: Backend")

app.include_router(registration.router)
app.include_router(otp_actions.router)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine) #This will create the tables in database.
