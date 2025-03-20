# Node.js 16 for stability
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy backend code
COPY . .

# Expose backend port
EXPOSE 8080

# Start the backend server
CMD ["node", "index.js"]
