FROM mhart/alpine-node:10.15.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
## Install build-tools virtual package for node-gyp
# RUN apk --no-cache add --virtual build-toools build-base python
RUN apk add --virtual build-toools --no-cache g++ make python
## Install node packages - will triger a compilation
RUN npm install
# Workaround for bcrypt in alpine, forces recompiling the bcrypt native addon
# RUN npm rebuild bcrypt --build-from-source
## Uninstall build-tools virtual package
RUN apk del build-toools
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
