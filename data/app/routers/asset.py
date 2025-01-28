# routers/asset.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..models.asset import Asset
from ..models.marketData import MarketData
from app.database import get_db
from math import ceil
import pandas as pd
from datetime import datetime

router = APIRouter(prefix="/assets", tags=["assets"])

@router.get("/")
def get_all_assets(db: Session = Depends(get_db)):
    assets = db.query(Asset).all()
    return assets

@router.get("/{asset_id}")
def get_asset_by_id(asset_id: str, db: Session = Depends(get_db)):
    asset = db.query(Asset).filter(Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.get("/{asset_id}/market-data/")
def get_market_data_by_asset(
    asset_id: str,
    start_date: datetime = Query(None, description="Start date in YYYY-MM-DD format"),
    end_date: datetime = Query(None, description="End date in YYYY-MM-DD format"),
    min_price: float = Query(None, description="Minimum price"),
    max_price: float = Query(None, description="Maximum price"),
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):
    if page < 1:
        raise HTTPException(status_code=400, detail="Page number must be greater than or equal to 1.")
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be greater than or equal to 1.")

    offset = (page - 1) * size

    # Filtro base por asset_id
    market_data_query = db.query(MarketData).filter(MarketData.asset_id == asset_id)

    # Filtros adicionales
    if start_date and end_date:
        market_data_query = market_data_query.filter(
            MarketData.timestamp >= start_date,
            MarketData.timestamp <= end_date
        )
    if min_price and max_price:
        market_data_query = market_data_query.filter(
            MarketData.price >= min_price,
            MarketData.price <= max_price
        )

    # Paginación
    market_data_query = market_data_query.limit(size).offset(offset)
    market_data = market_data_query.all()

    # Convertir a DataFrame para facilitar la manipulación
    market_data_df = pd.DataFrame([item.__dict__ for item in market_data])

    # Contar el total de registros (sin paginación)
    total_count = market_data_query.count()

    # Calcular el total de páginas
    total_pages = ceil(total_count / size)

    # Convertir a diccionario para la respuesta
    data_dict = market_data_df.to_dict(orient='records')

    return {
        "page": page,
        "size": size,
        "total_pages": total_pages,
        "total_count": total_count,
        "data": data_dict
    }