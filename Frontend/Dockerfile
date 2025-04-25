# Build vue app with node
FROM node:18-alpine AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80

# Deamon off to run in foreground
CMD ["nginx", "-g", "daemon off;"] 