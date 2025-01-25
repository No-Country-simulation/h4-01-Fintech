import uuid
from app.database import Base
from sqlalchemy import Column, String, ForeignKey, Integer, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID

class MarketData(Base):
    __tablename__ = 'marketData'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    timestamp = Column(DateTime, nullable=False)
    asset_id = Column(UUID(as_uuid=True), ForeignKey('asset.id'))
    price = Column(Float, nullable=False)
    name = Column(String(255))