const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, './src/seed/data.csv');
const destPath = path.resolve(__dirname, './dist/seed/data.csv');

// Crear el directorio de destino si no existe
const destDir = path.dirname(destPath);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copiar el archivo
fs.copyFileSync(srcPath, destPath);
console.log('Archivo copiado exitosamente');
