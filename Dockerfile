# Use an official node js environment as image
FROM node:24-alpine

# Set the working directory in our container
WORKDIR /app

# Copy the package.json and package.lock.json to th econtainer
COPY package*.json .

# Install the dependencies 
RUN npm install

# Copy the rest of application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5003

# Define the command to run your app
CMD ["node", "./src/server.js"]
