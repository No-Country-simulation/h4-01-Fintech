from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from sqlalchemy import Column, String, Numeric, ForeignKey, Integer, Float, DateTime, Text


class Portfolio(Base):
    __tablename__ = 'portfolio'

    portfolio_id = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    quantity = Column(Numeric(10, 2), nullable=False)
    avg_buy_price = Column(Numeric(10, 2), nullable=False)
    objective_id = Column(UUID(as_uuid=True))
    current_price = Column(Numeric(10, 2), nullable=False)