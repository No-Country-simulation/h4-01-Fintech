# Frontend

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
