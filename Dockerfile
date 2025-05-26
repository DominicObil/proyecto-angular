# Usa Node como base
FROM node:18

# Crea carpeta de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc .npmrc

# Instala dependencias ignorando conflictos
RUN npm install --legacy-peer-deps

# Copia el resto del proyecto
COPY . .

# Construye el proyecto Angular
RUN npm run build -- --configuration production

# Usa NGINX para servir la app
RUN npm install -g http-server

# Comando para correr el servidor
CMD ["http-server", "dist/dwese-app-logger-angular"]
