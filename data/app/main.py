from fastapi import FastAPI
from app.routers import health_routes

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Data is Run"}


# Registrar las rutas de prueba
app.include_router(health_routes.router, prefix="/api", tags=["Test"])
