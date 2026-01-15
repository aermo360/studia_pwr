FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install development dependencies as well (for build)
RUN npm install

# Copy source code
COPY . .

# Build the admin panel
RUN npm run build

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"]
