from pydantic import BaseModel, EmailStr

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    contact: str
    password: str

class RegistrationResponse(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
