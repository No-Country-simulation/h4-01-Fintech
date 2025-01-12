
# Documentación para ejecutar el backend de NestJS

<div align="left">
  <img src="https://skillicons.dev/icons?i=docker" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=git" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=github" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=md" height="40" alt="markdown logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgres" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vscode" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=githubactions" height="40" alt="githubactions logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=js" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nestjs" height="40" alt="nestjs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Alpine Linux-0D597F?logo=alpinelinux&logoColor=white&style=for-the-badge" height="40" alt="alpinelinux logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=for-the-badge" height="40" alt="eslint logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Google-4285F4?logo=google&logoColor=white&style=for-the-badge" height="40" alt="google logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=for-the-badge" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postman" height="40" alt="postman logo"  />
</div>

Esta guía explica cómo configurar y ejecutar el gateway de NestJS localmente y utilizando Docker.

---

## Configuración local

### Requisitos previos

- Tener instalado Node.js y npm.

### Paso 1: Clonar el repositorio

Clona el repositorio del gateway en tu máquina local:

```bash
git clone https://github.com/No-Country-simulation/h4-01-Fintech.git
cd h4-01-Fintech
```

### Paso 2: Instalar dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### Paso 3: Configurar el archivo `.env`

El proyecto requiere un archivo `.env` para definir las variables de entorno. Un archivo de ejemplo llamado `.env.example` está incluido en el repositorio. Realiza una copia y renómbrala como `.env`:

```bash
cp .env.example .env
```

Asegúrate de editar el archivo `.env` con las configuraciones adecuadas para tu entorno, como las credenciales de Redis, puertos, etc.

### Paso 4: Ejecutar la aplicación

Inicia el gateway usando el siguiente comando:

```bash
npm run start:dev
```

Esto iniciará el servidor en modo de desarrollo. El gateway estará disponible en el puerto configurado en el archivo `.env` (por defecto, deberia ser el `http://localhost:3001` ya que el frontend a nivel local deberia correr en el puerto 3000).

---

## Configuración con Docker

### Paso 1: Construir la imagen de Docker

contraras un archivo llamado docker-compose.dev en la raiz del proyecto puedes ejecutarlo antes de ellos asegurate de tener las variables correctas que acompaa ese archivo en la misma ruta (.env)
con el siguiente comando estaria ejecutando ambos contenedores el backend y el de data-science

Ejecuta el siguiente comando para construir la imagen del proyecto:

```bash
docker-compose up .
```

---

## Pruebas

### Ejecutar pruebas unitarias

Para ejecutar las pruebas unitarias del proyecto, utiliza el siguiente comando:

```bash
npm run test
```

### Ejecutar pruebas de integración

Para ejecutar las pruebas de integración:

```bash
npm run test:integration
```

---

Con esta documentación, cualquier persona debería ser capaz de configurar y ejecutar el gateway de NestJS en diferentes entornos.
