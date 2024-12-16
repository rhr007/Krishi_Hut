from fastapi import APIRouter,status, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select

from database import get_db
import models, schemas, Oauth2

router = APIRouter(prefix='/ads', tags=["Ads"])

@router.post('/', status_code=status.HTTP_201_CREATED)
def upload_ad(ad_body: schemas.AdRequestBody, db: Session = Depends(get_db), current_user = Depends(Oauth2.get_current_user)):
    new_ad = dict(ad_body)
    new_ad['user_id'] = current_user.id
    new_ad = models.Ads.model_validate(new_ad)

    db.add(new_ad)
    db.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'message': 'ad posted'})


@router.get('/all', response_model=list[schemas.AdResponseSchema])
def read_all_ads(db: Session = Depends(get_db)):
    results = db.exec(select(models.Ads)).all()
    return results 