# routers/questions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.questions import Question
from app.database import get_db

router = APIRouter(prefix="/questions", tags=["questions"])

@router.get("/")
def get_all_questions(db: Session = Depends(get_db)):
    questions = db.query(Question).all()
    return questions

@router.get("/{question_id}")
def get_question_by_id(question_id: str, db: Session = Depends(get_db)):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question