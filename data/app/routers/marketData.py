# routers/marketData.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..models.marketData import MarketData
from app.database import get_db
from math import ceil
import pandas as pd
from datetime import datetime

router = APIRouter(prefix="/market-data", tags=["market-data"])

@router.get("/")
def get_all_market_data(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    if page < 1:
        raise HTTPException(status_code=400, detail="Page number must be greater than or equal to 1.")
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be greater than or equal to 1.")

    offset = (page - 1) * size

    market_data_query = db.query(MarketData).limit(size).offset(offset)
    
    market_data = market_data_query.all()

    market_data_df = pd.DataFrame([item.__dict__ for item in market_data])

    total_count = db.query(MarketData).count()

    total_pages = ceil(total_count / size)

    data_dict = market_data_df.to_dict(orient='records')

    return {
        "page": page,
        "size": size,
        "total_pages": total_pages,
        "total_count": total_count,
        "data": data_dict
    }

@router.get("/{market_data_id}")
def get_market_data_by_id(market_data_id: str, db: Session = Depends(get_db)):
    market_data = db.query(MarketData).filter(MarketData.id == market_data_id).first()
    if not market_data:
        raise HTTPException(status_code=404, detail="Market data not found")
    return market_data

@router.get("/by-date/")
def get_market_data_by_date(
    start_date: datetime = Query(..., description="Start date in YYYY-MM-DD format"),
    end_date: datetime = Query(..., description="End date in YYYY-MM-DD format"),
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):
    if page < 1:
        raise HTTPException(status_code=400, detail="Page number must be greater than or equal to 1.")
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be greater than or equal to 1.")

    offset = (page - 1) * size

    market_data_query = db.query(MarketData).filter(
        MarketData.timestamp >= start_date,
        MarketData.timestamp <= end_date
    ).limit(size).offset(offset)
    
    market_data = market_data_query.all()

    market_data_df = pd.DataFrame([item.__dict__ for item in market_data])

    total_count = db.query(MarketData).filter(
        MarketData.timestamp >= start_date,
        MarketData.timestamp <= end_date
    ).count()

    total_pages = ceil(total_count / size)

    data_dict = market_data_df.to_dict(orient='records')

    return {
        "page": page,
        "size": size,
        "total_pages": total_pages,
        "total_count": total_count,
        "data": data_dict
    }

@router.get("/by-price/")
def get_market_data_by_price(
    min_price: float = Query(..., description="Minimum price"),
    max_price: float = Query(..., description="Maximum price"),
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):
    if page < 1:
        raise HTTPException(status_code=400, detail="Page number must be greater than or equal to 1.")
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be greater than or equal to 1.")

    offset = (page - 1) * size

    market_data_query = db.query(MarketData).filter(
        MarketData.price >= min_price,
        MarketData.price <= max_price
    ).limit(size).offset(offset)
    
    market_data = market_data_query.all()

    market_data_df = pd.DataFrame([item.__dict__ for item in market_data])

    total_count = db.query(MarketData).filter(
        MarketData.price >= min_price,
        MarketData.price <= max_price
    ).count()

    total_pages = ceil(total_count / size)

    data_dict = market_data_df.to_dict(orient='records')

    return {
        "page": page,
        "size": size,
        "total_pages": total_pages,
        "total_count": total_count,
        "data": data_dict
    }
