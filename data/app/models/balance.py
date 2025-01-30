import datetime
from unicodedata import numeric
from sqlalchemy.dialects.postgresql import UUID
import uuid
from xmlrpc.client import DateTime
from app.database import Base
from sqlalchemy import Column, String, ForeignKey ,Numeric, Integer, Float, DateTime, Text


class Balance(Base):
    __tablename__ = 'balance'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    balance = Column(Numeric(10, 2), nullable=False, default=0.0)
    last_updated = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    cvu = Column(String(22), unique=True, nullable=False)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True)