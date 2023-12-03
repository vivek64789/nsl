# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Build the React application
RUN npm run build

# Set the command to start the app using a simple static server
# Here you can use serve or any other static file server
# However, this is optional as you mentioned Nginx is served by different container
# You might want to just end the Dockerfile here after the build if no serving is needed
CMD ["npx", "serve", "-s", "build", "-l", "3000"]

# Note: The CMD line is only needed if you want to run this container as a standalone
# serving the build folder with a Node.js server.
# If you're deploying this with an Nginx container, you don't need the CMD line.
# Instead, you would copy the build directory to your Nginx container as shown in previous examples.
