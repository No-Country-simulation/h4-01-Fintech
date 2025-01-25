# app/database/core.py
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base

# Cargar variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DB_URL")

# Configuración de la base de datos
engine = create_engine(DATABASE_URL, connect_args={"options": "-c default_transaction_read_only=on"})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# Función para gestionar la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
