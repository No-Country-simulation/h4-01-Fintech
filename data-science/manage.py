#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.db import connections
from django.core.exceptions import ImproperlyConfigured
import requests
import environ
from pathlib import Path
import dj_database_url
import time

environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env()

env_file = BASE_DIR / '.env'
if env_file.exists():
    environ.Env.read_env(env_file)

#backend url
BACKEND_URL = os.environ.get('BACKEND_URL')

#Test conexion Backend
def test_connection():
    url = BACKEND_URL
    for _ in range(5):
        try:
            response = requests.get(url)
            print("Código de estado:", response.status_code)
            print("Contenido de la respuesta:", response.text)
            if response.status_code == 200:
                try:
                    data = response.json()
                    print("Respuesta JSON del backend:", data)
                except ValueError:
                    print("La respuesta no es un JSON válido, pero es un texto: ", response.text)
            else:
                print(f"Error al conectar al backend. Código de estado: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Error al intentar conectar con el backend: {e}")
            sys.exit(1)

#Test connection DB
def check_database_connection():
    """Intenta conectarse a la base de datos y muestra el resultado en consola."""
    try:
        connection = connections['default']
        # Realiza una operación simple para comprobar la conexión
        with connection.cursor() as cursor:
            cursor.execute('SELECT 1')
        print("Conexión a la base de datos exitosa!")
    except Exception as e:
        print("Error al conectar a la base de datos:", e)
        sys.exit(1)  # Sale del proceso si la conexión falla

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fintech.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fintech.settings')
    check_database_connection()
    test_connection()
    main()
