from sqlalchemy import Column, String, Integer, BigInteger, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid
from app.database import Base


class Account(Base):
    __tablename__ = 'accounts'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    provider = Column(String, nullable=False)
    providerAccountId = Column(String, nullable=False)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    type = Column(String, nullable=False)
    refresh_token = Column(String)
    access_token = Column(String)
    expires_at = Column(BigInteger)
    token_type = Column(String)
    scope = Column(String)
    id_token = Column(String)
    session_state = Column(String)
    oauth_token_secret = Column(String)
    oauth_token = Column(String)