# 1. Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# 2. Production Stage
FROM node:18-alpine as production

WORKDIR /app

# Install a simple static server (serve package)
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Run the production build using "serve"
CMD ["serve", "-s", "build", "-l", "3000"]
