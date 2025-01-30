from app.database import Base


class PortfolioEntity(Base):
    __tablename__ = 'portfolio_entity'

    portfolio_id = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    quantity = Column(Numeric(10, 4), nullable=False)
    avg_buy_price = Column(Numeric(15, 2), nullable=False)
    objective_id = Column(UUID(as_uuid=True))
    current_price = Column(Integer)
    assetId = Column(UUID(as_uuid=True), ForeignKey('asset.id'))