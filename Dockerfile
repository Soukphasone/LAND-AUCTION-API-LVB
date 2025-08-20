# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port
EXPOSE 8001

# Start the application
CMD ["node", "app.js"]