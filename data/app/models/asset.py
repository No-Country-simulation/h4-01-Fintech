# app/models/asset.py
import datetime
from unicodedata import numeric
import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Numeric
from app.database import Base
from sqlalchemy.dialects.postgresql import UUID

class Asset(Base):
    __tablename__ = 'asset'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    RiskProfile = Column(Integer)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    symbol = Column(String(255), unique=True)
    name = Column(String(255))
    asset_type = Column(String(255))
    sector = Column(String(255))
    price = Column(Numeric(10, 2), default=0.0)
    currency = Column(String)
    market_price = Column(Numeric(10, 2), default=0.0)
    info = Column(Text)