from fastapi import APIRouter, Depends, status
from sqlmodel import Session

import models, schemas
from database import get_db