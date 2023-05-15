FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3000

CMD rm -r node_modules; npm install --force ; export NODE_OPTIONS=--openssl-legacy-provider; npm start
