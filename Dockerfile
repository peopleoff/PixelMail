# Stage 1: Build the project
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install all deps (incl. dev deps for tsc)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output and runtime assets
COPY --from=build /app/dist ./dist
COPY --from=build /app/templates ./templates
COPY --from=build /app/src/public ./src/public

EXPOSE 3000

CMD ["node", "dist/index.js"]