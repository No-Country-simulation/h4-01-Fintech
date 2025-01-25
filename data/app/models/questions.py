import uuid
from app.database import Base
from sqlalchemy import Column, String, Boolean, Integer, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID

class Question(Base):
    __tablename__ = 'questions'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(String, nullable=False)
    order = Column(String, unique=True)
    minRange = Column(Integer, nullable=False, default=1)
    maxRange = Column(Integer, nullable=False, default=10)
    minRangeLabel = Column(String, nullable=False)
    maxRangeLabel = Column(String, nullable=False)
    isDeleted = Column(Boolean, nullable=False, default=False)