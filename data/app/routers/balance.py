# routers/balance.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.balance import Balance
from app.database import get_db

router = APIRouter(prefix="/balances", tags=["balances"])

@router.get("/")
def get_all_balances(db: Session = Depends(get_db)):
    balances = db.query(Balance).all()
    return balances

@router.get("/{balance_id}")
def get_balance_by_id(balance_id: str, db: Session = Depends(get_db)):
    balance = db.query(Balance).filter(Balance.id == balance_id).first()
    if not balance:
        raise HTTPException(status_code=404, detail="Balance not found")
    return balance