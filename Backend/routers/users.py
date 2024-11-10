from fastapi import APIRouter

router = APIRouter(tags=["Users"])

@router.get("/users/")
def test():
    return {"data": "User API"}