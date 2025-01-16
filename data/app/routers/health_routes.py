from fastapi import APIRouter, UploadFile
import databases
import httpx
import os
import pandas as pd

router = APIRouter()

# Cargar las variables de entorno desde un archivo .env (si es necesario)
from dotenv import load_dotenv
load_dotenv()  # Esto carga las variables de un archivo .env

# Conexión a la base de datos
database_url = os.getenv("DB_URL")

if not database_url:
    raise ValueError("DB_URL no está definida en las variables de entorno.")

database = databases.Database(database_url)

@router.get("/test/db")
async def health_check_db():
    """Verificar si la conexión a la base de datos es operativa."""
    try:
        await database.connect()
        await database.disconnect()
        return {"estado": "La conexión a la base de datos está operativa."}
    except Exception as e:
        return {"estado": "La conexión a la base de datos falló.", "error": str(e)}

# Conexión al backend
@router.get("/test/backend")
async def health_check_backend():
    """Verificar si la conexión al backend es operativa."""
    backend_url = os.getenv("BACKEND_URL")
    if not backend_url:
        raise ValueError("BACKEND_URL no está definida en las variables de entorno.")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(backend_url)
            if response.status_code == 200:
                return {"estado": "La conexión al backend está operativa."}
            else:
                return {"estado": "La conexión al backend falló.", "error": response.status_code}
    except Exception as e:
        return {"estado": "La conexión al backend falló.", "error": str(e)}

# Verificación de pandas
@router.post("/test/pandas")
async def health_check_pandas(file: UploadFile):
    """Verificar si Pandas funciona cargando un archivo CSV."""
    try:
        df = pd.read_csv(file.file)
        return {"estado": "Pandas está operativo.", "vista_previa_de_datos": df.head().to_dict()}
    except Exception as e:
        return {"estado": "La verificación de Pandas falló.", "error": str(e)}
