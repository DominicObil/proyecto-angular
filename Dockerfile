# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Etapa 2: Nginx para servir la app
FROM nginx:alpine
# Cambia el nombre aquí por el de tu proyecto en dist/
COPY --from=build /app/dist/<nombre-de-tu-app> /usr/share/nginx/html
EXPOSE 80
