# Stage 1: Build stage
FROM node:20 AS build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json /app/package.json

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . /app

# Build the project
RUN npm run build

# Stage 2: Production stage
FROM nginx:stable-alpine

# Copy the built files from the build stage to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration file to the nginx conf directory
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /public/env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh

COPY env.js /usr/share/nginx/html/env.js 

RUN chmod +x /docker-entrypoint.d/entrypoint.sh

# Start nginx with the specified configuration
CMD ["nginx", "-g", "daemon off;"]