## 📘 Instrucciones para ejecutar el frontend localmente

### 🚀 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js (versión recomendada: 20 o superior)

- Npm

### 📥 Clonar el repositorio
```
git clone https://github.com/No-Country-simulation/h4-01-Fintech.git
cd frontend
```
### 📦 Instalación de dependencias
```
npm install
```

### ⚙️ Configuración del entorno
Crea un archivo `.env` en la raíz de la carpeta frontend y agrega las variables de entorno necesarias (todas las variables necesarias, se encuentran en `.env.example`). 

### ▶️ Ejecutar el servidor en modo desarrollo
```
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

## La estructura del frontend
```
project-root/
├── public/                     # Archivos públicos (imágenes, fuentes, etc.)
├── src/                        # Código fuente principal
│   ├── components/             # Componentes reutilizables
│   │   ├── common/             # Componentes genéricos (botones, inputs, etc.)
│   │   ├── layout/             # Componentes de layout (Header, Footer, etc.)
│   │   ├── forms/              # Componentes relacionados con formularios
│   │   ├── modals/             # Modales reutilizables
│   │   └── widgets/            # Componentes específicos de la página o funcionalidad
│   ├── features/               # Funcionalidades específicas
│   │   ├── auth/               # Funciones y componentes relacionados con autenticación
│   │   ├── dashboard/          # Funcionalidades del panel de control
│   │   └── profile/            # Funciones y componentes de perfil
│   ├── hooks/                  # Custom hooks
│   ├── pages/                  # Rutas y vistas (estructura de Next.js)
│   │   ├── api/                # Rutas API de Next.js
│   │   ├── auth/               # Páginas relacionadas con autenticación (login, registro)
│   │   └── index.tsx           # Página principal
│   ├── services/               # Lógica para consumir APIs (fetchers, axios, etc.)
│   │   └── api/                # Configuración y controladores de APIs
│   ├── stores/                 # Estado global (Zustand, Context, Redux, etc.)
│   ├── styles/                 # Archivos CSS, SCSS o módulos CSS
│   │   ├── globals.css         # Estilos globales
│   │   └── theme.ts            # Temas (colores, tipografías, etc.)
│   ├── utils/                  # Funciones de utilidad y helpers
│   │   └── constants.ts        # Constantes reutilizables
│   ├── middleware.ts           # Middleware (si es necesario)
│   └── app/                    # Opcional: Carpeta para el nuevo sistema App Router de Next.js (v13+)
├── .eslint.config.js           # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── next.config.js              # Configuración de Next.js
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts

```

