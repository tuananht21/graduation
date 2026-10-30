# Giai đoạn 1: build app
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build code (Vite sẽ tạo thư mục /app/dist)
RUN npm run 

# Giai đoạn 2: chạy web tĩnh bằng nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]