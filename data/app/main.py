from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
import pandas as pd
from app.routers import (
    health_routes, accounts, answers, asset ,balance, marketData,
    notifications, questions,porfolio,
    transaction, users
)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Data is Run"}

app.include_router(health_routes.router, prefix="/api", tags=["Test"])
app.include_router(accounts.router, prefix="/api")
app.include_router(answers.router, prefix="/api")
app.include_router(asset.router, prefix="/api")
app.include_router(balance.router, prefix="/api")
app.include_router(marketData.router, prefix="/api")
app.include_router(notifications.router, prefix="/api")
app.include_router(porfolio.router, prefix="/api")
app.include_router(questions.router, prefix="/api")
app.include_router(transaction.router, prefix="/api")
app.include_router(users.router, prefix="/api")