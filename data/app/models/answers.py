# app/models/answers.py
import uuid
from sqlalchemy import Column, Integer, UUID, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base
from sqlalchemy import Column, String, Integer, Float, DateTime, Text




class Answer(Base):
    __tablename__ = 'answers'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    questionId = Column(UUID(as_uuid=True), ForeignKey('questions.id'), nullable=False)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    answer = Column(Integer, nullable=False)