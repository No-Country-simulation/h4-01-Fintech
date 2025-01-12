# Documentación para ejecutar el proyecto Django

Esta guía describe cómo configurar y ejecutar el proyecto Django de manera local, en un entorno virtual, utilizando Docker y finalmente desplegarlo en Render.

<div align="left">
  <img src="https://skillicons.dev/icons?i=docker" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=django" height="40" alt="django logo"  />
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
  <img src="https://skillicons.dev/icons?i=vscode" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=githubactions" height="40" alt="githubactions logo"  />
</div>

---

## Configuración local con Virtualenv

### Requisitos previos

- Tener instalado Python 3.

### Paso 1: Crear el entorno virtual

Después de clonar el repositorio, utiliza el siguiente comando para crear un entorno virtual:

```bash
python3 -m venv venv
```

### Paso 2: Activar el entorno virtual

Navega al nivel raíz del proyecto (por ejemplo: `data-science/fintech`) y activa el entorno virtual con los siguientes comandos según tu sistema operativo:

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

- Para inciiar

```bash
python manage.py runserver
```

---

## Configuración con Docker

### Paso 1: Construir la imagen de Docker

contraras un archivo llamado docker-compose.dev en la raiz del proyecto puedes ejecutarlo antes de ellos asegurate de tener las variables correctas que acompaa ese archivo en la misma ruta (.env)
con el siguiente comando estaria ejecutando ambos contenedores el backend y el de data-science

Ejecuta el siguiente comando para construir la imagen del proyecto:

```bash
docker-compose up .
```

El proyecto estará disponible en `http://localhost:8000`.

---

Con esta documentación, cualquier persona debería poder configurar y ejecutar el proyecto en diferentes entornos.
