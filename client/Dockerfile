# Dockerfile for React client

# Use node's version number is 18
FROM node:18

# Create the folder "app" under the /usr/src path and set it to be the working directory
# for the further COPY, RUN and CMD instructions
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the local files to the "app" folder
COPY . /usr/src/app
    
# Expose port 3000 on the host machine to the container for listening to external connections
EXPOSE 3000

# Start the React applications
CMD rm -r node_modules; npm install --force ; export NODE_OPTIONS=--openssl-legacy-provider; npm start
