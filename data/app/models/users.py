from enum import Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base
from sqlalchemy import Column, Boolean, String, Integer, Float, DateTime, Text, Enum

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True)
    name = Column(String)
    passwordhash = Column(String)
    image = Column(String)
    dni = Column(String, unique=True)
    token_expires_at = Column(String)
    is_active = Column(Boolean, nullable=False, default=False)
    is_validated_email = Column(Boolean, nullable=False, default=False)
    risk_percentage = Column(Integer)
    role = Column(Enum('USER', 'ADMIN', name='users_role_enum'), nullable=False, default='USER')