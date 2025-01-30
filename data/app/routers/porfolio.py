# routers/portfolio.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.portfolio import Portfolio
from app.database import get_db

router = APIRouter(prefix="/portfolios", tags=["portfolios"])

@router.get("/")
def get_all_portfolios(db: Session = Depends(get_db)):
    portfolios = db.query(Portfolio).all()
    return portfolios

@router.get("/{portfolio_id}")
def get_portfolio_by_id(portfolio_id: int, db: Session = Depends(get_db)):
    portfolio = db.query(Portfolio).filter(Portfolio.portfolio_id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio