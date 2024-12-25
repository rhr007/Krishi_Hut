from fastapi import APIRouter,status, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from datetime import datetime

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


@router.get('/approved', response_model=list[schemas.AdResponseSchema])
def read_all_ads(db: Session = Depends(get_db)):
    results = db.exec(select(models.Ads).where(models.Ads.is_approved == True)).all()
    return results 


@router.get('/unapproved', response_model=list[schemas.AdResponseSchema])
def read_all_ads(db: Session = Depends(get_db)):
    results = db.exec(select(models.Ads).where(models.Ads.is_approved == False)).all()
    return results


@router.get('/{id}', response_model=schemas.AdResponseSchema)
def read_single_ad(id, db: Session = Depends(get_db)):
    results = db.exec(select(models.Ads).where(models.Ads.id == id)).first()
    return results


@router.put('/accept/{id}')
def accept_an_ad(id, db: Session = Depends(get_db), current_user = Depends(Oauth2.get_current_user)):
    admin_id = current_user.id
    
    ad = db.exec(select(models.Ads).where(models.Ads.id == id)).first()
    ad.is_approved = True
    ad.approved_by = admin_id
    ad.approved_time = datetime.now()

    db.add(ad)
    db.commit()
    db.refresh(ad)
    return ad


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def accept_an_ad(id, db: Session = Depends(get_db), current_user = Depends(Oauth2.get_current_user)):
    
    ad = db.exec(select(models.Ads).where(models.Ads.id == id)).first()

    db.delete(ad)
    db.commit()

@router.get('/user/')
def read_all_ads_of_a_user( db: Session = Depends(get_db), current_user = Depends(Oauth2.get_current_user)):
    user_id = current_user.id

    ads = db.exec(select(models.Ads).where(models.Ads.user_id == user_id).where(models.Ads.is_approved == True)).all()

    return ads
