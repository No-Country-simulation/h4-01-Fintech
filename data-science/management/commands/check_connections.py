from django.core.management.base import BaseCommand
from django.db import connections
import requests
import os


#backend url
BACKEND_URL = os.environ.get('BACKEND_URL')

class Command(BaseCommand):
    help = "Comprueba las conexiones a la base de datos y al backend"

    def handle(self, *args, **options):
        self.check_database_connection()
        self.test_backend_connection()

    def check_database_connection(self):
        """Intenta conectarse a la base de datos y muestra el resultado en consola."""
        try:
            connection = connections['default']
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
            self.stdout.write(self.style.SUCCESS("Conexión a la base de datos exitosa!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error al conectar a la base de datos: {e}"))

    def test_backend_connection(self):
        """Prueba la conexión al backend."""
        if not BACKEND_URL:
            self.stderr.write(self.style.WARNING("BACKEND_URL no está configurado."))
            return
        for _ in range(5):  # Realiza 5 intentos
            try:
                response = requests.get(BACKEND_URL)
                if response.status_code == 200:
                    try:
                        data = response.json()
                        self.stdout.write(self.style.SUCCESS(f"Conexión al backend exitosa: {data}"))
                    except ValueError:
                        self.stdout.write(self.style.WARNING(f"Respuesta no JSON: {response.text}"))
                else:
                    self.stderr.write(self.style.ERROR(f"Error al conectar al backend: Código {response.status_code}"))
                break  # Sal del bucle si la conexión es exitosa
            except requests.exceptions.RequestException as e:
                self.stderr.write(self.style.ERROR(f"Error al intentar conectar con el backend: {e}"))