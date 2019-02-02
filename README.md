# DEV API

Test api built over express.js, initially was born to give me a continous learning of different things I want to get my hands on in terms of node.

## Installation

This could be run natively in your OS, at the moment the only dependency you must take care depending on the OS you have is node-gyp which is used to compile bcrypt. In addition, you can use the docker container that is provided as part of this code-base.

### Install locally

It is recommended you use NVM, based on your OS you have the following two options.

- For OSX/Unix try [nvm](https://github.com/creationix/nvm)
- For Windows try [nvm-windows](https://github.com/coreybutler/nvm-windows)

Note that they are two totally different approaches, despite they may seem similar their functionalities may vary. Next, follow the checklist below.

- [x] Check and use Node version in [.nvmrc](./.nvmrc).
- [x] Check that [node-gyp](https://github.com/nodejs/node-gyp#installation) dependencies are fullfiled.
- [x] Run **`npm install`**.
- [x] Setup a mongo DB.
- [x] Generate a copy of the [.env.sample](./.env.sample) file named _.env_.
- [x] Define the variables in the file with the proper values.
- [x] run **`npm start`**, that should be all, if there are any issues please contact repository admins.

### Install with Docker

Install both [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

Once you've completed the installation follow instructions bellow:

- [x] Generate a copy of the [.env.sample](./.env.sample) file named _.env_.
- [x] Define variables in the file with proper values.
  - _NOTE:_ Do not use estrange characters in DB_NAME env var, use camel-case.
- [x] Define variable DB*HOST with *'db-mongo:27017'\_.
- [x] Run **`docker-compose up`**

_And voila, thats all!!!_

If you want to stop docker containers you can either type **`docker-compose down`** or **`docker-compose stop`** depending if you intend to regenerate the whole setup of containers or just stop and restart

## Contrib List

jorgeorm@gmail.com - Jorge
