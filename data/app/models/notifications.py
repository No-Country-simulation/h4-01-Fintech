import datetime
from uuid import UUID
import uuid
from app.database import Base
from sqlalchemy import Column, Boolean, ForeignKey, String, Integer, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID

class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message = Column(Text, nullable=False)
    read_status = Column(Boolean, nullable=False, default=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'))