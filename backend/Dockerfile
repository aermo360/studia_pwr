FROM node:20-alpine

WORKDIR /app

# Install dependencies required for building native modules (like better-sqlite3)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the admin panel
RUN npm run build

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"]
