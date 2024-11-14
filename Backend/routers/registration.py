from datetime import date
from fastapi.responses import JSONResponse

import routers.dependencies as d
import hashing

router = d.APIRouter(tags=["Registration"])

@router.post("/user/", status_code=d.status.HTTP_201_CREATED)
def user_registration(request_body: d.schemas.UserSchema, db: d.Session = d.Depends(d.get_db)):
    try:
        check_user = db.exec(d.select(d.models.User).where(d.models.User.email == request_body.email)).first()
        if check_user:
            raise d.HTTPException(status_code=d.status.HTTP_400_BAD_REQUEST, detail="Already Registered")
        else:
            request_body.password = hashing.get_hashed_password(request_body.password)
            new_user = d.models.User(first_name=request_body.first_name, last_name=request_body.last_name, email=request_body.email, password=request_body.password, ac_creation=get_current_date_time())

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            raise d.HTTPException(status_code=d.status.HTTP_201_CREATED, detail="Registration Successful")
            # return JSONResponse(status_code=d.status.HTTP_201_CREATED, content=new_user)
        
    except Exception as e:
        return e
    




def get_current_date_time():
    return date.today()
