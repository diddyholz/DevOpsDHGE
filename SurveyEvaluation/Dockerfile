FROM node:18-alpine

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Expose microservice port
EXPOSE 12346

CMD ["npm", "start"]
