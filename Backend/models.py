from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True, index=True, default=None)
    first_name: str
    last_name: str | None
    email: EmailStr
    password: str
    nid: str
    ac_creation: datetime
    ac_updation: datetime | None = Field(default=None)