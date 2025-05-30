# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY .npmrc .npmrc

# Instala dependencias ignorando conflictos
RUN npm install --legacy-peer-deps

# Copia el resto de la app
COPY . .

# Construye el proyecto Angular
RUN npm run build -- --configuration production

# Instala un servidor para servir archivos estáticos
RUN npm install -g http-server

# Expone el puerto 8080 (el default de Railway)
EXPOSE 8080

# Comando para arrancar la app
CMD ["http-server", "dist/dwese-app-logger-angular", "-p", "8080"]
