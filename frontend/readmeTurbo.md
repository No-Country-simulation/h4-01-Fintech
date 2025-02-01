# commads

1. turbo build
Propósito: Este comando ejecuta la tarea build definida en el archivo package.json de cada paquete o aplicación dentro del monorepo.

Cómo funciona:

Turborepo busca en todos los paquetes o aplicaciones del monorepo que tengan un script build en su package.json.

Luego, ejecuta esos scripts en paralelo (si es posible) y cachea los resultados para futuras ejecuciones.

Ejemplo de uso:

bash
Copy
turbo build
Cuándo usarlo:

Cuando necesitas construir todos los paquetes o aplicaciones en tu monorepo.

Por ejemplo, antes de desplegar tu aplicación o publicar paquetes.

2.turbo check-types
Propósito: Este comando ejecuta la tarea check-types definida en el archivo package.json de cada paquete o aplicación dentro del monorepo.

Cómo funciona:

Similar a turbo build, pero en lugar de ejecutar el script build, ejecuta el script check-types.

Este script suele estar relacionado con la verificación de tipos en proyectos que usan TypeScript.

Ejemplo de uso:

bash
Copy
turbo check-types
Cuándo usarlo:

Cuando necesitas verificar los tipos de TypeScript en todos los paquetes o aplicaciones del monorepo.

Es útil para asegurarte de que no hay errores de tipos antes de construir o desplegar.

3.turbo check-types build
Propósito: Este comando ejecuta dos tareas en secuencia: primero check-types y luego build.

Cómo funciona:

Turborepo ejecuta el script check-types en todos los paquetes o aplicaciones.

Si check-types se ejecuta correctamente (sin errores), procede a ejecutar el script build.

Ejemplo de uso:

bash
Copy
turbo check-types build
Cuándo usarlo:

Cuando quieres asegurarte de que los tipos de TypeScript son correctos antes de construir tu proyecto.

Es una forma de combinar dos tareas en un solo comando.

4.turbo dev
Propósito: Este comando ejecuta la tarea dev definida en el archivo package.json de cada paquete o aplicación dentro del monorepo.

Cómo funciona:

Turborepo busca en todos los paquetes o aplicaciones del monorepo que tengan un script dev en su package.json.

Luego, ejecuta esos scripts en paralelo (si es posible).

Ejemplo de uso:

bash
Copy
turbo dev
Cuándo usarlo:

Cuando estás desarrollando localmente y necesitas iniciar servidores de desarrollo para múltiples aplicaciones o paquetes.

Por ejemplo, si tienes un frontend y un backend en el mismo monorepo, turbo dev puede iniciar ambos servidores de desarrollo al mismo tiempo.

¿Cómo define Turborepo qué tareas ejecutar?
Turborepo utiliza el archivo package.json de cada paquete o aplicación para determinar qué scripts están disponibles. Por ejemplo, si tienes un paquete con el siguiente package.json:

json
Copy
{
  "scripts": {
    "build": "tsc --build",
    "check-types": "tsc --noEmit",
    "dev": "next dev"
  }
}

Turborepo reconocerá los scripts build, check-types y dev, y podrás ejecutarlos usando los comandos que mencionaste.

Ventajas de usar Turborepo
Caché: Turborepo cachea los resultados de las tareas (como build o check-types), lo que acelera las ejecuciones futuras.

Paralelización: Ejecuta tareas en paralelo cuando es posible, lo que reduce el tiempo total de construcción.

Monorepo optimizado: Facilita la gestión de múltiples paquetes o aplicaciones en un solo repositorio.

Ejemplo de flujo de trabajo con Turborepo
Desarrollo:

Usas turbo dev para iniciar servidores de desarrollo en paralelo.

Verificación de tipos:

Usas turbo check-types para asegurarte de que no hay errores de TypeScript.

Construcción:

Usas turbo build para construir todos los paquetes o aplicaciones.

Combinación de tareas:

Usas turbo check-types build para verificar tipos y construir en un solo comando.
