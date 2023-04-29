FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 5000

CMD npm install; npm install nodemon -g; nodemon app.js
