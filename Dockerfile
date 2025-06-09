# Build stage
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Nginx stage
FROM nginx:alpine
COPY --from=build /app/dist/<nombre-de-tu-app> /usr/share/nginx/html
EXPOSE 80
