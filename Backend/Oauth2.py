
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import Session

import JWT_Token
import models
from database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/signin")

def get_current_user(token:str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    id = JWT_Token.verify_token(token)
    if id != 0:
        user = db.get(models.User, id)
        if user is None:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'unauthorized'})
        return user
    else:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={'message': 'unauthorized'})
