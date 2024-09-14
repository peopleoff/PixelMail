# Stage 1: Build the project
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Run the project
FROM node:20-alpine

# Set working directory for runtime
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose port (make sure this matches the port in your app)
EXPOSE 3000

# Command to run your app
CMD ["node", "dist/index.js"]
