# routers/answers.py

from app.database import get_db
from ..models.answers import Answer
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session



router = APIRouter(prefix="/answers", tags=["answers"])

@router.get("/")
def get_all_answers(db: Session = Depends(get_db)):
    answers = db.query(Answer).all()
    return answers

@router.get("/{answer_id}")
def get_answer_by_id(answer_id: str, db: Session = Depends(get_db)):
    answer = db.query(Answer).filter(Answer.id == answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    return answer