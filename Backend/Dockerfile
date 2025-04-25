FROM node:18-alpine

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Declare a volume for persistent storage
VOLUME [ "/data" ]

# Expose backend port
EXPOSE 12345

# Set config path
ENV CONFIG_PATH=/data

CMD ["npm", "start"]
