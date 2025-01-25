# routers/marketData.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.marketData import MarketData
from app.database import get_db
from math import ceil
import pandas as pd

router = APIRouter(prefix="/market-data", tags=["market-data"])

@router.get("/")
def get_all_market_data(page: int = 1, size: int = 10, db: Session = Depends(get_db)):
    # Validación de los parámetros
    if page < 1:
        raise HTTPException(status_code=400, detail="Page number must be greater than or equal to 1.")
    if size < 1:
        raise HTTPException(status_code=400, detail="Size must be greater than or equal to 1.")

    # Calcular el offset
    offset = (page - 1) * size

    # Consultar los datos con paginación
    market_data_query = db.query(MarketData).limit(size).offset(offset)
    
    # Obtener los datos
    market_data = market_data_query.all()

    # Convertir los datos a un DataFrame de Pandas
    market_data_df = pd.DataFrame([item.__dict__ for item in market_data])

    # Si es necesario, realizar un análisis o manipulación de los datos
    # Ejemplo: Filtrar, agrupar, hacer cálculos, etc.
    # En este caso, solo pasamos el DataFrame para que puedas usarlo más tarde.

    # Contar el total de registros disponibles para calcular la cantidad de páginas
    total_count = db.query(MarketData).count()

    # Calcular el total de páginas
    total_pages = ceil(total_count / size)

    # Convertir el DataFrame a un diccionario para devolverlo en la respuesta
    data_dict = market_data_df.to_dict(orient='records')

    # Retornar los datos procesados junto con la información de paginación
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