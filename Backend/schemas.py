from pydantic import BaseModel, EmailStr
from datetime import date, datetime

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    contact: str
    password: str

class UserBasicInfo(BaseModel):
    id: int
    first_name: str
    last_name: str
    contact: str
    email: EmailStr
    ac_creation: date
    is_admin: bool


class OTPBody(BaseModel):
    email: EmailStr
    otp: str

class Token(BaseModel):
    access_token: str
    token_type: str
    is_admin: bool


class AdRequestBody(BaseModel):
    title: str
    catagory: str
    description: str
    location: str
    price: float
    url: str

class UserInfoForAd(BaseModel):
    id: int
    first_name: str
    contact: str
    email: EmailStr


class AdResponseSchema(AdRequestBody):
    id: int
    approved_time: datetime | None
    url: str
    user: UserInfoForAd

class ProfilePicture(BaseModel):
    url: str