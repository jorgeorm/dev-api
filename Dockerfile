FROM node:18-alpine

# docker-compose-wait tool
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
## Install build-tools virtual package for node-gyp
# RUN apk --no-cache add --virtual build-toools build-base python
RUN apk add --no-cache --virtual .v_build-toools g++ make python3
RUN apk add --no-cache bash
## Install node packages - will triger a compilation
RUN npm install
# Workaround for bcrypt in alpine, forces recompiling the bcrypt native addon
# RUN npm rebuild bcrypt --build-from-source
## Uninstall build-tools virtual package
RUN apk del .v_build-toools

COPY . .
EXPOSE $APP_PORT
CMD [ "sh", "-c", "/wait && npm start" ]
