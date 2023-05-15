# Dockerfile for Express Backend

# Use node's version number is 16
FROM node:16

# Create the folder "app" under the /usr/src path and set it to be the working directory
# for the further COPY, RUN and CMD instructions
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the local files to the "app" folder
COPY . /usr/src/app


# Expose port 5000 on the host machine to the container for listening to external connections
EXPOSE 5000

# Install the dependencies mentioned in package.json
CMD npm install; npm install nodemon -g; nodemon app.js
