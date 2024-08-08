# Use Node.js to build the app
FROM node:20.15.1-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy the entire source code
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:20.15.1-alpine

# Copy the build output and node_modules from the build step
COPY --from=build /app .

EXPOSE 80

# Start the Next.js app
CMD ["npm", "run", "start"]