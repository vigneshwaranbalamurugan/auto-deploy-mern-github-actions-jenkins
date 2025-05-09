# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the specified backend port
EXPOSE 5000

# Set environment variable to ensure the server listens on port 5000
ENV PORT=5000

CMD ["npm", "start"]