# Usa una imagen base oficial con Node y npm
FROM node:20-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json primero
COPY package.json ./

# Generar package-lock.json directamente si no lo tenés
RUN npm install --package-lock-only

# Copia el resto de la app
COPY . .

# Instala dependencias sin conflictos de peer deps
RUN npm ci --legacy-peer-deps

# Build de la app Angular
RUN npm run build

# Expone el puerto para SSR si aplica
EXPOSE 4000

# Comando de inicio (puede variar según tu app)
CMD ["npm", "run", "start"]
