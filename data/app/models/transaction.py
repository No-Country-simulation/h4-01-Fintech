from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base
from sqlalchemy import Column, String, ForeignKey, Enum, Numeric,Integer, Float, DateTime, Text
import datetime

class Transaction(Base):
    __tablename__ = 'transaction'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quantity = Column(Numeric(10, 4), nullable=False)
    price = Column(Numeric(15, 2), nullable=False)
    transaction_type = Column(Enum('BUY', 'SELL', name='transaction_transaction_type_enum'), nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    location = Column(String(255), nullable=False)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    assetId = Column(UUID(as_uuid=True), ForeignKey('asset.id'))