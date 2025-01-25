# routers/asset.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.asset import Asset
from app.database import get_db

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