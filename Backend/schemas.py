from pydantic import BaseModel, EmailStr

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    contact: str
    password: str

class UserBasicInfo(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool


class OTPBody(BaseModel):
    email: EmailStr
    otp: str

class Token(BaseModel):
    access_token: str
    token_type: str
