from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from datetime import date

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True, index=True, default=None)
    first_name: str
    last_name: str | None
    email: EmailStr = Field(unique=True, index=True)
    password: str
    is_active: bool | None = Field(default=False)
    ac_creation: date = Field(default=None)
    ac_updation: date | None = Field(default=None)