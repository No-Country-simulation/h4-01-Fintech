# routers/accounts.py
from ..models.accounts import Account
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.get("/")
def get_all_accounts(db: Session = Depends(get_db)):
    accounts = db.query(Account).all()
    return accounts

@router.get("/{account_id}")
def get_account_by_id(account_id: str, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account