# Documentación para ejecutar el proyecto FastAPI

Esta guía describe cómo configurar y ejecutar el proyecto FastAPI de manera local, en un entorno virtual, utilizando Docker y finalmente desplegarlo en Render.

<div align="left">
  <img src="https://skillicons.dev/icons?i=docker" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=fastapi" height="40" alt="fastapi logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=git" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=github" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=md" height="40" alt="markdown logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=py" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=pandas" height="40" alt="pandas logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vscode" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=githubactions" height="40" alt="githubactions logo"  />
</div>

---

## Configuración local con Virtualenv

### Requisitos previos

- Tener instalado Python 3.9 o superior.

### Paso 1: Crear el entorno virtual

Después de clonar el repositorio, utiliza el siguiente comando para crear un entorno virtual:

```bash
python3 -m venv venv
```

### Paso 2: Activar el entorno virtual

Navega al nivel raíz del proyecto (por ejemplo: `data/`) y activa el entorno virtual con los siguientes comandos según tu sistema operativo:

#### Linux/Mac

```bash
source venv/bin/activate
```

#### Windows

```bash
.\venv\Scripts\activate
```

### Paso 3: Verificar que el entorno virtual esté activado

Asegúrate de que el entorno virtual esté activado. Verás el prefijo `(venv)` en la terminal.

### Paso 4: Instalar dependencias

Instala las dependencias del proyecto enumeradas en el archivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

### Nota sobre el archivo `.env`

El proyecto utiliza un archivo `.env` para configurar variables de entorno necesarias para la ejecución. Un archivo de ejemplo llamado `.env.example` se incluye en el repositorio. Realiza una copia de este archivo y renómbrala como `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` para asegurarte de que las variables sean correctas y estén personalizadas según tu entorno local.

### Actualizar lista de dependencias

Si instalas nuevas dependencias, recuerda actualizar el archivo `requirements.txt` ejecutando:

```bash
pip freeze > requirements.txt
```

### Para iniciar el servidor

Ejecuta el servidor localmente con:

```bash
uvicorn app.main:app --reload
```

Ejecuta el servidor localmente con auto-restart:

```bash
watchmedo auto-restart -- uvicorn app.main:app --reload
```

El proyecto estará disponible en `http://127.0.0.1:8000`.

---

## Características exclusivas de FastAPI

### Documentación interactiva

FastAPI proporciona documentación automática e interactiva para tus endpoints:

- **Swagger UI**: Disponible en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
- **ReDoc**: Disponible en [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc).

Ambas opciones permiten probar los endpoints directamente desde el navegador.

### Validación de datos

FastAPI utiliza `Pydantic` para validar los datos de entrada y salida de forma automática. Puedes definir modelos de datos reutilizables y robustos.

### Alto rendimiento

FastAPI está optimizado para un rendimiento superior utilizando `Starlette` y soporta asincronía para operaciones concurrentes eficientes.

---

## Configuración con Docker

### Paso 1: Construir la imagen de Docker

En la raíz del proyecto encontrarás un archivo llamado `docker-compose.yml`. Asegúrate de tener las variables de entorno correctas configuradas en un archivo `.env` en la misma ruta.

Ejecuta el siguiente comando para construir y ejecutar el contenedor:

```bash
docker-compose up --build
```

### Paso 2: Acceder al servicio

El proyecto estará disponible en `http://localhost:8000`.

---

## Uso de Pandas

Este proyecto utiliza `pandas` para el procesamiento y análisis de datos. Asegúrate de instalar `pandas` como dependencia principal. Ejemplo de código para cargar un archivo CSV:

```python
import pandas as pd

def process_csv(file_path: str):
    df = pd.read_csv(file_path)
    print(df.head())
    return df.describe()
```

Puedes integrar estas funciones dentro de los endpoints de FastAPI para ofrecer capacidades de procesamiento de datos como parte de la API.

---

Con esta documentación, cualquier persona debería poder configurar y ejecutar el proyecto en diferentes entornos, aprovechando las ventajas de FastAPI y pandas. Si necesitas más ayuda o tienes alguna duda, no dudes en preguntar.
