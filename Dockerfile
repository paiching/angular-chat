# Stage 1: Build the Angular application
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/angular-chat /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
