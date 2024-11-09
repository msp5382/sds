# Step 1: Build the app using Node.js and Bun
FROM oven/bun:latest AS build

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if you are using Bun package manager)
COPY package.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install 

# Copy the rest of the app files
COPY . .

RUN bun run build

# Step 2: Serve the built files using Nginx
FROM nginx:alpine AS production

# Copy the built files from the build stage to the Nginx default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]