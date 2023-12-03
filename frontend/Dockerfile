# Use an official Node runtime as a parent image
FROM node:16

# Set work directory
WORKDIR /app

# Install dependencies
# Note that we no longer prefix the paths with ./frontend since the context is set to ./frontend
COPY package.json package-lock.json* ./
RUN npm install

# Add rest of the client code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
